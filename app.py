from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


# Маршруты
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/add_form', methods=['GET', 'POST'])
def add_form():
    return render_template('add_form.html')


@app.route('/delete_form', methods=['GET', 'POST'])
def delete_form():
    return render_template('delete_form.html')


if __name__ == '__main__':
    app.run(debug=True)
