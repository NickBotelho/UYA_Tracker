from mongodb import Database
import pickle
from model.predictGame import predictGame
from graphs.graphs import gameAnalytics
from graphs.generateMapImage import createMap
player_stats = Database("UYA","Player_Stats")
players_online = Database("UYA","Players_Online")
game_history = Database("UYA", "Game_History")
games_active = Database("UYA","Games_Active")
website_analytics = Database("UYA","Website_Analytics")
clans = Database("UYA", "Clans")
uyaModel = pickle.load(open('model/uyaModel.sav', 'rb'))
chat = Database("UYA", "Chat")
log = Database("UYA", "Logger")



def getEntireStat(category, stat):
    return player_stats.getEntireStat(category, stat)

def getOnlinePlayers():
    return players_online.getOnlinePlayers()
    

def getTop10(category, stat):
    res = player_stats.getTop10(category, stat)
    return res

def getPlayerStats(username):
    if player_stats.exists(username):
        res = player_stats.getAllPlayerStats(username)
        return res
    return None

def getRecentGames(username, num_games):
    '''returns the num_games or as many possible games of basic info 
    relative to the given username (ie if they win or lost...maybe add their kd at some point'''
    if player_stats.exists(username):
        res = player_stats.getAllPlayerStats(username)
        res = res['match_history']
        game_ids = list(res.keys())
        res = []
        if len(game_ids) >= num_games:
            game_ids = game_ids[len(game_ids)-num_games:len(game_ids)]
        for i in range(len(game_ids)-1,-1, -1 ):        
            game_ids[i]=(float(game_ids[i]))

        game_ids = game_ids[::-1]
        for game_id in game_ids:
            res.append(game_history.getBasicGameInformationForPlayer(game_id=game_id, username=username))
        return res
    return None

def getAllGames(start, end):
    '''returns the game archives'''
    i = 0
    res = {}
    for game in game_history.collection.find().sort([('entry_number', -1)]):
        curr = game_history.getBasicGeneralGameInformation(game['game_id'])
        if not curr: break

        if i >= start and i < end:
            res[i] = curr

        if i >= end:
            break
        else:
            i+=1
    return res

def getGameDetails(game_id):
    '''returns a detailed dict for the single passed game id'''
    return game_history.getDetailedGameInformation(game_id)

def analytics(request):
    '''update site analytics based on request'''
    website_analytics.updateAnalytics(request.environ['REMOTE_ADDR'])
    return

def getTotalGames():
    '''returns number of games in records'''
    return game_history.collection.count_documents({})

def getOnlinePlayerObjects():
    return players_online.getActivePlayers()

def getOnlineGamesObjects():
    return games_active.getActiveGames()

def getOnlineClans():
    return clans.getActiveClans(players_online)




def getGameAnalytics():
    res = gameAnalytics()
    return res

def getGamePredictionIndex(idx):
    '''given the idx of the game return the predictions'''
    games = games_active.getActiveGames()
    idx = int(idx)
    if idx >= len(games):
        #error
        return {"error":"Invalid game ID"}
    else:
        game = games[idx]
        if len(game['details']['players']) % 2 != 0:
            return {"error":"This model is not build for uneven teams"}
        else:
            teams, probs = predictGame(game, uyaModel, player_stats)
            red, red_p = teams[0], probs[0]
            blue, blue_p = tuple(teams[1]), probs[1]
        
            temp = ''
            for player in red:
                temp+= f"{player} "
            redTeam = temp
            temp = ''
            for player in blue:
                temp+= f"{player} "
            blueTeam = temp

            return {
                redTeam:red_p,
                blueTeam:blue_p
            }

def getGamePredictionHost(host):
    '''given the idx of the game return the predictions'''
    games = games_active.getActiveGames()
    hosts = {game['details']['host'].lower():game for game in games}
    if host.lower() not in hosts:
        #error
        return {"error":"Game not found"}
    else:
        game =hosts[host.lower()]
        if len(game['details']['players']) % 2 != 0:
            return {"error":"This model is not build for uneven teams"}
        else:
            teams, probs = predictGame(game, uyaModel, player_stats)
            red, red_p = teams[0], probs[0]
            blue, blue_p = tuple(teams[1]), probs[1]
        
            temp = ''
            for player in red:
                temp+= f"{player} "
            redTeam = temp
            temp = ''
            for player in blue:
                temp+= f"{player} "
            blueTeam = temp

            return {
                redTeam:red_p,
                blueTeam:blue_p
            }


def getChat():
    MAX_LEN =25
    messages=chat.collection.find_one({})
    del messages['_id']
    res = []
    messages = sorted(messages.items(), key = lambda x: x[0])
    for message in messages:
        message = message[1]
        name = message[2]
        m = message[1]
        if len(m) > MAX_LEN:
            m = m[:MAX_LEN]
        res.append([name, m])
    if len(res) > 15:
        res = res[len(res)-15:]  
    return res

def getMap(dme_id):
    game = log.collection.find_one({
        'dme_id':dme_id
    })
    if not game: return None

    map = game['map']
    graphInfo = game['graph']
    # return createMap(graphInfo['x'],graphInfo['y'],graphInfo['names'],graphInfo['color'],map, graphInfo['hp']) 
    return graphInfo

def getLiveGameInfo(dme_id):
    game = log.collection.find_one({
        'dme_id':dme_id
    })
    if not game: return None
    game = dict(game)
    del game['_id']
    return game if game != None else None

def getLiveGames():
    dmes = []
    for game in log.collection.find():
        dmes.append(game['dme_id'])
    return dmes