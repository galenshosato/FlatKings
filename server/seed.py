from app import app
from random import choices as rc
from models import db, Bet, User

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        Bet.query.delete()
        User.query.delete()

        print("Seeding Users...")
        users = [
            User(email='galen.sato@gmail.com', password="lawandorderfiend"),
            User(email="teconomou7@hotmail.com", password = "knicks4Eva92"),
            User(email="nicksap@ymail.com", password="GreekFreakBucky22"),
            User(email="siddykittens@aol.com", password="wholeFoodsHomie09")
        ]

        db.session.add_all(users)

        print("Seeding bets...")

        bets = [
            Bet(team_name="New York Knicks", desc="h2h", odds=-110, wager=500, result=954, user_id = 1),
            Bet(team_name="Sacramento Kings", desc="h2h", odds=300, wager=250, result=1000, user_id = 2),
            Bet(team_name="Miluakee Bucks", desc="spread", odds=-110, wager=5, result=10, user_id = 3),
            Bet(team_name="Charlotte Bobcats", desc="h2h", odds=-110, wager=20, result=540, user_id = 4),
            Bet(team_name="Miami Heat", desc="spread", odds=200, wager=50, result=150, user_id = 1),
            Bet(team_name="New Orleans Pelicans", desc="h2h", odds=-1110, wager=590, result=10, user_id = 2),
            Bet(team_name="Boston Celtics", desc="spread", odds=-210, wager=670, result=200, user_id = 3),
            Bet(team_name="Pheonix Suns", desc="h2h", odds=500, wager=5000, result=10000, user_id = 4),
            Bet(team_name="Utah Jazz", desc="spread", odds=-210, wager=400, result=120, user_id = 1)
        ]

        db.session.add_all(bets)
        db.session.commit()
