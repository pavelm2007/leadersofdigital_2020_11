from collections import Counter
import numpy as np
import pandas as pd
from pandas import pivot_table
from fbprophet import Prophet

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

# Таблица для изменения спроса на специальности
vacancies_diff['Изменение'] = (100*(vacancies_diff['2019-10-01']- vacancies_diff['2019-01-01'])/vacancies_diff['2019-01-01']).round(2)
vacancies_diff[['Изменение']].to_csv('vacancies_diff.csv', sep=',')

# Словарь 5 ключевых компетенций для каждой вакансии
vacancies['key_skills'] = vacancies['key_skills'].str.replace('[', '').str.replace(']', '').str.replace("'", '').str.split(',')
vacancies_dict = vacancies[['Специальность', 'key_skills']].groupby(by=["Специальность"]).sum()
vacancies_dict['skills'] = vacancies_dict['key_skills'].apply(lambda mylist: list([x for x in mylist if x]))
vacancies_dict['key_skills'] = vacancies_dict['skills'].apply(lambda x: [elem[0] for elem in Counter(x).most_common(5)])

vacancies_dict[['key_skills']].to_csv('vacancies_dict.csv', sep='|')

# Графики отражаются горизонтально, для модели таблицу надо повернуть
temp = vacancies_diff[date_list[0:12]].T

# Готовим датафрейм для результатов предсказания
columns_list = list(temp.columns)
df_predict = pd.DataFrame({'ds': date_list})

# Датафрейм, в котором будет работать модель прогнозирования
df_time = pd.DataFrame({'ds': temp.index, 'y':0})
df_time['ds'] = df_time['ds'].apply(pd.to_datetime)

for column in columns_list[0:]: 
    df_time['y'] = temp[column].values
    model = Prophet(n_changepoints = 6, yearly_seasonality=False, weekly_seasonality=True, daily_seasonality=False)
    model.fit(df_time)
    future = model.make_future_dataframe(periods=12, freq = 'm')
    forecast = model.predict(future)
    df_predict[column] = forecast['yhat'].astype(int)

# Обратно поворачиваем и убираем отрицательные значения
df = df_predict.set_index('ds').T.iloc[:, 12:]
df[df < 0] = 0

df.to_csv('vacancies_predict.csv', sep=',')
