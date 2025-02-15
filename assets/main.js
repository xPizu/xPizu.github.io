window.onload = function() {
    const audio = document.getElementById("backgroundMusic");
    
    audio.volume = 0.03;
    audio.play().catch(function(e) {
        console.log("Error playing audio: " + e.message);
    });
};
