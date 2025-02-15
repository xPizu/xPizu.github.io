window.onload = function() {
    const audio = document.getElementById("backgroundMusic");
    audio.volume = 0.05;

    audio.play().catch(function(e) {
        console.log("Error playing audio: " + e.message);
    })
}

let totalFiles = 0;
let filesNeeded = 7;
let currentStatus = '';

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode, volume, language) {
    document.getElementById('connectionProgress').style.width = '100%';
}

function SetFilesTotal(total) {
    totalFiles = total;
    document.getElementById('filesProgress').style.width = '0%';
}

function DownloadingFile(fileName) {
    const progress = ((totalFiles - filesNeeded) / totalFiles) * 100;
    document.getElementById('resourcesProgress').style.width = `${progress}%`;
}

function SetStatusChanged(status) {
    currentStatus = status;
    document.getElementById('statusText').textContent = status;
    
    if (status.includes("Starting Lua")) {
        document.getElementById('finalProgress').style.width = '50%';
    } else if (status.includes("Sending client info")) {
        document.getElementById('finalProgress').style.width = '100%';
    }
}

function SetFilesNeeded(needed) {
    filesNeeded = needed;
    const progress = ((totalFiles - needed) / totalFiles) * 100;
    document.getElementById('filesProgress').style.width = `${progress}%`;
}
