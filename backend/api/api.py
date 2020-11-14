import csv
import os
import sys
from collections import OrderedDict
from typing import List

from flask import jsonify, request
from flask_restful import Resource, Api

api = Api()

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

csv.field_size_limit(sys.maxsize)


class DynamicsProfessionResource(Resource):
    @staticmethod
    def get_source_file(city):
        file_map = {
            'ekb': 'vacancies_predict_ekb.csv',
            'krs': 'vacancies_predict_krs.csv',
            'msk': 'vacancies_predict_msk.csv',
            'nsb': 'vacancies_predict_nsb.csv',
            'spb': 'vacancies_predict_spb.csv',
        }
        return file_map.get(city, 'dinamika.csv')

    def get(self):
        city = request.args.get('city')
        file_name = self.get_source_file(city)

        with open(os.path.join(__location__, 'data', file_name), mode='r') as infile:
            csv_dict_reader = csv.DictReader(infile)
            items = list(csv_dict_reader)
            headers = list(csv_dict_reader.fieldnames)

        return jsonify({
            'headers': headers,
            'items': items[:10]
        })


class PopularityProfessionResource(Resource):
    @staticmethod
    def popularity_to_dict(item: List[str]):
        return {
            'label': item[0],
            'value': item[1]
        }

    def get(self):
        trend = request.args.get('trend')

        with open(os.path.join(__location__, 'data/popularity.csv'), mode='r') as infile:
            reader = csv.reader(infile)
            data = list(reader)[1:]

        if trend == 'up':
            items = data[:10]
        else:
            items = data[-10:]

        return jsonify([self.popularity_to_dict(item) for item in items])


class ProfessionResource(Resource):
    @staticmethod
    def profession_to_dict(item: str):
        return {'value': item, 'label': item}

    def get(self):
        with open(os.path.join(__location__, 'data/skills.csv'), mode='r') as infile:
            reader = csv.reader(infile, delimiter='|')
            data = []

            for row in reader:
                data.append(self.profession_to_dict(row[0]))

        return jsonify(data[1:])


class SkillsResource(Resource):
    @staticmethod
    def get_clear_skills(value):
        skills = value.replace('[', '').replace(']', '').replace("'", '').replace('"', '').replace(';', '').split(',')
        return [s.strip() for s in skills]

    def get(self):
        professions = request.args.getlist('professions')

        with open(os.path.join(__location__, 'data/skills.csv'), mode='r') as infile:
            reader = csv.reader(infile, delimiter='|')
            result = {}

            for row in reader:
                key = row[0]
                if key in professions:
                    result.setdefault(key, []).extend(self.get_clear_skills(row[1]))

        return jsonify([
            {'label': key, 'values': values}
            for key, values in result.items()
        ])


api.add_resource(DynamicsProfessionResource, '/api/v1/professions/dynamic/')
api.add_resource(PopularityProfessionResource, '/api/v1/professions/popularity/')
api.add_resource(SkillsResource, '/api/v1/professions/skills/')
api.add_resource(ProfessionResource, '/api/v1/professions/')
