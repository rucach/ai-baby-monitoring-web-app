img = "";
objects = [];
status = "";
sound = 0;

function preload(){
    sound = loadSound("NBUK26X-alarm.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.position(350, 150);
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects"
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){

        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            if(objects[0].label == "person"){
                document.getElementById("status").innerHTML = "Status : Baby Detected";
                sound.stop();
                sound.rate(0);
            }else{
                document.getElementById("status").innerHTML = "Status : Baby not detected";
                document.getElementById("status").style.backgroundColor = red;
                sound.play();
                sound.rate(1);
            }

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x - 100, objects[i].y - 50, objects[i].width, objects[i].height);
        }
    }
}