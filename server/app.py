from flask import Flask, jsonify, render_template, request, make_response, session as browser_session
from extensions import *
from models import db, User, Bet

import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.environ.get('SECRET_KEY')
app.json.compact = False


db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)

excluded_endpoints = ['root', 'login', 'logout', 'signup']

@app.route('/')
def home():
    return ''

@app.route('/user_info', methods=['POST'])
def sign_up():

    if request.method == 'POST':
        data = request.get_json()

        userInfo = User(
            email=data['email'],
            password=data['password']
        )

        db.session.add(userInfo)
        db.session.commit()

        return make_response(jsonify(userInfo.to_dict()), 201)
    
@app.route('/bets', methods=['POST'])
def bets_info():

    if request.method == 'POST':
        data = request.get_json()

        bet = Bet(
            team_name = data['team_name'],
            desc = data['desc'],
            odds = data['odds'],
            wager = data['wager'],
            success = data['success']
        )

        db.session.add(bet)
        db.session.commit()

        return make_response(jsonify(bet.to_dict()), 201)
    

@app.route('/login', methods=['POST'])
def login():

    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({'error': 'invalid login'}), 404

        # if not user.authenticate(password):
        #     return jsonify({'error': 'invalid login'}), 404

        browser_session['user_id'] = user.id
        return jsonify(user.to_dict()), 201
    


@app.route('/user/1', methods=['GET'])
def get_users_bets():
    user = User.query.filter(User.id == 1).first()

    user_bets = [bet.to_dict() for bet in user.bets]

    return make_response(jsonify(user_bets), 200)

@app.route('/logintest', methods=['GET'])
def logintest():
    if request.method == 'GET':
        users = User.query.order_by(User.id).all()
        return make_response(jsonify(user.to_dict() for user in users),200)

if __name__ == '__main__':
    app.run(port=5555, debug=True)



