import io
from PIL import Image
import matplotlib.pyplot as plt
import base64
# plt.rcParams["figure.figsize"] = [7.00, 3.50]
# plt.rcParams["figure.autolayout"] = True
def createMap(x, y, names, colors, mapName, hp):
    '''Returns a PIL Image object of the created map
    map is created using plt and converted to PIL using buffer'''
    if mapName == 'Bakisi_Isle':
        im = plt.imread("graphs/maps/kisi.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[9650, 40500, 11000, 40000])
    elif mapName == 'Hoven_Gorge':
        im = plt.imread("graphs/maps/hoven.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[7900, 24300,7200,25500])
    elif mapName == 'Outpost_x12':
        im = plt.imread("graphs/maps/x12.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[5000, 50000,7200,23200])
    elif mapName == 'Korgon_Outpost':
        im = plt.imread("graphs/maps/korgon.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[10300, 30500,12172,31500])
    elif mapName =='Metropolis':
        im = plt.imread("graphs/maps/metro.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[40000, 57500, 12656, 30759])
    elif mapName == 'Blackwater_City':
        im = plt.imread("graphs/maps/bwc.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[8700,19000,7500,26300])
    elif mapName == 'Command_Center':
        im = plt.imread("graphs/maps/command.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[19200,23050,21500,25200])
    elif mapName == 'Aquatos_Sewers':
        im = plt.imread("graphs/maps/sewers.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[21685,28487,17589,24391])
    elif mapName == 'Blackwater_Dox':
        im = plt.imread("graphs/maps/dox.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[10000,19600,10500,19100])
    elif mapName == 'Marcadia_Palace':
        im = plt.imread("graphs/maps/marcadia.png")
        fig, ax = plt.subplots()
        im = ax.imshow(im, extent=[25700,35700,50500,60500])

    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.autoscale(False, tight=True)
    ax.get_xaxis().set_ticks([])
    ax.get_yaxis().set_ticks([])
    for i in range(len(x)):
        plt.plot(x[i], y[i], marker = 'o' if hp[i] > 0 else 'x', markerfacecolor = colors[i], \
            markeredgecolor = colors[i], markersize = 5)
        plt.annotate(names[i], (x[i], y[i] + 0.2))

    buf = io.BytesIO()
    plt.savefig(buf,bbox_inches='tight', pad_inches=0, format='JPEG')
    buf.seek(0)
    data = base64.b64encode(buf.read())
    data = data.decode()
    plt.clf()
    plt.cla()
    plt.close(fig)
    return data




# createMap([9935],[10211], ["Nick#1"], ['aqua'], 'Hoven_Gorge')