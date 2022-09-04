import datetime
import database

class Cache():
    def __init__(self):
        self.CACHE_LIMIT = 50
        self.cache = {} #key to cache
        self.keyToCurrentTime = {} #key to datetime obj
        self.keyToTimeLimit = { 
            'top10':20, #minutes
            'recentGames':10,
            'general':10,
            'gameId':60,
            'playerStats':10,
            'entireStat':30,
        }
    def clear(self):
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

        return self.cache[key] if key in self.cache else None
                
    def generateTop10Key(self, category, stat):
        return f"top10-{category}-{stat}"

    def storeTop10(self, key):
        args = key.split('-')
        category, stat = args[1], args[2]
        res = database.getTop10(category, stat)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def generateRecentGamesKey(self,name,numGames):
        return f"recentGames-{name}-{numGames}"

    def storeRecentGames(self, key):
        args = key.split('-')
        name, num = args[1], args[2]
        res = database.getRecentGames(name, num)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def generateGeneralKey(self, arg):
        return f"general-{arg}"

    def storeTotalGames(self,key):
        res = database.getTotalGames()
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def generateGameDetailKey(self, game_id):
        return f"gameId-{game_id}"
    def storeGameDetails(self, key):
        args = key.split('-')
        gameId = float(args[1])
        res = database.getGameDetails(gameId)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()
    
    def generatePlayerStatsKey(self, name):
        return f"playerStats-{name}"
    def storePlayerStats(self, key):
        args = key.split('-')
        name = "".join(args[1:])
        res = database.getPlayerStats(name)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()

    def generateEntireStatKey(self, category, stat):
        return f"entireStat-{category}-{stat}"
    def storeEntireStat(self, key):
        args = key.split('-')
        category, stat = args[1], args[2]
        res = database.getEntireStat(category, stat)
        self.cache[key] = res
        self.keyToCurrentTime[key] = datetime.datetime.now()