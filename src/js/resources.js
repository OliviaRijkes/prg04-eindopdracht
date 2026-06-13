import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Player: new ImageSource('images/player.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Pickup: new ImageSource('images/pickup.png'),
    Penguin: new ImageSource('images/penguin.png'),
    Icebear: new ImageSource('images/icebear.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }