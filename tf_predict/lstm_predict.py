from collections import Counter
import numpy as np
import pandas as pd
from pandas import pivot_table
import tensorflow as tf

def create_time_steps(length):
    time_steps = []
    for i in range(-length, 0, 1):
        time_steps.append(i)
    return time_steps

def multivariate_data(dataset, target, start_index, end_index, history_size,
                      target_size, step, single_step=False):
    data = []
    labels = []

    start_index = start_index + history_size
    if end_index is None:
        end_index = len(dataset) - target_size

    for i in range(start_index, end_index):
        indices = range(i-history_size, i, step)
        data.append(dataset[indices])

        if single_step:
            labels.append(target[i+target_size])
        else:
            labels.append(target[i:i+target_size])

    return np.array(data).astype('float32'), np.array(labels).astype('float32')



# Загружаем исторические данные о спросе на вакансии
vacancies = pd.read_csv('vacancies_data.csv', index_col=0, sep='|')
vacancies['creation_month'] = vacancies['creation_month'].apply(pd.to_datetime)

# Группируем помесячно
date_list = ['2019-01-01', '2019-02-01', '2019-03-01', '2019-04-01', '2019-05-01', '2019-06-01', '2019-07-01', '2019-08-01', '2019-09-01', '2019-10-01', '2019-11-01', '2019-12-01', '2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01', '2020-05-01', '2020-06-01', '2020-07-01', '2020-08-01', '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01']

vacancies_diff = pivot_table(vacancies, values='area_id', index=['Специальность'], \
                      columns=['creation_month'], aggfunc='count').fillna(0)
vacancies_diff.columns = date_list[0:12] 
vacancies_diff = vacancies_diff.astype(int)
vacancies_diff.sort_values(by=['2019-12-01'], ascending=False, inplace = True)

# Графики отражаются горизонтально, для модели таблицу надо повернуть
temp = vacancies_diff[date_list[0:12]].T

TRAIN_SPLIT =int(temp.shape[0]*0.5)
dataset = temp.values
data_mean = dataset.mean(axis=0)
data_std = dataset.std(axis=0)

past_history = 2
future_target = 2
STEP = 2
BATCH_SIZE = 4
BUFFER_SIZE = 200
EVALUATION_INTERVAL = 20
EPOCHS = 500

# Делим на тренировочную и валидационную выборку. 
# Из 12 месяцев 4 на трейн, 2 на тест (т.к. timeseries режутся скользящим окном)
x_train_multi, y_train_multi = multivariate_data(dataset, dataset[:, 1], 0,
                                                 TRAIN_SPLIT, past_history,
                                                 future_target, STEP)
x_val_multi, y_val_multi = multivariate_data(dataset, dataset[:, 1],
                                             TRAIN_SPLIT, None, past_history,
                                             future_target, STEP)

train_data_multi = tf.data.Dataset.from_tensor_slices((x_train_multi, y_train_multi))
train_data_multi = train_data_multi.cache().shuffle(BUFFER_SIZE).batch(BATCH_SIZE).repeat()

val_data_multi = tf.data.Dataset.from_tensor_slices((x_val_multi, y_val_multi))
val_data_multi = val_data_multi.batch(BATCH_SIZE).repeat()

multi_step_model = tf.keras.models.Sequential()
multi_step_model.add(tf.keras.layers.LSTM(32,
                                          return_sequences=True,
                                          input_shape=x_train_multi.shape[-2:]))
multi_step_model.add(tf.keras.layers.LSTM(16, activation='relu'))
multi_step_model.add(tf.keras.layers.Dense(2))

multi_step_model.compile(optimizer=tf.keras.optimizers.RMSprop(clipvalue=1.0), loss='mse', 
                         metrics=['mae', 'mse'])


multi_step_history = multi_step_model.fit(train_data_multi, epochs=EPOCHS,
                                          steps_per_epoch=EVALUATION_INTERVAL,
                                          validation_data=val_data_multi,
                                          validation_steps=5)

# fbprophet mae = 1,75, rmse = 1,76
# tf mae = 51, rmse = 87, модель не обучилась из-за недостаточного количества данных. Прогноз делать не имеет смысла
