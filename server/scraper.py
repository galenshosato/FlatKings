import requests
from bs4 import BeautifulSoup


html = requests.get('https://www.espn.com/nba/scoreboard/_/date/20230327')

doc = BeautifulSoup(html.text, 'html.parser')

def find_away_team(team_check):

    teams = doc.select('.ScoreboardScoreCell__Item.flex.items-center.relative.pb2.ScoreboardScoreCell__Item--away')

    check = [team.contents[1].contents[0] for team in teams]
    points = [[team.contents[3].contents[0] for team in teams]]

    index = ''
    success = ''

    for c in check:
        if c.contents[0].contents[0].contents[0] == team_check:
            index = check.index(c)

        
    for point in points:
        if int(point[index])  > 100:
            success = 'Win'
        else:
            success = 'Lose'

    return success

def find_home_team(team_check):


    teams = doc.select('.ScoreboardScoreCell__Item.flex.items-center.relative.pb2.ScoreboardScoreCell__Item--home')

    check = [team.contents[1].contents[0] for team in teams]
    points = [[team.contents[3].contents[0] for team in teams]]

    index = ''
    success = ''

    for c in check:
        if c.contents[0].contents[0].contents[0] == team_check:
            index = check.index(c)
    
        
    for point in points:
        if int(point[index]) > 115:
            success = 'Win'
        else:
            success = 'Lose'

    return success



