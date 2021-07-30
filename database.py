from mongodb import Database
player_stats = Database("UYA","Player_Stats")
players_online = Database("UYA","Players_Online")
game_history = Database("UYA", "Game_History")
games_active = Database("UYA","Games_Active")
website_analytics = Database("UYA","Website_Analytics")

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
    return game_history.collection.count()
