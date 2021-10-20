Webcam.set({
    width: 350,
    height: 300,
    image_format:"png",
    png_quality: 90
});
camera = document.getElementById("camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    });
}

console.log("ml5 version",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RbXkZjGTl/model.json",modelLoaded);

function modelLoaded() {
    console.log("model Loaded");
}

function check() {
    img = document.getElementById("capture_image");
    classifier.classifier(img,gotresult);
}

function gotresult(error,results) {
    if(error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}