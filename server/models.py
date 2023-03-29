from sqlalchemy.orm import validates
from extensions import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.String)
    bets = db.relationship('Bet', backref='user')

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "bets": [bet.to_dict() for bet in self.bets]
        }
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
class Bet(db.Model):
    __tablename__= "bets"

    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String)
    desc = db.Column(db.String)
    odds = db.Column(db.Integer)
    wager = db.Column(db.Integer)
    result = db.Column(db.Integer)
    success = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "team_name": self.team_name,
            "description": self.desc,
            "odds": self.odds,
            "wager": self.wager,
            "result": self.result,
            "success": self.success
        }