from app import app
from faker import Faker
import random
from models import db, Bet, UserBet, User

fake = faker()


def seed_data():
    with app.app_context():
        pass

