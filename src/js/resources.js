import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Dobber: new ImageSource('images/dobber.png'),
    Rod: new ImageSource('images/rod.png'),
    RodCharging: new ImageSource('images/rodCharging.png'),
    RodOut: new ImageSource('images/rodOut.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }