var SpeechRecognition = window.webkitSpeechRecognition;
var recegnition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recegnition.start();
}

recegnition.onresult = function (event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {
        console.log("Taking Selfie...");
        speak();
    }

}

function speak() {
    synth = window.speechSynthesis;
    speak_data = "Taking Your Selfie in 5 Seconds";
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    Webcam.attach(camera);
    setTimeout(function() {
        take_snapshot();
        save()
    }, 5000);
}

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera")

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie-img" src="'+ data_uri +'"/>';
    })
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie-img").src;
    link.href = image;
    link.click();
}