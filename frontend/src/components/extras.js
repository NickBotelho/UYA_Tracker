import bakisi from "../../static/images/Bakisi_Isles.png";
import metropolis from "../../static/images/Metropolis_(multiplayer).png";
import outpostx12 from "../../static/images/Outpost_X12_(multiplayer).png";
import marcadia from "../../static/images/Marcadia_Palace.png";

import hbakisi from '../../static/images/kisi(4000x1400).png';
import hmetropolis from "../../static/images/metropolis(4000x1300).png";
import houtpostx12 from "../../static/images/x12(4000x1250).png";
import hmarcadia from '../../static/images/marcadia(4000x1400).png'


function GetLargeMap() {
    const mapNames = [bakisi, metropolis, outpostx12, marcadia]
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    var index = getRandomInt(mapNames.length)
    return mapNames[index]
}
const MAP_IMAGES = {
    'Aquatos_Sewers': 'https://static.wikia.nocookie.net/ratchet/images/c/ce/Aquatos_Sewers_%28multiplayer%29.png/revision/latest/scale-to-width-down/350?cb=20191204162004',
    "Bakisi_Isle": 'https://static.wikia.nocookie.net/ratchet/images/c/cb/Bakisi_Isles.png/revision/latest/scale-to-width-down/350?cb=20191204161712',
    "Hoven_Gorge": 'https://static.wikia.nocookie.net/ratchet/images/7/72/Hoven_Gorge.png/revision/latest/scale-to-width-down/350?cb=20210317151600',
    "Outpost_x12": 'https://static.wikia.nocookie.net/ratchet/images/d/d7/Outpost_X12_%28multiplayer%29.png/revision/latest/scale-to-width-down/350?cb=20210317151630',
    "Korgon_Outpost": 'https://static.wikia.nocookie.net/ratchet/images/6/6c/Korgon_Outpost.png/revision/latest/scale-to-width-down/350?cb=20191207164125',
    "Metropolis": 'https://static.wikia.nocookie.net/ratchet/images/e/ea/Metropolis_%28multiplayer%29.png/revision/latest/scale-to-width-down/350?cb=20191207164413',
    "Blackwater_City": 'https://static.wikia.nocookie.net/ratchet/images/d/d7/Blackwater_City_%28multiplayer%29.png/revision/latest/scale-to-width-down/350?cb=20210317151641',
    "Command_Center": 'https://static.wikia.nocookie.net/ratchet/images/0/00/Command_Center_%28multiplayer%29.png/revision/latest/scale-to-width-down/350?cb=20191203021311',
    "Blackwater_Dox": 'https://static.wikia.nocookie.net/ratchet/images/c/c6/Blackwater_Docks.png/revision/latest/scale-to-width-down/350?cb=20210218143330',
    "Marcadia_Palace": 'https://static.wikia.nocookie.net/ratchet/images/d/d9/Marcadia_Palace.png/revision/latest/scale-to-width-down/350?cb=20191204163055',
}
function getSpecifiedMap(map) {
    return MAP_IMAGES[map]
}

function GetHalfLargeMap() {
    const mapNames = [hbakisi, hmetropolis, houtpostx12, hmarcadia]
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    var index = getRandomInt(mapNames.length)
    return mapNames[index]
}

const categories = { //For player profiles
    'overall': {
        0: {
            'title': 'games played',
            'category': 'overall',
            'stat': 'games_played'
        },
        1: {
            'title': 'wins',
            'category': 'overall',
            'stat': 'wins'
        },
        2: {
            'title': 'losses',
            'category': 'overall',
            'stat': 'losses'
        },
        3: {
            'title': 'kills',
            'category': 'overall',
            'stat': 'kills'
        },
        4: {
            'title': 'deaths',
            'category': 'overall',
            'stat': 'deaths'
        },
        5: {
            'title': 'base damage',
            'category': 'overall',
            'stat': 'overall_base_dmg'
        },
        6: {
            'title': 'nodes',
            'category': 'overall',
            'stat': 'nodes'
        },
        7: {
            'title': 'suicides',
            'category': 'overall',
            'stat': 'suicides'
        },

    },
    'siege': {
        0: {
            'title': 'wins',
            'category': 'siege',
            'stat': 'siege_wins'
        },
        1: {
            'title': 'losses',
            'category': 'siege',
            'stat': 'siege_losses'
        },
        2: {
            'title': 'kills',
            'category': 'siege',
            'stat': 'siege_kills'
        },
        3: {
            'title': 'deaths',
            'category': 'siege',
            'stat': 'siege_deaths'
        },
        4: {
            'title': 'base damage',
            'category': 'siege',
            'stat': 'siege_base_dmg'
        },
        5: {
            'title': 'nodes',
            'category': 'siege',
            'stat': 'siege_nodes'
        },

    },
    'ctf': {
        0: {
            'title': 'wins',
            'category': 'ctf',
            'stat': 'ctf_wins'
        },
        1: {
            'title': 'losses',
            'category': 'ctf',
            'stat': 'ctf_losses'
        },
        2: {
            'title': 'kills',
            'category': 'ctf',
            'stat': 'ctf_kills'
        },
        3: {
            'title': 'deaths',
            'category': 'ctf',
            'stat': 'ctf_deaths'
        },
        4: {
            'title': 'flag caps',
            'category': 'ctf',
            'stat': 'ctf_caps'
        },
        5: {
            'title': 'flag saves',
            'category': 'ctf',
            'stat': 'ctf_saves'
        },
        6: {
            'title': 'base damage',
            'category': 'ctf',
            'stat': 'ctf_base_dmg'
        },
        7: {
            'title': 'nodes',
            'category': 'ctf',
            'stat': 'ctf_nodes'
        },
        8: {
            'title': 'nodes',
            'category': 'ctf',
            'stat': 'ctf_nodes'
        },
    },
    'tdm': {
        0: {
            'title': 'wins',
            'category': 'tdm',
            'stat': 'tdm_wins'
        },
        1: {
            'title': 'losses',
            'category': 'tdm',
            'stat': 'tdm_losses'
        },
        2: {
            'title': 'kills',
            'category': 'tdm',
            'stat': 'tdm_kills'
        },
        3: {
            'title': 'deaths',
            'category': 'tdm',
            'stat': 'tdm_deaths'
        },
    },
    'weapons': {
        0: {
            'title': 'flux kills',
            'category': 'weapons',
            'stat': 'flux_kills'
        },
        1: {
            'title': 'flux deaths',
            'category': 'weapons',
            'stat': 'flux_deaths'
        },
        2: {
            'title': 'blitz kills',
            'category': 'weapons',
            'stat': 'blitz_kills'
        },
        3: {
            'title': 'blitz deaths',
            'category': 'weapons',
            'stat': 'blitz_deaths'
        },
        4: {
            'title': 'gravity bomb kills',
            'category': 'weapons',
            'stat': 'gravity_bomb_kills'
        },
        5: {
            'title': 'gravity bomb deaths',
            'category': 'weapons',
            'stat': 'gravity_bomb_deaths'
        },
        6: {
            'title': 'n60 kills',
            'category': 'weapons',
            'stat': 'n60_kills'
        },
        7: {
            'title': 'n60 deaths',
            'category': 'weapons',
            'stat': 'n60_deaths'
        },
        8: {
            'title': 'rocket kills',
            'category': 'weapons',
            'stat': 'rocket_kills'
        },
        9: {
            'title': 'rocket deaths',
            'category': 'weapons',
            'stat': 'rocket_deaths'
        },
        10: {
            'title': 'lava gun kills',
            'category': 'weapons',
            'stat': 'lava_gun_kills'
        },
        11: {
            'title': 'lava gun deaths',
            'category': 'weapons',
            'stat': 'lava_gun_deaths'
        },
        12: {
            'title': 'mines kills',
            'category': 'weapons',
            'stat': 'mines_kills'
        },
        13: {
            'title': 'mines deaths',
            'category': 'weapons',
            'stat': 'mines_deaths'
        },
        14: {
            'title': 'morph kills',
            'category': 'weapons',
            'stat': 'morph_kills'
        },
        15: {
            'title': 'morph deaths',
            'category': 'weapons',
            'stat': 'morph_deaths'
        },
        16: {
            'title': 'wrench kills',
            'category': 'weapons',
            'stat': 'wrench_kills'
        },
        17: {
            'title': 'wrench deaths',
            'category': 'weapons',
            'stat': 'wrench_deaths'
        },
    },
    'weapon kills': {
        0: {
            'title': 'flux kills',
            'category': 'weapons',
            'stat': 'flux_kills'
        },
        2: {
            'title': 'blitz kills',
            'category': 'weapons',
            'stat': 'blitz_kills'
        },
        4: {
            'title': 'gravity bomb kills',
            'category': 'weapons',
            'stat': 'gravity_bomb_kills'
        },
        6: {
            'title': 'n60 kills',
            'category': 'weapons',
            'stat': 'n60_kills'
        },
        8: {
            'title': 'rocket kills',
            'category': 'weapons',
            'stat': 'rocket_kills'
        },
        10: {
            'title': 'lava gun kills',
            'category': 'weapons',
            'stat': 'lava_gun_kills'
        },
        12: {
            'title': 'mines kills',
            'category': 'weapons',
            'stat': 'mines_kills'
        },
        14: {
            'title': 'morph kills',
            'category': 'weapons',
            'stat': 'morph_kills'
        },
        16: {
            'title': 'wrench kills',
            'category': 'weapons',
            'stat': 'wrench_kills'
        },

    },
    'weapon deaths': {
        0: {
            'title': 'flux deaths',
            'category': 'weapons',
            'stat': 'flux_deaths'
        },
        2: {
            'title': 'blitz deaths',
            'category': 'weapons',
            'stat': 'blitz_deaths'
        },
        4: {
            'title': 'gravity bomb deaths',
            'category': 'weapons',
            'stat': 'gravity_bomb_deaths'
        },
        6: {
            'title': 'n60 deaths',
            'category': 'weapons',
            'stat': 'n60_deaths'
        },
        8: {
            'title': 'rocket deaths',
            'category': 'weapons',
            'stat': 'rocket_deaths'
        },
        10: {
            'title': 'lava gun deaths',
            'category': 'weapons',
            'stat': 'lava_gun_deaths'
        },
        12: {
            'title': 'mines deaths',
            'category': 'weapons',
            'stat': 'mines_deaths'
        },
        14: {
            'title': 'morph deaths',
            'category': 'weapons',
            'stat': 'morph_deaths'
        },
        16: {
            'title': 'wrench deaths',
            'category': 'weapons',
            'stat': 'wrench_deaths'
        },

    },
    'per_min': {
        0: {
            'title': "kills/min",
            'category': 'per_min',
            'stat': 'kills/min'
        },
        1: {
            'title': 'deaths/min',
            'category': 'per_min',
            'stat': "deaths/min"
        },
        2: {
            'title': 'suicides/min',
            'category': 'per_min',
            'stat': "suicides/min"
        },
        3: {
            'title': 'caps/min',
            'category': 'per_min',
            'stat': "caps/min"
        },
        4: {
            'title': 'saves/min',
            'category': 'per_min',
            'stat': "saves/min"
        },
        5: {
            'title': 'flux kills/min',
            'category': 'per_min',
            'stat': "flux_kills/min"
        },
        6: {
            'title': 'blitz kills/min',
            'category': 'per_min',
            'stat': "blitz_kills/min"
        },
        7: {
            'title': 'grav kills/min',
            'category': 'per_min',
            'stat': "gravity_bomb_kills/min"
        },
    },
    'per_gm': {
        0: {
            'title': "kills/gm",
            'category': 'per_gm',
            'stat': 'kills/gm'
        },
        1: {
            'title': 'deaths/gm',
            'category': 'per_gm',
            'stat': "deaths/gm"
        },
        2: {
            'title': 'suicides/gm',
            'category': 'per_gm',
            'stat': "suicides/gm"
        },
        3: {
            'title': 'caps/gm',
            'category': 'per_gm',
            'stat': "caps/gm"
        },
        4: {
            'title': 'saves/gm',
            'category': 'per_gm',
            'stat': "saves/gm"
        },
        5: {
            'title': 'flux kills/gm',
            'category': 'per_gm',
            'stat': "flux_kills/gm"
        },
        6: {
            'title': 'blitz kills/gm',
            'category': 'per_gm',
            'stat': "blitz_kills/gm"
        },
        7: {
            'title': 'grav kills/gm',
            'category': 'per_gm',
            'stat': "gravity_bomb_kills/gm"
        },

    },
    'maps': {
        0: {
            'title': "Bakisi Isle",
            'category': 'maps',
            'stat': 'Bakisi_Isle'
        },
        1: {
            'title': "Hoven Gorge",
            'category': 'maps',
            'stat': 'Hoven_Gorge'
        },
        2: {
            'title': "Outpost x12",
            'category': 'maps',
            'stat': 'Outpost_x12'
        },
        3: {
            'title': "Korgon Outpost",
            'category': 'maps',
            'stat': 'Korgon_Outpost'
        },
        4: {
            'title': "Metropolis",
            'category': 'maps',
            'stat': 'Metropolis'
        },
        5: {
            'title': "Blackwater City",
            'category': 'maps',
            'stat': 'Blackwater_City'
        },
        6: {
            'title': "Command Center",
            'category': 'maps',
            'stat': 'Command_Center'
        },
        7: {
            'title': "Aquatos Sewers",
            'category': 'maps',
            'stat': 'Aquatos_Sewers'
        },
        8: {
            'title': "Blackwater Dox",
            'category': 'maps',
            'stat': 'Blackwater_Dox'
        },
        9: {
            'title': "Marcadia Palace",
            'category': 'maps',
            'stat': 'Marcadia_Palace'
        },
    },
    'medals': {
        0: {
            'title': "nuke",
            'category': 'medals',
            'stat': 'nuke'
        },
        1: {
            'title': "brutal",
            'category': 'medals',
            'stat': 'brutal'
        },
        2: {
            'title': "relentless",
            'category': 'medals',
            'stat': 'relentless'
        },
        5: {
            'title': "bloodthirsty",
            'category': 'medals',
            'stat': 'bloodthirsty'
        },
        4: {
            'title': "merciless",
            'category': 'medals',
            'stat': 'merciless'
        },
        3: {
            'title': "undying",
            'category': 'medals',
            'stat': 'undying'
        },
        6: {
            'title': "distributor",
            'category': 'medals',
            'stat': 'distributor'
        },
        8: {
            'title': "thickskull",
            'category': 'medals',
            'stat': 'thickskull'
        },
        9: {
            'title': "bloodfilled",
            'category': 'medals',
            'stat': 'bloodfilled'
        },
        7: {
            'title': "brutalized",
            'category': 'medals',
            'stat': 'brutalized'
        },
        10: {
            'title': "radioactive",
            'category': 'medals',
            'stat': 'radioactive'
        },
        11: {
            'title': "shifty",
            'category': 'medals',
            'stat': 'shifty'
        },
        12: {
            'title': "lockon",
            'category': 'medals',
            'stat': 'lockon'
        },
        13: {
            'title': "juggernaut",
            'category': 'medals',
            'stat': 'juggernaut'
        },
        14: {
            'title': "olympiad",
            'category': 'medals',
            'stat': 'olympiad'
        },
        15: {
            'title': "dropper",
            'category': 'medals',
            'stat': 'dropper'
        },
        16: {
            'title': "ratfuck",
            'category': 'medals',
            'stat': 'ratfuck'
        },
        17: {
            'title': "healthrunner",
            'category': 'medals',
            'stat': 'healthrunner'
        },
        18: {
            'title': "machinegun",
            'category': 'medals',
            'stat': 'machinegun'
        },
        19: {
            'title': "heatingup",
            'category': 'medals',
            'stat': 'heatingup'
        },
        20: {
            'title': "untouchable",
            'category': 'medals',
            'stat': 'untouchable'
        },
    },
    "best streaks": {
        0: {
            'title': "best kill streak",
            'category': 'overall',
            'stat': 'bestKillstreak'
        },
        1: {
            'title': "worst death streak",
            'category': 'overall',
            'stat': 'bestDeathstreak'
        },
        2: {
            'title': "best total win streak",
            'category': 'overall',
            'stat': 'best_winstreak'
        },
        3: {
            'title': "best ctf win streak",
            'category': 'ctf',
            'stat': 'best_winstreak'
        },
        4: {
            'title': "best siege win streak",
            'category': 'siege',
            'stat': 'best_winstreak'
        },
        5: {
            'title': "best tdm win streak",
            'category': 'deathmatch',
            'stat': 'best_winstreak'
        },
        6: {
            'title': "worst total losing streak",
            'category': 'overall',
            'stat': 'best_losingstreak'
        },
        7: {
            'title': "worst ctf losing streak",
            'category': 'ctf',
            'stat': 'best_losingstreak'
        },

        8: {
            'title': "worst siege losing streak",
            'category': 'siege',
            'stat': 'best_losingstreak'
        },
        9: {
            'title': "worst tdm losing streak",
            'category': 'deathmatch',
            'stat': 'best_losingstreak'
        },
    },
    "current streaks": {
        0: {
            'title': "total win streak",
            'category': 'overall',
            'stat': 'current_winstreak'
        },
        1: {
            'title': "ctf win streak",
            'category': 'ctf',
            'stat': 'current_winstreak'
        },
        2: {
            'title': "siege win streak",
            'category': 'siege',
            'stat': 'current_winstreak'
        },
        3: {
            'title': "tdm win streak",
            'category': 'deathmatch',
            'stat': 'current_winstreak'
        },
        4: {
            'title': "total losing streak",
            'category': 'overall',
            'stat': 'current_losingstreak'
        },
        5: {
            'title': "ctf losing streak",
            'category': 'ctf',
            'stat': 'current_losingstreak'
        },

        6: {
            'title': "siege losing streak",
            'category': 'siege',
            'stat': 'current_losingstreak'
        },
        7: {
            'title': "tdm losing streak",
            'category': 'deathmatch',
            'stat': 'current_losingstreak'
        },
    },
}
const statList = { //for leaderboards
    "overall": ['games played', "wins", "losses", 'kills', 'deaths', 'base damage', 'nodes', 'suicides'],
    "ctf": ["wins", "losses", 'kills', 'deaths', 'base damage', 'nodes', "saves", "flags"],
    "siege": ["wins", "losses", 'kills', 'deaths', 'base damage', 'nodes'],
    "deathmatch": ["wins", "losses", 'kills', 'deaths'],
    'weapon kills': ['flux', 'gravity bomb', 'blitz', 'n60', 'lava gun', 'mines', 'rocket', 'morph', 'wrench'],
    'weapon deaths': ['flux', 'gravity bomb', 'blitz', 'n60', 'lava gun', 'mines', 'rocket', 'morph', 'wrench'],
    'advanced': ['kills/min', 'deaths/min', 'suicides/min', 'caps/min', 'saves/min', 'flux kills/min', 'blitz kills/min', 'gravity bomb kills/min', 'flux deaths/min', 'blitz deaths/min', 'gravity bomb deaths/min',
        'kills/gm', 'deaths/gm', 'suicides/gm', 'caps/gm', 'saves/gm', 'flux kills/gm', 'blitz kills/gm', 'gravity bomb kills/gm', 'flux deaths/gm', 'blitz deaths/gm', 'gravity bomb deaths/gm',],
    'live': ['total distance', 'no flag distance', 'flag distance', 'flag pickups', 'flag drops', 'health boxes', 'packs grabbed', 'niks given', 'niks received'],
    'live/gm': ['total distance', 'no flag distance', 'flag distance', 'flag pickups', 'flag drops', 'health boxes', 'packs grabbed', 'niks given', 'niks received'],
    'medals': ['nuke', 'brutal', 'relentless', 'undying', 'merciless', 'bloodthirsty', 'thickskull', 
    'shifty','olympiad', 'lockon', 'dropper', "healthrunner", 'machinegun', 'untouchable', 'heatingup'],
    'best streaks':['overall winstreak', 'overall killstreak', 'overall deathstreak' , 'ctf winstreak', 'ctf killstreak', 'ctf deathstreak',
        'siege winstreak', 'siege killstreak', 'siege deathstreak' ,'tdm winstreak', 'tdm killstreak', 'tdm deathstreak' ,],
    'current streaks':['overall winstreak', 'ctf winstreak', 'siege winstreak', 'tdm winstreak']

}
const stat_keys = { //maps above titles to their db keys
    'overall': {
        'games played': 'games_played',
        'wins': 'wins',
        'losses': 'losses',
        'kills': 'kills',
        'deaths': 'deaths',
        'nodes': 'nodes',
        'base damage': 'overall_base_dmg',
        'suicides': 'suicides',
    },
    'ctf': {
        'wins': 'ctf_wins',
        'losses': 'ctf_losses',
        'kills': 'ctf_kills',
        'deaths': 'ctf_deaths',
        'nodes': 'ctf_nodes',
        'base damage': 'ctf_base_dmg',
        'flags': 'ctf_caps',
        'saves': 'ctf_saves'
    },
    'siege': {
        'wins': 'siege_wins',
        'losses': 'siege_losses',
        'kills': 'siege_kills',
        'deaths': 'siege_deaths',
        'nodes': 'siege_nodes',
        'base damage': 'siege_base_dmg',
    },
    'deathmatch': {
        'wins': 'tdm_wins',
        'losses': 'tdm_losses',
        'kills': 'tdm_kills',
        'deaths': 'tdm_deaths',
    },
    'weapon kills': {
        'flux': 'flux_kills',
        'gravity bomb': 'gravity_bomb_kills',
        'blitz': 'blitz_kills',
        'n60': 'n60_kills',
        'mines': 'mines_kills',
        'morph': 'morph_kills',
        'lava gun': 'lava_gun_kills',
        'rocket': 'rocket_kills',
        'wrench': 'wrench_kills'

    },
    'weapon deaths': {
        'flux': 'flux_deaths',
        'gravity bomb': 'gravity_bomb_deaths',
        'blitz': 'blitz_deaths',
        'n60': 'n60_deaths',
        'mines': 'mines_deaths',
        'morph': 'morph_deaths',
        'lava gun': 'lava_gun_deaths',
        'rocket': 'rocket_deaths',
        'wrench': 'wrench_deaths'

    },
    'advanced': {
        'kills/min': 'kills/min',
        'deaths/min': 'deaths/min',
        'suicides/min': 'suicides/min',
        'caps/min': 'caps/min',
        'saves/min': 'saves/min',
        'flux kills/min': 'flux_kills/min',
        'blitz kills/min': 'blitz_kills/min',
        'gravity bomb kills/min': 'gravity_bomb_kills/min',
        'flux deaths/min': 'flux_deaths/min',
        'blitz deaths/min': 'blitz_deaths/min',
        'gravity bomb deaths/min': 'gravity_bomb_deaths/min',
        'kills/gm': 'kills/gm',
        'deaths/gm': 'deaths/gm',
        'suicides/gm': 'suicides/gm',
        'caps/gm': 'caps/gm',
        'saves/gm': 'saves/gm',
        'flux kills/gm': 'flux_kills/gm',
        'blitz kills/gm': 'blitz_kills/gm',
        'gravity bomb kills/gm': 'gravity_bomb_kills/gm',
        'flux deaths/gm': 'flux_deaths/gm',
        'blitz deaths/gm': 'blitz_deaths/gm',
        'gravity bomb deaths/gm': 'gravity_bomb_deaths/gm',
    },
    'medals': {
        'nuke': 'nuke',
        'brutal': 'brutal',
        'relentless': 'relentless',
        'undying': 'undying',
        'merciless': 'merciless',
        'bloodthirsty': 'bloodthirsty',
        'distributor': 'distributor',
        'brutalized': 'brutalized',
        'thickskull': 'thickskull',
        'shifty': 'shifty',
        'juggernaut': 'juggernaut',
        'olympiad': 'olympiad',
        'lockon': 'lockon',
        'dropper': 'dropper',
        'ratfuck': 'ratfuck',
        'healthrunner':'healthrunner',
        'machinegun':'machinegun',
        'untouchable':'untouchable',
        'heatingup':'heatingup'
    },
    'live': {
        'total distance': 'distance_travelled',
        'no flag distance': 'noFlag_distance',
        'flag distance': 'flag_distance',
        'flag pickups': "flag_pickups",
        'flag drops': 'flag_drops',
        'health boxes': 'health_boxes',
        'packs grabbed': 'packs_grabbed',
        'niks given': "nicks_given",
        'niks received': "nicks_received"
    },
    'live/gm': {
        'total distance': 'distance_travelled',
        'no flag distance': 'noFlag_distance',
        'flag distance': 'flag_distance',
        'flag pickups': "flag_pickups",
        'flag drops': 'flag_drops',
        'health boxes': 'health_boxes',
        'packs grabbed': 'packs_grabbed',
        'niks given': "nicks_given",
        'niks received': "nicks_received"
    },
    'best streaks':{
        'overall winstreak':"overall:best_winstreak",
        'overall killstreak':"overall:bestKillstreak",
        'overall deathstreak':"overall:bestDeathstreak",
        
        'ctf winstreak':"ctf:best_winstreak",
        'ctf killstreak':"ctf:bestKillstreak",
        'ctf deathstreak':"ctf:bestDeathstreak",
        
        'siege winstreak':"siege:best_winstreak",
        'siege killstreak':"siege:bestKillstreak",
        'siege deathstreak':"siege:bestDeathstreak",
        
        'tdm winstreak':"deathmatch:best_winstreak",
        'tdm killstreak':"deathmatch:bestKillstreak",
        'tdm deathstreak':"deathmatch:bestDeathstreak",
    },
    'current streaks':{
        'overall winstreak':"overall:current_winstreak",
        'overall losingstreak':"overall:current_losingstreak",
        
        'ctf winstreak':"ctf:current_winstreak",
        'ctf losingstreak':"ctf:current_losingstreak",

        'siege winstreak':"siege:current_winstreak",
        'siege losingstreak':"siege:current_losingstreak",

        'tdm winstreak':"tdm:current_winstreak",
        'tdm losingstreak':"tdm:current_losingstreak",

    }
}
const weapon_keys = {
    "Lava Gun": 'lava_gun',
    "Morph O' Ray": 'morph',
    "Mines": "mines",
    "Gravity Bomb": 'gravity_bomb',
    "Rockets": "rocket",
    "Blitz": 'blitz',
    "N60": 'n60',
    "Flux": 'flux'
}

const graph_keys = {
    'Weapon Kills': 'weapon_kills',
    'Weapon Usage': 'weapon_usage',
    'Maps Played': 'map_count',
    'Avg. Game Length': 'map_time',
    'Weekday Activity': 'weekday_activity',
    'Monthly Activity': 'month_activity',
    'Time Played': "month_time"
}


export { graph_keys, GetLargeMap, GetHalfLargeMap, getSpecifiedMap, categories, statList, stat_keys, weapon_keys }
