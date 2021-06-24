const bicycleModels = [
    { src: 'bike1-burgundy.glb', alt: 'GREVIL A303 BURGUNDY' , ios:'bike1-burgundy.usdz', poster:'poster-bike1-burgundy.png'}, // <- this is 0
    { src: 'bike1-beige.glb', alt: 'GREVIL A303 BEIGE' , ios:'bike1-beige.usdz', poster:'poster-bike1-beige.png'}, // <- this is 1
    { src: 'bike1-black.glb', alt: 'GREVIL A303 BLACK' , ios:'bike1-black.usdz', poster:'poster-bike1-black.png'}, // <- this is 2
    { src: 'bike2-red.glb', alt: 'DOGMA F12 GRENADIER RED' , ios:'bike2-red.usdz', poster:'poster-bike2-red.png'}, // <- this is 3
    { src: 'bike2-grey.glb', alt: 'DOGMA F12 GRENADIER GREY' , ios:'bike2-grey.usdz', poster:'poster-bike2-grey.png'}, // <- this is 4
    { src: 'bike2-blue.glb', alt: 'DOGMA F12 GRENADIER BLUE' , ios:'bike2-blue.usdz', poster:'poster-bike2-blue.png'}, // <- this is 5
    { src: 'bike3-black.glb', alt: 'CROSSITA 450 CRABON BLACK' , ios:'bike3-black.usdz', poster:'poster-bike3-red.png'}, // <- this is 6
    { src: 'bike3-orange.glb', alt: 'CROSSITA 450 CRABON ORANGE' , ios:'bike3-orange.usdz', poster:'poster-bike3-orange.png'}, // <- this is 7
    { src: 'bike3-white.glb', alt: 'CROSSITA 450 CRABON WHITE' , ios:'bike3-white.usdz', poster:'poster-bike3-white.png'}, // <- this is 8
]

function changeModel(idx) {
    // get model viewer element and store it
    let mv = document.getElementById('viewer');
    mv.src = 'Models/bike/' + bicycleModels[idx].src;
    mv.setAttribute('ios-src', 'Models/bike/' + bicycleModels[idx].ios)
    mv.setAttribute('alt', bicycleModels[idx].alt)
    mv.setAttribute('poster', 'Models/poster/' + bicycleModels[idx].poster)
}

const hangerModels = [
    { src: 'hang1.glb', alt: 'Hanger model 1 orange color' , ios:'hang1.usdz', poster:'hang1.png'}, // <- this is 0
    { src: 'hang1-black.glb', alt: 'Hanger model 1 black color' , ios:'hang1-black.usdz', poster:'hang1-black.png'}, // <- this is 1
    { src: 'hang2.glb', alt: 'Hanger model 2 yellow color' , ios:'hang2.usdz', poster:'hang2.png'}, // <- this is 2
    { src: 'hang2-red.glb', alt: 'Hanger model 2 red color' , ios:'hang2-red.usdz', poster:'hang2-red.png'}, // <- this is 3
    { src: 'hang2-black.glb', alt: 'Hanger model 2 black color' , ios:'hang2-black.usdz', poster:'hang2-black.png'}, // <- this is 4
]

function changeModelHang(idx) {
    // get model viewer element and store it
    let mv = document.getElementById('viewer');
    mv.src = 'Models/Hanger/' + hangerModels[idx].src;
    mv.setAttribute('ios-src','Models/Hanger/' + hangerModels[idx].ios)
    mv.setAttribute('alt', hangerModels[idx].alt)
    mv.setAttribute('poster', 'Models/poster/' + hangerModels[idx].poster)
}