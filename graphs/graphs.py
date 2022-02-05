import matplotlib.pyplot as plt
from mongodb import Database
import datetime
import copy
import collections

monthNames = [
    "Jan",'Feb',
    'Mar', 'Apr', 'May', "Jun", 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
]
weekdaysNames = [
    'Sun', 'Mon', 'Tue', 'Wed',
    'Thu', 'Fri', 'Sat'
]


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



convertSize = {
        2:'1v1',
        4:'2v2',
        6:'3v3',
        8:'4v4'
    }
def gameAnalytics():

    game_history = Database("UYA", "Game_History")
    months = [0 for i in range(12)]
    weekdays = [0 for i in range(7)]

    maps={
        "Bakisi_Isle":0,
        "Hoven_Gorge":0,
        "Outpost_x12":0,
        "Korgon_Outpost":0,
        "Metropolis":0,
        "Blackwater_City":0,
        "Command_Center":0,
        'Aquatos_Sewers':0,
        "Blackwater_Dox":0,
        "Marcadia_Palace":0
    }

    oneSize = {
        'map_time':copy.deepcopy(maps),
        'map_count':copy.deepcopy(maps),
        'weekdays':copy.deepcopy(weekdays),
        'months':copy.deepcopy(months),
        'month_time':copy.deepcopy(months),
        'weapon_usage':collections.Counter(),
        'weapon_kills':collections.Counter()
    }

    sizes = {
        'all':copy.deepcopy(oneSize),
        '1v1':copy.deepcopy(oneSize),
        '2v2':copy.deepcopy(oneSize),
        '3v3':copy.deepcopy(oneSize),
        '4v4':copy.deepcopy(oneSize)
    }
    
    for game in game_history.collection.find():
        gameSize = len(game['player_ids'])
        gameSize = gameSize - 1 if gameSize % 2 != 0 else gameSize


        date = game['date'] #"Thu, 22 July 2021"
        args = date.split(" ")
        if len(args[2]) > 3: continue


        date = datetime.datetime.strptime(date, "%a, %d %b %Y")
        month = date.month
        weekday = date.weekday()

        players = game['game_results']
        players = players['winners'] + players['losers']
        for player in players:
            sizes['all']['weapon_kills'].update(player['weapons'])
            sizes[convertSize[gameSize]]['weapon_kills'].update(player['weapons'])
            

        sizes['all']['months'][month-1] +=1
        sizes['all']['month_time'][month-1] += game['minutes']*gameSize
        sizes['all']['map_count'][game['map']]+=1
        sizes['all']['map_time'][game['map']]+=game['minutes']
        sizes['all']['weekdays'][weekday] +=1
        sizes['all']['weapon_usage'].update(game['weapons'])

        sizes[convertSize[gameSize]]['months'][month-1] +=1
        sizes[convertSize[gameSize]]['month_time'][month-1] += game['minutes']*gameSize
        sizes[convertSize[gameSize]]['weekdays'][weekday] +=1
        sizes[convertSize[gameSize]]['map_count'][game['map']]+=1
        sizes[convertSize[gameSize]]['map_time'][game['map']]+=game['minutes']
        sizes[convertSize[gameSize]]['weapon_usage'].update(game['weapons'])

    for size in sizes:
        sizes[size]['weapon_usage'] = dict(sizes[size]['weapon_usage'])

        times = sizes[size]['map_time']
        for map in times:
            times[map] = round(times[map] / sizes[size]['map_count'][map], 2)

        sizes[size]['weapon_kills'] = {
            "Flux":sizes[size]['weapon_kills']['flux_kills'],
            "Blitz":sizes[size]['weapon_kills']['blitz_kills'],
            "Gravity Bomb":sizes[size]['weapon_kills']['gravity_bomb_kills'],
            "Rockets":sizes[size]['weapon_kills']['rocket_kills'],
            "N60":sizes[size]['weapon_kills']['n60_kills'],
            "Lava Gun":sizes[size]['weapon_kills']['lava_gun_kills'],
            "Morph O' Ray":sizes[size]['weapon_kills']['morph_kills'],
            "Mines":sizes[size]['weapon_kills']['mines_kills'],
            'Wrench':sizes[size]['weapon_kills']['wrench_kills'],
        }
            

    return sizes

def gunAnalytics():
    player_stats = Database("UYA", "Player_Stats")
    counter = collections.Counter()
    for player in player_stats.collection.find():
        counter.update(player['stats']['weapons'])

    counter = dict(counter)
    counter = {gun:counter[gun] for gun in counter if 'kills' in gun}
    res = {
        "Flux":counter['flux_kills'],
        "Blitz":counter['blitz_kills'],
        "Gravity Bomb":counter['gravity_bomb_kills'],
        "Rockets":counter['rocket_kills'],
        "N60":counter['n60_kills'],
        "Lava Gun":counter['lava_gun_kills'],
        "Morph O' Ray":counter['morph_kills'],
        "Mines":counter['mines_killls'],
        'Wrench':counter['wrench_kills'],
    }
    return res