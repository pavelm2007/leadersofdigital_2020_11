from flask import Blueprint, render_template


bp = Blueprint('views_app', __name__)


@bp.route('/')
def index_view():
    return render_template('index.html')
