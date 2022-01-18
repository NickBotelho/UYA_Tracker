from functools import cached_property
from flask import Flask, json, jsonify, request, render_template, send_file
from flask_cors import CORS, cross_origin
import time
import database

app = Flask(__name__, template_folder = 'frontend/server/build/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

searched_player = {}
games_cache = {}
chached_query_time = 0
refresh_interval = 10 #minutes between caching

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

@app.route("/stats/top10/overall/kills", methods = ["GET"])
@cross_origin(supports_credentials=True)
def getTop10Kills():
    # print("GETTING Top 10 Kills...")
    database.analytics(request)
    res = database.getTop10('overall', 'kills')
    status = {"status":200}
    return jsonify(res), status

@app.route("/stats/top10", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postTop10():
    if request.method == "POST":
        category = request.json['category']
        stat = request.json['stat']
        # print("POSTING recent {} game info for {}...".format(num_games, name))
        res = database.getTop10(category, stat)
        if res:
            return jsonify(res), 200
        else:
            res = {}
            return jsonify(res), 404



@app.route("/stats/top10/overall/deaths", methods = ["GET"])
@cross_origin(supports_credentials=True)
def getTop10Deaths():
    res = database.getTop10('overall', 'deaths')
    status = {"status":200}
    return jsonify(res), status
        
@app.route("/stats/top10/overall/wins", methods = ["GET"])
@cross_origin(supports_credentials=True)
def getTop10Wins():
    res = database.getTop10('overall', 'wins')
    status = {"status":200}
    return jsonify(res), status

        
@app.route("/stats/top10/overall/losses", methods = ["GET"])
@cross_origin(supports_credentials=True)
def getTop10Losses():
    res = database.getTop10('overall', 'losses')
    status = {"status":200}
    return jsonify(res), status

@app.route("/stats/all", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postEntireStat():
    if request.method == "POST":
        # print("Getting requested stat...")
        # print(request.json)
        category = request.json['category']
        category = "tdm" if category == 'deathmatch' else category
        category = "weapons" if category == 'weapon kills' or category == 'weapon deaths' else category
        stat = request.json['stat']
        res = database.getEntireStat(category, stat)
        status = {"status":200}
        
        return jsonify(res), status

@app.route("/player/stats", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postPlayer():
    if request.method == "POST":
        name = request.json['name']
        # print("POSTING info for {}...".format(name))
        searched_player = database.getPlayerStats(name)
        if searched_player:
            searched_player['status'] = 200
            return jsonify(searched_player), searched_player['status']
        else:
            searched_player = {}
            searched_player['status'] = 404
            return jsonify(searched_player), searched_player['status']

@app.route("/player/recent_games", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postRecentGames():
    if request.method == "POST":
        name = request.json['name']
        num_games = int(request.json['num_games'])
        # print("POSTING recent {} game info for {}...".format(num_games, name))
        searched_player = database.getRecentGames(name, num_games)
        if searched_player:
            return jsonify(searched_player), 200
        else:
            searched_player = {}
            return jsonify(searched_player), 404


@app.route("/general/recent_games", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postGeneralRecentGames():
    if request.method == "POST":
        global games_cache, chached_query_time, refresh_interva;
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

@app.route("/general/total_games", methods = ["GET"])
@cross_origin(supports_credentials=True)
def getNumGames():
    res = database.getTotalGames()
    return jsonify(res), 200


@app.route("/games/details", methods = ["POST"])
@cross_origin(supports_credentials=True)
def postDetailedGame():
    if request.method == "POST":
        game_id = float(request.json['id'])
        # print("POSTING for game {}..".format(game_id))
        res = database.getGameDetails(game_id)
        if res:
            return jsonify(res), 200
        else:
            res = {}
            return jsonify(res), 404


@app.route("/", methods = ["GET"])
@cross_origin(supports_credentials=True)
def serveHomepage():
    return render_template("index.html")


@app.route('/<path:text>', methods=['GET', 'POST'])
def all_routes(text):
        return render_template("index.html")



############API#######################
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



@app.route('/api/players/<path:name>', methods=['GET', 'POST'])
def playerAPI(name):
    res = database.getPlayerStats(name)
    return res if res != None else {}

@app.route('/api/games/<float:game_id>', methods=['GET', 'POST'])
def gamesAPI(game_id):
    res = database.getGameDetails(game_id)
    return res if res != None else {}

@app.route('/api/model/<idx>', methods=['GET', 'POST'])
def modelPrediction(idx):
    res = database.getGamePrediction(idx)
    return res if res != None else {}

@app.route('/api/graphs/<type>/<gameSize>', methods=['GET', 'POST'])
def getActivityGraph(type, gameSize):
    gameSize = int(gameSize)
    res = database.getActivityInformation(type, gameSize)
    return res if res != None else {}
@app.route('/api/graphs/weapons', methods=['GET'])
def getWeaponGraph():
    res = database.getWeaponBreakdown()
    return res if res != None else {}
@app.route('/api/graphs/ruleset', methods=['GET'])
def getRuleGraph():
    res = database.getRulsetBreakdown()
    return res if res != None else {}


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


    
app.run(debug = True) #COMMENT OUT FOR PRODUCTION


    
