import csv
import os
from typing import List

from flask import jsonify, request
from flask_restful import Resource, Api

api = Api()

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))


class DynamicsProfessionResource(Resource):
    @staticmethod
    def get():
        with open(os.path.join(__location__, 'data/dinamika.csv'), mode='r') as infile:
            csv_dict_reader = csv.DictReader(infile)
            items = list(csv_dict_reader)
            headers = list(csv_dict_reader.fieldnames)

        return jsonify({
            'headers': headers,
            'items': items[:10]
        })


def popularity_to_dict(item: List[str]):
    return {
        'label': item[0],
        'value': item[1]
    }


class PopularityProfessionResource(Resource):
    def get(self):
        trend = request.args.get('trend')
        with open(os.path.join(__location__, 'data/popularity.csv'), mode='r') as infile:
            reader = csv.reader(infile)
            data = list(reader)[1:]
        if trend == 'up':
            items = data[:10]
        else:
            items = data[-10:]
        return jsonify([popularity_to_dict(item) for item in items])


api.add_resource(DynamicsProfessionResource, '/api/v1/professions/dynamic/')
api.add_resource(PopularityProfessionResource, '/api/v1/professions/popularity/')
