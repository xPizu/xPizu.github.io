const LOAD = {
    init: function() {
        const audio = document.getElementById("backgroundMusic");
        audio.volume = 0.03;
        audio.play().catch(function(e) {
            console.log("Error playing audio: " + e.message);
        });

        this.progress = 0.0;
        this.filesNeeded = 1;
        this.filesTotal = 1;
        this.currentStatus = '';

        this.elements = {
            connectionProgress: document.getElementById('connectionProgress'),
            filesProgress: document.getElementById('filesProgress'),
            resourcesProgress: document.getElementById('resourcesProgress'),
            finalProgress: document.getElementById('finalProgress'),
            statusText: document.getElementById('statusText')
        };

        Object.values(this.elements).forEach(el => {
            if (el && el.style) {
                el.style.width = '0%';
            }
        });
    },

    updateProgress: function() {
        const filesRemaining = Math.max(0, this.filesTotal - this.filesNeeded);
        const progress = (this.filesTotal > 0) ? (filesRemaining / this.filesTotal) * 100 : 0;
        
        if (this.elements.resourcesProgress) {
            this.elements.resourcesProgress.style.width = `${progress}%`;
        }
        
        if (this.elements.statusText) {
            this.elements.statusText.textContent = `Chargement: ${Math.round(progress)}%`;
        }
    }
};

window.onload = function() {
    LOAD.init();
};

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode, volume, language) {
    LOAD.elements.statusText.textContent = `Connexion à ${servername}...`;
    LOAD.elements.connectionProgress.style.width = '100%';
}

function SetFilesTotal(total) {
    LOAD.filesTotal = Math.max(0, parseInt(total));
    LOAD.elements.filesProgress.style.width = '0%';
}

function DownloadingFile(fileName) {
    LOAD.elements.statusText.textContent = `Téléchargement: ${fileName}`;
    LOAD.updateProgress();
}

function SetStatusChanged(status) {
    LOAD.currentStatus = status;
    LOAD.elements.statusText.textContent = status;

    switch (status) {
        case "Retrieving server info...":
            LOAD.elements.connectionProgress.style.width = '50%';
            break;
        case "Starting Lua...":
            LOAD.elements.finalProgress.style.width = '50%';
            break;
        case "Sending client info...":
            LOAD.elements.finalProgress.style.width = '100%';
            break;
    }
}

function SetFilesNeeded(needed) {
    LOAD.filesNeeded = Math.max(0, parseInt(needed));
    
    const progress = ((LOAD.filesTotal - needed) / LOAD.filesTotal) * 100;
    LOAD.elements.filesProgress.style.width = `${progress}%`;
    
    if (needed === 0) {
        LOAD.elements.resourcesProgress.style.width = '100%';
    }
    
    LOAD.updateProgress();
}
