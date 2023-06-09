from flask import Flask, jsonify, render_template, request, make_response, session as browser_session
from extensions import *
from models import db, User, Bet
from scraper import find_away_team, find_home_team

import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = 'super secret key'

db.init_app(app)
migrate.init_app(app, db)


@app.route('/')
def home():
    return ''

@app.route('/user_info', methods=['POST'])
def user_info():

    if request.method == 'POST':
        data = request.get_json()

        userInfo = User(
            email=data['email'],
            password=data['password']
        )

        db.session.add(userInfo)
        db.session.commit()

        return make_response(jsonify(userInfo.to_dict()), 201)

@app.route('/check_session')
def get():
    user = User.query.filter(User.id == browser_session.get('user_id')).first()

    if user:
        return jsonify(user.to_dict())
    else:
       return jsonify({'message': '401: Not Authorized'}), 401
    
@app.route('/bets', methods=['POST'])
def bets_info():

    if request.method == 'POST':
        data = request.get_json()

        bet = Bet(
            team_name = data['team_name'],
            desc = data['desc'],
            odds = data['odds'],
            wager = data['wager'],
            result = data['result'],
            user_id = data['user_id']
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


        browser_session['user_id'] = user.id
        
        return jsonify(user.to_dict()), 201

@app.route('/logintest', methods=['GET'])
def logintest():
    if request.method == 'GET':
        users = User.query.order_by(User.id).all()
        return make_response(jsonify(user.to_dict() for user in users),200)

@app.route('/bet/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def bet_by_id(id):
    bet = Bet.query.filter_by(id=id).first()
    name_array = bet.team_name.split()
    name = name_array[-1]

    if request.method == 'GET':
        return make_response(jsonify(bet.to_dict()), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(bet)
        db.session.commit()

        return make_response(jsonify({"delete": "You have successfully deleted this bet"}))
    
    elif request.method == 'PATCH':
        if find_away_team(name) == 'Win':
            bet.success = True        
            db.session.add(bet)
            db.session.commit()

            return(jsonify(bet.to_dict()), 200)
        elif find_away_team(name) == 'Lose':
            bet.success = False
            db.session.add(bet)
            db.session.commit()

            return(jsonify(bet.to_dict()), 200)
        
        elif find_home_team(name) == 'Win':
            bet.success = True        
            db.session.add(bet)
            db.session.commit()

            return(jsonify(bet.to_dict()), 200)
        
        elif find_home_team(name) == 'Lose':
            bet.success = False
            db.session.add(bet)
            db.session.commit()

            return(jsonify(bet.to_dict()), 200)


    

@app.route('/user/<int:id>')
def user_by_id(id):
    user = User.query.filter_by(id=id).first()

    if request.method == 'GET':
        user_dict = [bet.to_dict() for bet in user.bets]
        return make_response(jsonify(user_dict), 200)
    
    


if __name__ == '__main__':
    app.run(port=5555, debug=True)



