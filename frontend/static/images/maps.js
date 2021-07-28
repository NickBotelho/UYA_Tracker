// import kisi from '../../static/images/kisi.png';
// import bwc from '../../static/images/bwc.png';
// import hoven from '../../static/images/hoven.png';
// import x12 from '../../static/images/x12.png';
// import marcadia from '../../static/images/marcadia.png';
// import metropolis from '../../static/images/metropolis.png';
import kisi from './kisi.png';
import bwc from './bwc.png';
import hoven from './hoven.png';
import x12 from './x12.png';
import marcadia from './marcadia.png';
import metropolis from './metropolis.png';

function GetMap(){
    const mapNames = [kisi, bwc, hoven, x12, marcadia, metropolis]
    
    //max not inclusive
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    return mapNames[getRandomInt(mapNames.length)]
}

export {GetMap}