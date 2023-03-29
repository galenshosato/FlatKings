from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from models import db, User, Bet, UserBet

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

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

if __name__ == '__main__':
    app.run(port=5555, debug=True)



