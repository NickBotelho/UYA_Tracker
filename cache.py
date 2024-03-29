import datetime
from database import getRecentGames, getTotalGames, getGameDetails, getPlayerStats, getEntireStat, getTop10, getAnnouncements, getClanStats, getAllClans, getAllRealClans

class Cache():
    def __init__(self):
        self.CACHE_LIMIT = 100
        self.cache = {} #key to cache
        self.keyToCurrentTime = {} #key to datetime obj
        self.keyToTimeLimit = { 
            'top10':20, #minutes
            'recentGames':10,
            'general':10,
            'gameId':60*24,
            'playerStats':10,
            'entireStat':30,
            'announcements':60,
            'clans':60*6,
            'allClans':60*6,
            'allRealClans':60*6,
        }
        self.dmeIdToLiveGameInfo = {}
    def clear(self, key = None):
        if key != None:
            del self.cache[key]
            del self.keyToCurrentTime[key]
        else:
            self.cache = {} #key to cache
            self.keyToCurrentTime = {} #key to datetime obj
        return True
    def status(self):
        res = {}
        time = datetime.datetime.now()
        for item in self.cache:
            type = item.split('-')[0]
            cacheTime = self.keyToCurrentTime[item]
            diff = time - cacheTime
            res[item] = f"{diff.total_seconds()//60} / {self.keyToTimeLimit[type]}"

        return res

    def get(self, key):
        cacheType = key.split('-')[0]
        if key in self.cache:
            currentTime = datetime.datetime.now()
            cacheTime = self.keyToCurrentTime[key]
            limit = self.keyToTimeLimit[cacheType]
            difference = currentTime - cacheTime
            if difference.total_seconds() // 60 <= limit:
                return self.cache[key]
        
        if len(self.cache) >= self.CACHE_LIMIT:
            self.clear()

        if cacheType == 'top10':
            self.storeTop10(key)
        elif cacheType == 'recentGames':
            self.storeRecentGames(key)
        elif key == "general-totalGames":
            self.storeTotalGames(key)
        elif cacheType == 'gameId':
            self.storeGameDetails(key)
        elif cacheType == 'playerStats':
            self.storePlayerStats(key)
        elif cacheType == 'entireStat':
            self.storeEntireStat(key)
        elif cacheType == 'announcements':
            self.announcements()
        elif cacheType == 'clans':
            self.storeEntireClan(key)
        elif cacheType == 'allClans':
            self.storeAllClans()
        elif cacheType == 'allRealClans':
            self.storeAllRealClans()

        return self.cache[key] if key in self.cache else None
                
    def generateTop10Key(self, category, stat):
        return f"top10-{category}-{stat}"

    def storeTop10(self, key):
        args = key.split('-')
        category, stat = args[1], args[2]
        res = getTop10(category, stat)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def generateRecentGamesKey(self,name,numGames):
        return f"recentGames-{name}-{numGames}"

    def storeRecentGames(self, key):
        args = key.split('-')
        name = "".join(args[1:len(args)-1])
        num = int(args[-1])
        res = getRecentGames(name, num)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def generateGeneralKey(self, arg):
        return f"general-{arg}"

    def storeTotalGames(self,key):
        res = getTotalGames()
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def generateGameDetailKey(self, game_id):
        return f"gameId-{game_id}"
    def storeGameDetails(self, key):
        args = key.split('-')
        gameId = float(args[1])
        res = getGameDetails(gameId)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()
    
    def generatePlayerStatsKey(self, name):
        return f"playerStats-{name}"
    def storePlayerStats(self, key):
        args = key.split('-')
        name = "".join(args[1:])
        res = getPlayerStats(name)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def generateEntireStatKey(self, category, stat):
        return f"entireStat-{category}-{stat}"
    def storeEntireStat(self, key):
        args = key.split('-')
        category, stat = args[1], args[2]
        res = getEntireStat(category, stat)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def generateClanKey(self, clanName):
        return f"clans-{clanName}"
    def storeEntireClan(self, key):
        args = key.split('-')
        name = "".join(args[1:])
        res = getClanStats(name)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()
    def storeAllClans(self, key="allClans"):
        res = getAllClans()
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()
    def storeAllRealClans(self, key='allRealClans'):
        res = getAllRealClans()
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def announcements(self, key = 'announcements'):
        res = getAnnouncements()
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()
    
    def logGame(self, gameInfo):
        if gameInfo['dme_id'] not in self.dmeIdToLiveGameInfo:
            self.dmeIdToLiveGameInfo[gameInfo['dme_id']] = gameInfo
        else:
            if gameInfo['updateId'] > self.dmeIdToLiveGameInfo[gameInfo['dme_id']]['updateId']:
                self.dmeIdToLiveGameInfo[gameInfo['dme_id']] = gameInfo
    def getLiveGames(self):
        return list(self.dmeIdToLiveGameInfo.keys())
    def getLiveGameInfo(self, dme_id):
        
        return self.dmeIdToLiveGameInfo[dme_id]
    def getMap(self, dme_id):
        res = self.dmeIdToLiveGameInfo[dme_id]['graph']
        res['updateId'] = self.dmeIdToLiveGameInfo[dme_id]['updateId']
        return res