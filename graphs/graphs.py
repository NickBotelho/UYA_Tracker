import matplotlib.pyplot as plt
from mongodb import Database
import datetime
monthNames = [
    "Jan",'Feb',
    'Mar', 'Apr', 'May', "Jun", 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
]
weekdaysNames = [
    'Sun', 'Mon', 'Tue', 'Wed',
    'Thu', 'Fri', 'Sat'
]
def produceGraphs(gameSize = 2):
    game_history = Database("UYA", "Game_History")
    dates = {}
    months = [0 for i in range(12)]
    weekdays = [0 for i in range(7)]
    for game in game_history.collection.find():
        if len(game['player_ids']) < gameSize: continue

        date = game['date'] #"Thu, 22 July 2021"
        args = date.split(" ")
        if len(args[2]) > 3: continue
        dates[date] = 1 if date not in dates else dates[date] + 1

        date = datetime.datetime.strptime(date, "%a, %d %b %Y")
        month = date.month
        weekday = date.weekday()

        months[month-1] +=1
        weekdays[weekday]+=1

    return {
        "gameSize":gameSize,
        "weekdays":{
            "x":weekdaysNames,
            "y":weekdays
        },
        "months":{
            "x":monthNames,
            "y":months
        }

    }

def DAU():
    plt.rcParams['axes.facecolor'] = '#9B5A06'
    game_history = Database("UYA", "Game_History")
    dates = {}
    months = [0 for i in range(12)]
    weekdays = [0 for i in range(7)]
    for game in game_history.collection.find():
        results = game['game_results']

        date = game['date'] #"Thu, 22 July 2021"
        if date not in dates:
            dates[date] = set()

        for player in game['player_ids']:
            dates[date].add(player)

    dates = {date:len(dates[date]) for date in dates}
    print(dates)
    plt.clf()
    plt.bar(x = dates.keys(), height = dates.values(), color = '#FFA836')
    plt.title("DAU")
    plt.ylabel("Users")
    plt.xlabel("Date")
    plt.xticks(rotation = 50)
    plt.tight_layout()
    plt.savefig("graphs/DAU")

def isFluxOnly(weapons):
    return len(weapons) == 1 and weapons[0] == 'Flux'

def isCycle(weapons):
    flux = 'Flux' in weapons
    blitz = 'Blitz' in weapons
    grav = 'Gravity Bomb' in weapons
    return len(weapons) > 1 and len(weapons) <= 3\
        and ((flux and grav) or (flux and blitz) or (flux and grav and blitz))
def isNoob(weapons):
    return len(weapons) > 3
def isWrenchOnly(weapons):
    return len(weapons) == 0

def rulesetBreakdown():
    plt.rcParams['axes.facecolor'] = '#9B5A06'
    game_history = Database("UYA", "Game_History")

    labels = ['Flux Only', "Cycle", "Other", "Wrench Only"]
    counter = [0 for category in labels]
    for game in game_history.collection.find():
        weapons = game['weapons']
        counter[0] = counter[0] +1 if isFluxOnly(weapons) else counter[0]
        counter[1] = counter[1] +1 if isCycle(weapons) else counter[1]
        counter[2] = counter[2] +1 if isNoob(weapons) else counter[2]
        counter[3] = counter[3] +1 if isWrenchOnly(weapons) else counter[3]
        

    plt.clf()
    plt.bar(x = labels, height = counter, color = '#FFA836')
    return {"x":labels, "y":counter}

def weaponBreakdown():
    import collections
    game_history = Database("UYA", "Game_History")

    c = collections.Counter()
    for game in game_history.collection.find():
        c.update(game['weapons'])
        

    return {"x":list(c.keys()), "y":list(c.values())}


