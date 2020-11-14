from flask import Flask
from flask_cors import CORS

from api.api import api
from api.config import Config
from views import views


def create_app(config):
    app = Flask(__name__)
    CORS(app)
    app.config['DEBUG'] = True
    app.config.from_object(config)
    register_extensions(app)
    app.register_blueprint(views.bp)
    return app


def register_extensions(app):
    api.init_app(app)


app = create_app(Config)

# Run the application
# if __name__ == '__main__':
#     app = create_app(Config)
#     app.run(host='0.0.0.0', port=80, debug=True, threaded=True)
