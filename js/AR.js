const targetDiv = document.getElementById("ARcanvas");

let threeStuffs = null

function toggle() {
    targetDiv.style.display = "block";
    main();
}
function exitAR(){
    targetDiv.style.display = "none";
    location.reload()
}

function capture() {

    // Create cols
    let cols = document.createElement("div")
    cols.className = "col s12 m4 l3"

    // Create card
    let card = document.createElement("div")
    card.className = "card"

    // Create card image
    let cardImage = document.createElement("div")
    cardImage.className = "card-image center"

    // get image from canvas
    let takepic = new Image();
    takepic.src = document.getElementById("jeeFaceFilterCanvas").toDataURL();
    takepic.width = 320

    // Make URL from image
    let ahref = document.createElement("a")
    ahref.href = takepic.src
    ahref.download = "mypicture.png"
    ahref.innerText = "Download Image"
    ahref.style.color = "#d50000"

    // Put image in card image
    cardImage.appendChild(takepic)
    cardImage.appendChild(ahref)

    // Put card image in card
    card.appendChild(cardImage);

    // Put card in col
    cols.appendChild(card);

    // Finally put col in row
    document.getElementById('my_picture_place').appendChild(cols);

    targetDiv.style.display = "none";
}

const arm = [
    {model:'helmet1.2.glb', offsetYZ: [0.7, 0], src:'helmet1.glb', alt:'Helmet model 1', ios:'helmet1.2.usdz', poster:'helmet1-orange.png'},
    {model:'helmet1-black2.glb', offsetYZ: [0.7, 0], src:'helmet1-black.glb', alt:'Helmet model 1 black', ios:'helmet1-black2.usdz', poster:'helmet1-grey.png'},
    {model:'helmet1-white2.glb', offsetYZ: [0.7, 0], src:'helmet1-white.glb', alt:'Helmet model 1 white', ios:'helmet1-white2.usdz', poster:'helmet1-white.png'},
    {model:'helmet2.2.glb', offsetYZ: [0.3, 0], src:'helmet2.glb', alt:'Helmet model 2', ios:'helmet2.2.usdz', poster:'helmet2-blue.png'},
    {model:'helmet2-white2.glb', offsetYZ: [0.3, 0], src:'helmet2-white.glb', alt:'Helmet model 2 white', ios:'helmet2-white2.usdz', poster:'helmet2-silver.png'},
    {model:'helmet2-yellow2.glb', offsetYZ: [0.3, 0], src:'helmet2-yellow.glb', alt:'Helmet model 2 yellow', ios:'helmet2-yellow2.usdz', poster:'helmet2-gold.png'},
]

const SETTINGS = {
    gltfModelURL: 'Models/helmet/' + arm[0].model,
    cubeMapURL: 'Bridge2/',
    offsetYZ: arm[0].offsetYZ, // offset of the model in 3D along vertical and depth axis
    scale:1.6 //scale the object
};

function changeSet(idx){
    SETTINGS.gltfModelURL = 'Models/helmet/' + arm[idx].model;
    SETTINGS.offsetYZ = arm[idx].offsetYZ;

    let mv = document.getElementById('viewer');
    mv.src = 'Models/helmet/' + arm[idx].src;
    mv.setAttribute('ios-src','Models/helmet/' + arm[idx].ios)
    mv.setAttribute('alt', arm[idx].alt)
    mv.setAttribute('poster', 'Models/poster/' +arm[idx].poster)
}

"use strict";

// some globalz:
let THREECAMERA = null;

// callback: launched if a face is detected or lost
function detect_callback(isDetected) {
    if (isDetected) {
        console.log('INFO in detect_callback(): DETECTED');
    } else {
        console.log('INFO in detect_callback(): LOST');
    }
}

// build the 3D. called once when Jeeliz Face Filter is OK:
function init_threeScene(spec) {
    threeStuffs = JeelizThreeHelper.init(spec, detect_callback);

    // CREATE THE ENVMAP:
    const path = SETTINGS.cubeMapURL;
    const format = '.jpg';
    const envMap = new THREE.CubeTextureLoader().load( [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
    ] );

    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load( SETTINGS.gltfModelURL, function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material.envMap = envMap;
            }
        } );
        gltf.scene.frustumCulled = false;

        // center and scale the object:
        const bbox = new THREE.Box3().expandByObject(gltf.scene);

        // center the model:
        const centerBBox = bbox.getCenter(new THREE.Vector3());
        gltf.scene.position.add(centerBBox.multiplyScalar(-1));
        gltf.scene.position.add(new THREE.Vector3(0,SETTINGS.offsetYZ[0], SETTINGS.offsetYZ[1]));

        // scale the model according to its width:
        const sizeX = bbox.getSize(new THREE.Vector3()).x;
        gltf.scene.scale.multiplyScalar(SETTINGS.scale / sizeX);

        // dispatch the model:
        threeStuffs.faceObject.add(gltf.scene);
    } ); //end gltfLoader.load callback

    // CREATE THE HELMET MESH AND ADD IT TO THE SCENE:
    const HELMETOBJ3D = new THREE.Object3D();
    let helmetMesh = null, visorMesh = null, faceMesh = null;

    const loadingManager = new THREE.LoadingManager();
    const helmetLoader = new THREE.BufferGeometryLoader(loadingManager);

    // deprecated THREE legacy JSON format. GLTF is better now
    //helmetLoader.load(
    //    './models/helmet/helmet.json',
    //    (helmetGeometry) => {
    //        const helmetMaterial = new THREE.MeshPhongMaterial({
    //            map: new THREE.TextureLoader().load('./models/helmet/diffuse_helmet.jpg'),
    //            reflectionRatio: 1,
    //            shininess: 50
    //        });

    //        helmetMesh = new THREE.Mesh(helmetGeometry, helmetMaterial);
    //        helmetMesh.scale.multiplyScalar(0.037);
    //        helmetMesh.position.y -= 0.3;
    //        helmetMesh.position.z -= 0.5;
    //        helmetMesh.rotation.x += 0.5;
    //    }
    //);

    //const visiereLoader = new THREE.BufferGeometryLoader(loadingManager);
    //visiereLoader.load(
    //    './models/helmet/visiere.json',
    //    (visiereGeometry) => {
    //        const visiereMaterial = new THREE.MeshStandardMaterial({
    //            color: 0xffffff,
    //            transparent: true,
    //            opacity: 0.5,
    //            side: THREE.FrontSide
    //        });

    //        visorMesh = new THREE.Mesh(visiereGeometry, visiereMaterial);
    //        visorMesh.scale.multiplyScalar(0.037);
    //        visorMesh.position.y -= 0.3;
    //        visorMesh.position.z -= 0.5;
    //        visorMesh.rotation.x += 0.5;
    //        visorMesh.frustumCulled = false;
    //    }
    //);

    // CREATE THE MASK
    const maskLoader = new THREE.BufferGeometryLoader(loadingManager);
    /*
      faceLowPolyEyesEarsFill.json has been exported from dev/faceLowPolyEyesEarsFill.blend
      using THREE.JS blender exporter with Blender v2.76
    */
    maskLoader.load('./models/face/faceLowPolyEyesEarsFill2.json', function (maskBufferGeometry) {
        const vertexShaderSource = 'uniform mat2 videoTransformMat2;\n\
    varying vec2 vUVvideo;\n\
    varying float vY, vNormalDotZ;\n\
    const float THETAHEAD = 0.25;\n\
    \n\
    void main() {\n\
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);\n\
      vec4 projectedPosition = projectionMatrix * mvPosition;\n\
      gl_Position = projectedPosition;\n\
      \n\
      // compute UV coordinates on the video texture:\n\
      vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n\
      vec4 projectedPosition0 = projectionMatrix * mvPosition0;\n\
      vUVvideo = vec2(0.5,0.5) + videoTransformMat2 * projectedPosition0.xy/projectedPosition0.w;\n\
      vY = position.y*cos(THETAHEAD)-position.z*sin(THETAHEAD);\n\
      vec3 normalView = vec3(modelViewMatrix * vec4(normal,0.));\n\
      vNormalDotZ = pow(abs(normalView.z), 1.5);\n\
    }';

        const fragmentShaderSource = "precision lowp float;\n\
    uniform sampler2D samplerVideo;\n\
    varying vec2 vUVvideo;\n\
    varying float vY, vNormalDotZ;\n\
    void main() {\n\
      vec3 videoColor = texture2D(samplerVideo, vUVvideo).rgb;\n\
      float darkenCoeff = smoothstep(-0.15, 0.05, vY);\n\
      float borderCoeff = smoothstep(0.0, 0.55, vNormalDotZ);\n\
      gl_FragColor = vec4(videoColor * (1.-darkenCoeff), borderCoeff );\n\
    }";

        const mat = new THREE.ShaderMaterial({
            vertexShader: vertexShaderSource,
            fragmentShader: fragmentShaderSource,
            transparent: true,
            flatShading: false,
            uniforms: {
                samplerVideo:{ value: JeelizThreeHelper.get_threeVideoTexture() },
                videoTransformMat2: {value: spec.videoTransformMat2}
            },
        });
        maskBufferGeometry.computeVertexNormals();
        faceMesh = new THREE.Mesh(maskBufferGeometry, mat);
        faceMesh.renderOrder = -10000;
        faceMesh.frustumCulled = false;
        faceMesh.scale.multiplyScalar(1.12);
        faceMesh.position.set(0, 0.3, -0.25);
    })

    loadingManager.onLoad = () => {
        //HELMETOBJ3D.add(helmetMesh);
        //HELMETOBJ3D.add(visorMesh);
        HELMETOBJ3D.add(faceMesh);

        addDragEventListener(HELMETOBJ3D);

        threeStuffs.faceObject.add(HELMETOBJ3D);
    }

    // CREATE THE VIDEO BACKGROUND
    function create_mat2d(threeTexture, isTransparent){
        return new THREE.RawShaderMaterial({
            depthWrite: false,
            depthTest: false,
            transparent: isTransparent,
            vertexShader: "attribute vec2 position;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_Position = vec4(position, 0., 1.);\n\
          vUV = 0.5+0.5*position;\n\
        }",
            fragmentShader: "precision lowp float;\n\
        uniform sampler2D samplerVideo;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_FragColor = texture2D(samplerVideo, vUV);\n\
        }",
            uniforms:{
                samplerVideo: { value: threeTexture }
            }
        });
    }

    // MT216: create the frame. We reuse the geometry of the video
    const calqueMesh = new THREE.Mesh(threeStuffs.videoMesh.geometry,  create_mat2d(new THREE.TextureLoader().load('./images/frame_rupy.png'), true));
    calqueMesh.renderOrder = 999; // render last
    calqueMesh.frustumCulled = false;
    threeStuffs.scene.add(calqueMesh);

    // CREATE THE CAMERA:
    THREECAMERA = JeelizThreeHelper.create_camera();

    // CREATE THE LIGHTS:
    const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    threeStuffs.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 100, 1000, 100 );
    threeStuffs.scene.add(dirLight);
} // end init_threeScene()

// Entry point, launched by body.onload():
function main(){
    //JeelizResizer.size_canvas({
    //    canvasId: 'jeeFaceFilterCanvas',
    //    callback: function(isError, bestVideoSettings){
    //        init_faceFilter(bestVideoSettings);
    //    }
    //})

    JeelizResizer.size_canvas({
        canvasId: 'jeeFaceFilterCanvas',
        isFullScreen: true,
        callback: start,
        onResize: function(){
            JeelizThreeHelper.update_camera(THREECAMERA);
        }
    })
}

function init_faceFilter(videoSettings){
    JEELIZFACEFILTER.init({
        canvasId: 'jeeFaceFilterCanvas',
        NNCPath: 'neuralNets/', // root of NN_DEFAULT.json file
        videoSettings: videoSettings,
        callbackReady: function (errCode, spec) {
            if (errCode) {
                console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
                return;
            }

            console.log('INFO: JEELIZFACEFILTER IS READY');
            init_threeScene(spec);
        },

        // called at each render iteration (drawing loop)
        callbackTrack: function (detectState) {
            JeelizThreeHelper.render(detectState, THREECAMERA);
        }
    }); // end JEELIZFACEFILTER.init call
}

function start(){
    JEEFACEFILTERAPI.init({
        videoSettings:{ // increase the default video resolution since we are in full screen
            'idealWidth': 1280,  // ideal video width in pixels
            'idealHeight': 800,  // ideal video height in pixels
            'maxWidth': 1920,    // max video width in pixels
            'maxHeight': 1920    // max video height in pixels
        },
        followZRot: true,
        canvasId: 'jeeFaceFilterCanvas',
        NNCPath: 'neuralNets/', //root of NN_DEFAULT.json file
        callbackReady: function(errCode, spec){
            if (errCode){
                console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
                return;
            }

            console.log('INFO: JEEFACEFILTERAPI IS READY');
            init_threeScene(spec);
        }, //end callbackReady()

        // called at each render iteration (drawing loop):
        callbackTrack: function(detectState){
            JeelizThreeHelper.render(detectState, THREECAMERA);
        }
    }); //end JEEFACEFILTERAPI.init call
} //end start()