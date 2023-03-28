from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from models import db, User, Bet

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def home():
    return ''

# @app.route('/user_info', methods=['POST'])
# def user_info():

#     if request.method == 'POST':
#         data = request.get_json()

#         userInfo = User(
#             email=data['email'],
#             password=data['password']
#         )

#         db.session.add(userInfo)
#         db.session.commit()

#         return make_response(jsonify(userInfo.to_dict()), 201)
    
@app.route('/user/<int:id>', methods=['GET', 'POST'])
def user_info(id):
    user = User.query.filter(User.id == id).first()
    bets = user.bets

    if request.method == 'GET':
        bets_dict = [bet.to_dict() for bet in bets]
        return make_response(jsonify(bets_dict), 200)
        


    elif request.method == 'POST':
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



