from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.String)
    user_bets = db.relationship('UserBet', backref='user')

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password
        }
    
class Bet(db.Model):
    __tablename__= "bets"

    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String)
    desc = db.Column(db.String)
    odds = db.Column(db.Integer)
    wager = db.Column(db.Integer)
    success = db.Column(db.Boolean)
    user_bets = db.relationship('UserBet', backref='bet')

    def to_dict(self):
        return {
            "id": self.id,
            "team name": self.team_name,
            "description": self.desc,
            "odds": self.odds,
            "wager": self.wager,
            "W/L": self.success,
        }

class UserBet(db.Model):
    __tablename__ = 'user_bets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bet_id = db.Column(db.Integer, db.ForeignKey('bets.id'))

