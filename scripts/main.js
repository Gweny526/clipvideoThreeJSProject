//Définir les variables globales
let currentState;
let startingDate;
let renderer, camera, scene;
let cube = [];
let cylinder = [];

let controls = new function () { 
    this.rotationSpeed = 0.02; 
    this.cameraPositionZ = 0.02;
    this.cameraPositionX = 0.02;
    this.cameraPositionY = 0.02;

    }; 

//les variable dans les functions seront local
function init(){
    currentState = 0;
    const AudioContext = window.AudioContext || window.webkitAudioContext; 
    const audioContext = new AudioContext(); 

    let audio = new Audio();
    audio.preload = "auto";
    audio.src = "./audio/witchroad.mp3";
    audio.play();
    startingDate = new Date(); //quand je lance l'audio ça démarre

    let audioSourceNode = audioContext.createMediaElementSource(audio); 
    analyserNode = audioContext.createAnalyser(); 
    analyserNode.fftSize = 256; 
    dataArray = new Uint8Array(analyserNode.frequencyBinCount);
    audioSourceNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination); 

    //creation de la scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); //rapport de la fenetre si plus pres de 0.1 ou plus loin que 1000 la camera ne le calcul plus et 45 angle de de vue de la camera

    // show axes in the screen
    const axes = new THREE.AxesHelper(20); //axe dans la camera
    scene.add(axes); 


    //position de la caméra
    camera.position.x = -20;
    camera.position.y = 20;
    camera.position.z = 250;
    camera.lookAt(scene.position);
    //ajout de la camera dans la scene
    scene.add(camera); 

    //ajout d'un mesh (ici un cube)
    // const geometry = new THREE.BoxGeometry(1 , 3, 1);
    const geometry = new THREE.TorusGeometry( 3, 0.5, 50, 20); 
    const material = new THREE.MeshBasicMaterial({ color: 0x800020 });
    for(let i = 0; i < 128; i ++)
    {
        cube[i] = new THREE.Mesh(geometry, material);
        cube[i].position.x = -120 +i*2;
        scene.add(cube[i]);  
    }
    // const geometryCyl = new THREE.CylinderGeometry(5,5,10,20);
    // const materialCyl = new THREE.MeshBasicMaterial({ color: 0x800020 });
    // for(let i = 0; i < 128; i ++)
    //     {
    //         cylinder[i] = new THREE.Mesh(geometryCyl, materialCyl);
    //         cylinder[i].position.x = -120 +i*2;
    //         scene.add(cylinder[i]);  
    //     }

    let gui = new dat.GUI(); 
    gui.add(controls, 'rotationSpeed', -1, 1);
    gui.add(controls, 'cameraPositionZ', -500, 500);
    gui.add(controls, 'cameraPositionX', -500, 500);
    gui.add(controls, 'cameraPositionY', -500, 500);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    // renderer.setClearColor(new Three.Color(0xFFFFFF, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById("WebGL-Output").appendChild(renderer.domElement);


    //doit être en dernière position dans la function init()
    render();
}

function render(){
    analyserNode.getByteFrequencyData(dataArray);
    console.log(dataArray[5]) 


    let elapsedTime = new Date() - startingDate; // date du moment moins le startingDate(quand on clique sur le bouton)
    console.log(elapsedTime);
    //check state
    switch(currentState)
    {
        case 0:
            console.log("state 0  Kathryn Hahn alone");
            for(let i = 0; i < 128; i ++)
                {
                    cube[i].scale.y = 1 + dataArray[i]/35;
                     
                    cube[i].material.color.setHex(0x5b2c6f);
                    cube[i].rotation.z +=controls.rotationSpeed+i/128;
                    
                }
            // cube.scale.y = 1 + dataArray[6]/100;
            // camera.lookAt(scene.position);
            camera.position.z = 7.372 + elapsedTime * 0.001;
            camera.position.x = 0.02
            camera.position.y = 0.02

            camera.lookAt(scene.position);



            if(elapsedTime > 27000) currentState = 1;
            break;
        case 1:
            // cube.scale.y = 1 + dataArray[6]/100;
            console.log("state 1 first armony Sasheer Zamata");
            for(let i = 0; i < 128; i ++)
                {
                    cube[i].scale.y = 1 + dataArray[i]/30;
                    cube[i].material.color.setHex(0xf8bbd0);
                    cube[i].rotation.z +=controls.rotationSpeed+i/128;
                    
                    
                }
                // camera.position.x = -20 + 20*Math.sin(elapsedTime)/10;
            camera.position.z = -250
            camera.position.x = 250 * Math.cos(elapsedTime/2000);
            //camera.position.z = Math.abs(250 * Math.sin(elapsedTime/2000));
            camera.lookAt(scene.position);
            // camera.position.x += 0.1;
            if(elapsedTime > 30000) currentState = 2;

            break;
        case 2:
            console.log("state 2 second armony Patti Lupone");
            for(let i = 0; i < 128; i ++)
                {
                    cube[i].scale.y = 1 + dataArray[i]/25;
                    cube[i].material.color.setHex(0xf1c40f);
                    cube[i].rotation.z +=controls.rotationSpeed+i/128;

                    
                }
            // camera.position.x = -20 + 20*Math.sin(elapsedTime)/8;
            camera.position.x = -250 * Math.cos(elapsedTime/2000);
            camera.position.z = Math.abs(-250 * Math.sin(elapsedTime/2000));
            camera.lookAt(scene.position);
            if(elapsedTime > 36000) currentState = 3;
            break;
        case 3:
            console.log("state 3 tird armony Ali Ahn");
            for(let i = 0; i < 128; i ++)
            {
                    cube[i].scale.y = 1 + dataArray[i]/20;
                    cube[i].material.color.setHex(0xf44336);
                    cube[i].rotation.z +=controls.rotationSpeed+i/128;


                    
                    
            }
            // camera.position.x = -20 + 20*Math.sin(elapsedTime)/5;
            camera.position.x =  250 * Math.cos(elapsedTime/2000);
            camera.position.z = Math.abs(250 * Math.sin(elapsedTime/2000));
            camera.lookAt(scene.position);
            if(elapsedTime > 45000) currentState = 4;
            break;
        case 4:
            console.log('state 4 chior group');
            for(let i = 0; i < 128; i ++)
                {
                    cube[i].scale.y = 1 + dataArray[i]/15;
                    cube[i].material.color.setHex(0xFF00CC);
                    cube[i].rotation.z +=controls.rotationSpeed+i/128;


                    
                }
            // camera.position.x = -20 + 20*Math.sin(elapsedTime)/2;
            camera.position.x = -300 * Math.cos(elapsedTime/2000);
            camera.position.z = Math.abs(-300 * Math.sin(elapsedTime/2000));
            camera.lookAt(scene.position);
            if(elapsedTime > 78000) currentState = 5;
            break;
        case 5 : 

            console.log(' state 5 bg music');
            for(let i = 0; i < 128; i ++)
                {
                    cube[i].scale.y = 1 + dataArray[i]/10;
                    cube[i].material.color.setHex(0x800020);
                    cube[i].rotation.z +=controls.rotationSpeed+i/128;                    
                }
            // camera.position.x = -300 * Math.cos(elapsedTime/2000);
            // camera.position.z = Math.abs(-300 * Math.sin(elapsedTime/2000));
            // camera.position.x = -20 + 100*Math.sin(elapsedTime)/2;
            camera.position.z = 245.80;
            camera.position.x = -54.66;
            camera.position.y = -198.56;
            camera.lookAt(scene.position);
            break;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}