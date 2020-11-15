###  Запуск приложения
1. Установить 
    1. docker
    
        https://docs.docker.com/engine/install/

        https://docs.docker.com/engine/install/ubuntu/

    1. docker-compose
        
        https://docs.docker.com/compose/install/

1. В корневой директории проекта выполнить команду
    
    ```
   docker-compose up -d
   ```
   
1. После завершения работы команды перейти в браузер и открыть url

    https://0.0.0.0:5000/ 
    
    
    
### Запуск прогноза Prophet

1. Исполняемый файл:
   
    fbprophet_predict.py - осуществляет прогнозирование востребованности вакансий на ближайшие месяцы

2. На вход подается файл: 

    vacancies_data.csv с историческими данными о вакансиях: специальность, дата создания, ключевые навыки

4. На выходе генерируются файлы:

    vacancies_diff.csv - изменение популярности каждой специальности в процентах

    vacancies_dict.csv - словарь ключевых компетенций по каждой специальности

    vacancies_predict.csv - отсортированный прогноз спроса по специальностям для построения графиков на сайте
    
    
    
### Запуск прогноза tensorflow

1. Исполняемый файл:
   
    lstm_predict.py - осуществляет прогнозирование востребованности вакансий на ближайшие месяцы

2. На вход подается файл: 

    vacancies_data.csv с историческими данными о вакансиях: специальность, дата создания, ключевые навыки
    
3. Валидация показала, что данных для обучения недостаточно. Поэтому прогноз этой моделью не делается, выходных файлов нет.
