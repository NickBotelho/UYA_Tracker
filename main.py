from flask import Flask, json, jsonify, request, render_template, send_file
from flask_cors import CORS, cross_origin
import time
from cache import Cache

import database
from graphs.graphs import monthNames, weekdaysNames

app = Flask(__name__, template_folder = 'frontend/server/build/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

searched_player = {}
games_cache = {}
chached_query_time = 0
refresh_interval = 10 #minutes between caching
valid_years = ['2021', '2022','2023','2024','2025']
cache = Cache()
analytics_cache = {}

@app.route("/player", methods = ["GET"])
@cross_origin(supports_credentials=True)
def getPlayer():
    print(searched_player)
    if request.method == "GET":
        # print("GETTING info for {}...".format(searched_player['name']))
        searched_player['status'] = 200
        return jsonify(searched_player), searched_player['status']

@app.route("/players/online", methods = ["POST"])
@cross_origin(supports_credentials=True)
def getOnlinePlayers():
    if request.method == "POST":
        # print("GETTING online players...")
        online = database.getOnlinePlayers()
        return jsonify(online), 200


@app.route("/general/recent_games", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postGeneralRecentGames():
    if request.method == "POST":
        global games_cache, chached_query_time, refresh_interval
        start = request.json['start']
        end = request.json['end']
        current_query_time = time.time()
        if abs((chached_query_time - current_query_time)//60) <= refresh_interval:
            if start in games_cache:
                res = games_cache[start]
            else:
                res = database.getAllGames(start, end)
                games_cache[start] = res
        else:
            games_cache = {}
            res = database.getAllGames(start, end)
            games_cache[start] = res
            chached_query_time = current_query_time

        if res:
            return jsonify(res), 200
        else:
            res = {}
            return jsonify(res), 404



@app.route("/", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveHomepage():
    database.analytics(request)
    return render_template("index.html")


@app.route('/<path:text>', methods=['GET', 'POST'])
def all_routes(text):
    database.analytics(request)
    return render_template("index.html")



############API#######################
##############COMMANDS################
@app.route('/cache/clear', methods=['GET'])
def clearCache():
    cache.clear()
    return "Cache Cleared!", 200

@app.route('/cache/status', methods=['GET'])
def cacheStatus():
    res = cache.status()
    return res, 200
@app.route('/server/status', methods=['GET'])
def serverStatus():
    return "Up and running!", 200

########ONLINE APIS###################
@app.route('/api/online/players', methods=['GET'])
def getOnlinePlayersObjects():
    res = database.getOnlinePlayerObjects()
    return json.dumps(res) if res != None else {}
@app.route('/api/online/games', methods=['GET'])
def getOnlineGamesObjects():
    res = database.getOnlineGamesObjects()
    return json.dumps(res) if res != None else {}
@app.route('/api/online/clans', methods=['GET'])
def getOnlineClans():
    res = database.getOnlineClans()
    return json.dumps(res) if res != None else {}
@app.route('/api/online/chat', methods=['GET'])
def getOnlineChat():
    res = database.getChat()
    return json.dumps(res) if res != None else {}


#############DB QUERIES################
@app.route('/api/players/<path:name>', methods=['GET', 'POST'])
def playerAPI(name):
    key = cache.generatePlayerStatsKey(name)
    res = cache.get(key)
    return res if res != None else {}

@app.route('/api/games/<float:game_id>', methods=['GET', 'POST'])
def gamesAPI(game_id):
    game_id = float(request.json['id'])
    key = cache.generateGameDetailKey(game_id)
    res = cache.get(key)
    return res if res != None else {}

@app.route("/api/stats/top10", methods = ["GET","POST"])
@cross_origin(supports_credentials=True)
def postTop10_2():
    global cache
    if request.method == "POST":
        category = request.json['category']
        stat = request.json['stat']
        cacheKey = cache.generateTop10Key(category, stat)
        res = cache.get(cacheKey)
        if res:
            return jsonify(res), 200
        else:
            res = {}
            return jsonify(res), 404

@app.route("/api/players/recent_games", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postRecentGames_2():
    if request.method == "POST":
        name = request.json['name']
        num_games = int(request.json['num_games'])
        cacheKey = cache.generateRecentGamesKey(name, num_games)
        searched_player = cache.get(cacheKey)
        if searched_player:
            return jsonify(searched_player), 200
        else:
            searched_player = {}
            return jsonify(searched_player), 404
@app.route("/api/general/total_games", methods = ["GET"])
@cross_origin(supports_credentials=True)
def getNumGames_2():
    key = cache.generateGeneralKey("totalGames")
    res = cache.get(key)

    return jsonify(res), 200
@app.route("/api/players/stats", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postPlayer_2():
    if request.method == "POST":
        name = request.json['name']
        key = cache.generatePlayerStatsKey(name)
        res = cache.get(key)
        return res if res != None else {}

@app.route("/api/stats/all", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postEntireStat_2():
    if request.method == "POST":
        category = request.json['category']
        category = "tdm" if category == 'deathmatch' else category
        category = "weapons" if category == 'weapon kills' or category == 'weapon deaths' else category
        stat = request.json['stat']
        cacheKey = cache.generateEntireStatKey(category, stat)
        res = cache.get(cacheKey)   
        return jsonify(res), 200
        
@app.route("/api/games/details", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postDetailedGame_2():
    if request.method == "POST":
        game_id = float(request.json['id'])
        key = cache.generateGameDetailKey(game_id)
        res = cache.get(key)
        return res if res != None else {}

################ML MODEL################
@app.route('/api/model/index/<idx>', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def modelPredictionIndex(idx):
    res = database.getGamePredictionIndex(idx)
    return res if res != None else {}
@app.route('/api/model/host/<name>', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def modelPredictionHost(name):
    res = database.getGamePredictionHost(name)
    return res if res != None else {}

###########GRAPH CALLS######################
@app.route('/api/graphs/map_count/<gameSize>/<year>', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getMapsPlayed(gameSize, year):
    global analytics_cache, chached_query_time, refresh_interval, valid_years
    year = "all" if year not in valid_years else year
    current_query_time = time.time()
    # gameSize = convertSize[int(gameSize)] if gameSize != "all" else gameSize
    if abs((chached_query_time - current_query_time)//60) > refresh_interval:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    elif year not in analytics_cache:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    res = analytics_cache[year][gameSize]['map_count']
    x = list(res.keys())
    x = [map.replace("_", " ") for map in x]

    return {"x":x, "y":list(res.values()),
    'title':"Games Played", "xlabel":"Weekday","ylabel":'Games Played'}
@app.route('/api/graphs/map_time/<gameSize>/<year>', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getMapsTime(gameSize, year):
    global analytics_cache, chached_query_time, refresh_interval, valid_years
    year = "all" if year not in valid_years else year
    current_query_time = time.time()
    if abs((chached_query_time - current_query_time)//60) > refresh_interval:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    elif year not in analytics_cache:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    res = analytics_cache[year][gameSize]['map_time']
    x = list(res.keys())
    x = [map.replace("_", " ") for map in x]

    return {"x":x, "y":list(res.values()),
    'title':"Average Game Length", "xlabel":"Map","ylabel":'Minutes'}
@app.route('/api/graphs/weekday_activity/<gameSize>/<year>', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getWeekdayActivity(gameSize,year):
    global analytics_cache, chached_query_time, refresh_interval, valid_years
    year = "all" if year not in valid_years else year
    current_query_time = time.time()
    if abs((chached_query_time - current_query_time)//60) > refresh_interval:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    elif year not in analytics_cache:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    res = analytics_cache[year][gameSize]['weekdays']
    return {"x":weekdaysNames, "y":res,
    'title':"Games Played", "xlabel":"Weekday","ylabel":'Games Played'}
@app.route('/api/graphs/month_activity/<gameSize>/<year>', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getMonthActivity(gameSize, year):
    global analytics_cache, chached_query_time, refresh_interval, valid_years
    year = "all" if year not in valid_years else year
    current_query_time = time.time()
    if abs((chached_query_time - current_query_time)//60) > refresh_interval:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    elif year not in analytics_cache:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    res = analytics_cache[year][gameSize]['months']
    return {"x":monthNames, "y":res,
    'title':"Games Played", "xlabel":"Month","ylabel":'Games Played'}
@app.route('/api/graphs/month_time/<gameSize>/<year>', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getMonthTime(gameSize,year):
    global analytics_cache, chached_query_time, refresh_interval, valid_years
    year = "all" if year not in valid_years else year
    current_query_time = time.time()
    if abs((chached_query_time - current_query_time)//60) > refresh_interval:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    elif year not in analytics_cache:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    res = analytics_cache[year][gameSize]['month_time']
    return {"x":monthNames, "y":res,
    'title':"Time Played", "xlabel":"Month","ylabel":'Minutes'}
@app.route('/api/graphs/weapon_usage/<gameSize>/<year>', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getWeaponUsage(gameSize, year):
    global analytics_cache, chached_query_time, refresh_interval, valid_years
    year = "all" if year not in valid_years else year
    current_query_time = time.time()
    if abs((chached_query_time - current_query_time)//60) > refresh_interval:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    elif year not in analytics_cache:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    res = analytics_cache[year][gameSize]['weapon_usage']
    return {"x":list(res.keys()), "y":list(res.values()),
    'title':"Games Played", "xlabel":"Weapon","ylabel":'Games Played'}
@app.route('/api/graphs/weapon_kills/<gameSize>/<year>', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getWeaponKills(gameSize, year):
    global analytics_cache, chached_query_time, refresh_interval, valid_years
    year = "all" if year not in valid_years else year
    current_query_time = time.time()
    if abs((chached_query_time - current_query_time)//60) > refresh_interval:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    elif year not in analytics_cache:
        analytics_cache[year] = database.getGameAnalytics(year)
        chached_query_time = current_query_time
    res = analytics_cache[year][gameSize]['weapon_kills']
    return {"x":list(res.keys()), "y":list(res.values()),
    'title':"Kills", "xlabel":"Weapon","ylabel":'Kills'}


#########SUMMARY##################
@app.route('/api/', methods=['GET'])
def generalAPI():
    return "/api/players/player_username<br>/api/games/game_id"
#################################
############IMAGES###############
@app.route("/main.js", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveMain():
    return render_template("main.js")

@app.route("/uya_logo.ico", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveLogo():
    return send_file('frontend/server/build/uya_logo.ico', mimetype="image/x-icon")

@app.route("/static/images/loading_circle.gif", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveLoadingCircle():
    return send_file("frontend/server/build/loading_circle.gif", mimetype = "image/gif")

@app.route("/build/9e2ac63289fe4834c89307f12a6705a6.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveOnlineDot():
    return send_file("frontend/server/build/9e2ac63289fe4834c89307f12a6705a6.png", mimetype = "image/gif")

@app.route("/build/e9547b774c740309e1c0b66755bc6510.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveFullBakisi():
    return send_file("frontend/server/build/e9547b774c740309e1c0b66755bc6510.png", mimetype = "image/gif")
    
@app.route("/build/2ffe4ffcff235ca7c53365386b81be40.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveFullMetro():
    return send_file("frontend/server/build/2ffe4ffcff235ca7c53365386b81be40.png", mimetype = "image/gif")

@app.route("/build/9122cf90141fefb7097f8899bf997a25.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveFullX12():
    return send_file("frontend/server/build/9122cf90141fefb7097f8899bf997a25.png", mimetype = "image/gif")

@app.route("/build/f8054e02033c18baccd90dcd7579e265.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveFullMarcadia():
    return send_file("frontend/server/build/f8054e02033c18baccd90dcd7579e265.png", mimetype = "image/gif")

@app.route("/build/4b712895e8c184fc0887b22364be58b6.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveBoardBWC():
    return send_file("frontend/server/build/4b712895e8c184fc0887b22364be58b6.png", mimetype = "image/gif")

@app.route("/build/04cc69b88af39bcc162d64f947eb9086.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveBoardMarcadia():
    return send_file("frontend/server/build/04cc69b88af39bcc162d64f947eb9086.png", mimetype = "image/gif")

@app.route("/build/24a066ea6d58ea0c052f8484fb63d222.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveBoardMetro():
    return send_file("frontend/server/build/24a066ea6d58ea0c052f8484fb63d222.png", mimetype = "image/gif")

@app.route("/build/954a7191be5ea3e9272b72e82fce47f4.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveBoardHoven():
    return send_file("frontend/server/build/954a7191be5ea3e9272b72e82fce47f4.png", mimetype = "image/gif")

@app.route("/build/9574b4796ede0cc4c20b785c3901f5dd.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveBoardX12():
    return send_file("frontend/server/build/9574b4796ede0cc4c20b785c3901f5dd.png", mimetype = "image/gif")

@app.route("/build/e43becc513b8d64e60b75c9f0ad74f58.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveBoardBakisi():
    return send_file("frontend/server/build/e43becc513b8d64e60b75c9f0ad74f58.png", mimetype = "image/gif")

@app.route("/static/images/forward_arrow.svg", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveForArrow():
    return send_file("frontend/static/images/forward_arrow.svg", mimetype = "image/svg+xml")

@app.route("/static/images/backward_arrow.svg", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveBackArrow():
    return send_file("frontend/static/images/backward_arrow.svg", mimetype = "image/svg+xml")

@app.route("/build/a0fcc87bbf523600488d73b689697ade.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveKisiRadar():
    return send_file("frontend/server/build/a0fcc87bbf523600488d73b689697ade.png", mimetype = "image/gif")
@app.route("/build/ca978c3641d3565debfecaf6b1778613.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servehovenRadar():
    return send_file("frontend/server/build/ca978c3641d3565debfecaf6b1778613.png", mimetype = "image/gif")
@app.route("/static/images/radars/hoven.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servehovenRadar2():
    return send_file("frontend/static/images/radars/hoven.png", mimetype = "image/gif")
@app.route("/build/61eb1a9d10223e9ab24b33b9247cdf72.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servex12Radar():
    return send_file("frontend/server/build/61eb1a9d10223e9ab24b33b9247cdf72.png", mimetype = "image/gif")
@app.route("/build/cc5bd4bbd160af7b40c8e589ba852776.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servekorgonRadar():
    return send_file("frontend/server/build/cc5bd4bbd160af7b40c8e589ba852776.png", mimetype = "image/gif")
@app.route("/build/f46532c4fb676864785437ae05af032c.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servemetroRadar():
    return send_file("frontend/server/build/f46532c4fb676864785437ae05af032c.png", mimetype = "image/gif")
@app.route("/build/b4290a7814bc36535718def9c60f1854.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servebwcRadar():
    return send_file("frontend/server/build/b4290a7814bc36535718def9c60f1854.png", mimetype = "image/gif")
@app.route("/build/42df2b7880a7e742ce9029c28e574716.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servecommandRadar():
    return send_file("frontend/server/build/42df2b7880a7e742ce9029c28e574716.png", mimetype = "image/gif")
@app.route("/build/ced578cf338f8ad92821552e996135d8.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servesewersRadar():
    return send_file("frontend/server/build/ced578cf338f8ad92821552e996135d8.png", mimetype = "image/gif")
@app.route("/build/33c1399e057c1d3e3ec269f45f8f3dae.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servedoxRadar():
    return send_file("frontend/server/build/33c1399e057c1d3e3ec269f45f8f3dae.png", mimetype = "image/gif")
@app.route("/build/e78fc04c78807c4c54718acfa77e9b43.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servemarcadiaRadar():
    return send_file("frontend/server/build/e78fc04c78807c4c54718acfa77e9b43.png", mimetype = "image/gif")
@app.route("/static/images/playerIndicator.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveplayerindicator():
    return send_file("frontend/static/images/playerIndicator.png", mimetype = "image/gif")
@app.route("/static/images/ryno.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveRyno():
    return send_file("frontend/static/images/ryno.png", mimetype = "image/gif")
@app.route("/static/images/flag.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveFlag():
    return send_file("frontend/static/images/flag.png", mimetype = "image/gif")
@app.route("/build/1c7b001f6b68343eeceb6fd700781982.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveblitz():
    return send_file("frontend/server/build/1c7b001f6b68343eeceb6fd700781982.png", mimetype = "image/gif")
@app.route("/build/233a53c6da5a53deb1446f4d911de0f9.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveflux():
    return send_file("frontend/server/build/233a53c6da5a53deb1446f4d911de0f9.png", mimetype = "image/gif")
@app.route("/build/536e3c67229684527c27bb0aa212c110.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servegravity():
    return send_file("frontend/server/build/536e3c67229684527c27bb0aa212c110.png", mimetype = "image/gif")
@app.route("/build/254655516cb16697b464fa2304e719c7.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servelava():
    return send_file("frontend/server/build/254655516cb16697b464fa2304e719c7.png", mimetype = "image/gif")
@app.route("/build/f1c0fe25e07b3debe781db5ca3a0c541.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servemines():
    return send_file("frontend/server/build/f1c0fe25e07b3debe781db5ca3a0c541.png", mimetype = "image/gif")
@app.route("/build/ec79c22b7e01b6b091eea7b3e0952531.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def servemorph():
    return send_file("frontend/server/build/ec79c22b7e01b6b091eea7b3e0952531.png", mimetype = "image/gif")
@app.route("/build/e133c0b3e28411f5cc96b330a20613f2.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serven60():
    return send_file("frontend/server/build/e133c0b3e28411f5cc96b330a20613f2.png", mimetype = "image/gif")
@app.route("/build/9c02e1c207096a9e93f2d9cb0936a83d.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serverockets():
    return send_file("frontend/server/build/9c02e1c207096a9e93f2d9cb0936a83d.png", mimetype = "image/gif")
@app.route("/static/images/skull.png", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveskullindicator():
    return send_file("frontend/static/images/skull.png", mimetype = "image/gif")
@app.route('/api/live/map', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getLiveMap():
    if request.method == "POST":
        dme_id = float(request.json['dme_id'])
        res = database.getMap(int(dme_id))
        return jsonify(res), 200 if res != None else 404
        # res = '<img src="data:image/png;base64,{}">'.format(res)
        # return '<form method="POST" enctype="multipart/form-data"><input type="file" name="image"><button type="submit">Send</button></form><br>' + res
@app.route('/api/live/game', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getLiveGameInfo():
    if request.method == "POST":
        dme_id = float(request.json['dme_id'])
        res = database.getLiveGameInfo(int(dme_id))
        return jsonify(res), 200 if res != None else 404   

@app.route('/api/live/available', methods=['GET'])
@cross_origin(supports_credentials=True)
def getLiveGames():
    if request.method == "GET":
        res = database.getLiveGames()
        return jsonify(res), 200 if res != None else 404   


# @app.route('/ip', methods=['GET'])
# @cross_origin(supports_credentials=True)
# def getIP():
#     if request.method == "GET":
#         res = {
#             "acces_route":request.access_route[0],
#             'remote_addr':request.remote_addr,
#             'environ':request.environ['REMOTE_ADDR']
#         }
#         return res
    
# app.run(debug = True) #COMMENT OUT FOR PRODUCTION
