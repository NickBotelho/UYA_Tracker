import pymongo
from pymongo import MongoClient
import time
from config import MongoPW, MongoUser
import os
try:
    if not MongoPW or not MongoUser:
        MongoPW = os.environ("MongoPW")
        MongoUser = os.environ("MongoUser")
except:
    print(MongoPW, MongoUser)
    print('failed to load credentials')
    exit(1)
class Database():
    def __init__(self,db,collection):
        self.client = pymongo.MongoClient("mongodb+srv://{}:{}@cluster0.jydx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority".format(MongoUser, MongoPW))
        self.db = self.client[db]
        self.collection = self.db[collection]
    def getDB(self):
        return self.db
    def getCollection(self):
        return self.collection
    def addToDB(self, name):
        
        player = self.collection.find_one({"name":name})
        if player == None:
            self.collection.insert(
                {
                    "name":name,
                    "numLogins":1,
                    "time_minutes":0,
                    "time_hours":0            
                }
            )
        else:
            
            logins = int(player['numLogins'])
            logins+=1
            self.collection.find_one_and_update(
                {
                    "_id":player["_id"]
                },
                {
                    "$set":{
                        "numLogins":logins
                    }
                }
            )
    def logPlayerOff(self, online, name):
        player = self.collection.find_one({"name":name})   
        start = online[name]
        fin = time.time()
        id = player["_id"]
        session_time = int((abs(start-fin)/60))
        total_time = float(player["time_minutes"])
        total_time_hours = total_time/60
        self.collection.find_one_and_update(
            {
                "_id":id
            },
            {
                "$set":{
                    "time_minutes": (total_time + session_time),
                    "time_hours": (total_time_hours + (session_time/60))
                    }
            }
        )
    def updateTime(self, player, time):
        self.collection.find_one_and_update(
                {
                    "_id":player["_id"]
                },
                {
                    "$set":{
                        "time_minutes":time,
                        "time_hours":time/60
                    }
                }
            )
    def exists(self, name):
        name = name.lower().strip()
        player = self.collection.find_one({"username_lowercase":name})
        if player != None:
            return True
        else:
            return False
    def getTime(self,name):
        player = self.collection.find_one({"name":name})
        if player != None:
            storedTime = int(player["time_hours"])
            return storedTime
        return None
    def getLogins(self,name):
        player = self.collection.find_one({"name":name})
        if player != None:
            logins = int(player["numLogins"])
            return logins
        return None
    def addToSmokeLine(self, name, mention, time):
        player = self.collection.find_one({"name":name})
        if player == None:
            self.collection.insert(
                {
                    "name":name,
                    "discord_mention":mention,
                    "enter_time":time
                }
            )
        else:
            self.collection.find_one_and_update( #reset their time
                {
                    "_id":player["_id"]
                },
                {
                    "$set":{
                        "enter_time":time
                    }
                }
            )
    def getSmokersFromDB(self):
        smokeLine = {}
        smokePing = {}
        for person in self.collection.find():
            smokeLine[person['name']] = person['enter_time']
            smokePing[person['name']] = person['discord_mention']
        return smokeLine, smokePing
    def deleteSmoker(self, name):
        self.collection.delete_one({"name":name})
    # def getTop10(self, stat):
    #     res = []
    #     i = 0
    #     for player in self.collection.find().sort([(stat,-1)]):
    #         if i < 10:
    #             i+=1
    #             res.append({
    #                 "name":player['name'],
    #                 stat:int(player[stat])
    #             })
    #     return res
    def getTotalPlayerCount(self):
        return self.collection.count()
    def getEntireStat(self,category, stat):
        res = []
        i = 0
        total = self.getTotalPlayerCount()
        for player in self.collection.find().sort([("stats.{}.{}".format(category, stat),-1)]):
            if i < total:
                i+=1
                res.append({
                    "name":str(player['username']),
                    stat:int(player['stats'][category][stat])
                })
        return res
    def getOnlinePlayers(self):
        res = []
        for player in self.collection.find():
            res.append(player['username'].lower())
        return res
    def getTop10(self, category, stat):
        res = []
        i = 0
        for player in self.collection.find().sort([('stats.{}.{}'.format(category,stat), -1)]):
            if i < 10:
                i+=1
                res.append(
                    {
                        'name':player['username'],
                        '{}_{}'.format(category, stat):int(player['stats'][category][stat])
                    }
                )
        return res
    def getAllPlayerStats(self, username):
        res = {}
        username = username.lower()
        player = self.collection.find_one({'username_lowercase':username})
        res['account_id'] = player['account_id']
        res['username'] = player['username']
        res['in_game_status'] = player['status']
        res['stats'] = player['stats']
        res['match_history'] = player['match_history']
        # res['last_login'] = time.strftime("%a, %d %b %Y", int(player['last_login']))
        return res
    def getBasicGameInformationForPlayer(self, game_id, username):
        '''returns a dict of the basic info for a game'''
        game = self.collection.find_one({'game_id':game_id})
        res = {}
        res['map'] = game['map']
        res['gamemode'] = game['gamemode']
        res['date'] = game['date']
        res['game_id'] = game['game_id']
        res['win'] = False
        game_result = game['game_results']['winners']
        for player in game_result:
            res['win'] = True if player['username'] == username else res['win']
            if res['win']: break
        return res
    def getBasicGeneralGameInformation(self, game_id):
        '''returns dict of basic general game info'''
        game = self.collection.find_one({'game_id':game_id})
        res = {}
        res['map'] = game['map']
        res['gamemode'] = game['gamemode']
        res['date'] = game['date']
        winner = game['game_results']['winner_score']
        loser = game['game_results']['loser_score']
        res['score'] = '{}-{}'.format(winner, loser)
        res['game_id'] = game['game_id']
        return res

    def getDetailedGameInformation(self, game_id):
        game = self.collection.find_one({'game_id':game_id})
        del game['_id']
        return game
    def updateAnalytics(self, ip):
        user = self.collection.find_one({"user_ip":ip})
        if not user:
            self.collection.insert_one(
                {
                    'ip':ip,
                    'last_login':time.strftime("%a, %d %b %Y", time.localtime())
                }
            )
        else:
            self.collection.find_one_and_update(
                {
                    'ip':ip
                },
                {
                    '$set':{
                        'last_login':time.strftime("%a, %d %b %Y", time.localtime())
                    }
                }
            )




# client = pymongo.MongoClient("mongodb+srv://nick:{}@cluster0.yhf0e.mongodb.net/UYA-Bot?retryWrites=true&w=majority".format(mongoPW))
# print(client.list_database_names())
# db = client['uya-bot']
# collection = db['time-played']







      



