FROM python:3-onbuild
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pip install --no-cache-dir -r requirements.txt

#CMD ["flask run app --host=0.0.0.0 --port=80"]
CMD python app.py