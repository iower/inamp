var mainWindow = document.createElement('div');
mainWindow.id = 'inamp';
document.body.appendChild(mainWindow);

var styleElement = document.createElement('style');
mainWindow.appendChild(styleElement);

var panel = document.createElement('div');
panel.id = 'inamp-mainPanel';
mainWindow.appendChild(panel);

var display = document.createElement('div');
display.id = 'inamp-display';
panel.appendChild(display);

var trackControl = document.createElement('div');
trackControl.id = 'inamp-trackControl';
panel.appendChild(trackControl);

var previousButton = document.createElement('button');
previousButton.id = 'inamp-previousButton';
previousButton.classList.add('inamp-button');
previousButton.innerHTML = '&#x23ea;';
panel.appendChild(previousButton);

var playButton = document.createElement('button');
playButton.id = 'inamp-playButton';
playButton.classList.add('inamp-button');
playButton.innerHTML = '&#x23f4;';
panel.appendChild(playButton);

var pauseButton = document.createElement('button');
pauseButton.id = 'inamp-pauseButton';
pauseButton.classList.add('inamp-button');
pauseButton.innerHTML = '&#x23f8;';
panel.appendChild(pauseButton);

var stopButton = document.createElement('button');
stopButton.id = 'inamp-stopButton';
stopButton.classList.add('inamp-button');
stopButton.innerHTML = '&#x23f9;';
panel.appendChild(stopButton);

var nextButton = document.createElement('button');
nextButton.id = 'inamp-nextButton';
nextButton.classList.add('inamp-button');
nextButton.innerHTML = '&#x23e9;';
panel.appendChild(nextButton);

var ejectButton = document.createElement('button');
ejectButton.id = 'inamp-ejectButton';
ejectButton.classList.add('inamp-button');
ejectButton.innerHTML = '&#x23f6;';
panel.appendChild(ejectButton);


var context = new AudioContext() || new webkitAudioContext();
var bufferSource;


inamp = {
	
	playlist: [],
	
	state: null,
	
	
	setPlayList: function(urls) {
		this.playlist = urls;
	},
	
	play: function() {
		
		if (this.state == 'play') return;
		this.state = 'play';
		
		var request = new XMLHttpRequest();
		
		request.open('GET', this.playlist[0], true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			context.decodeAudioData(request.response, function(buffer) {
				bufferSource = context.createBufferSource();
				bufferSource.buffer = buffer;
				bufferSource.connect(context.destination);
				bufferSource.start();
			});
		}
		
		request.send();
	},
	
	stop: function() {
		
		if (this.state == 'stop') return;
		this.state = 'stop';
		
		bufferSource.stop();
	},
};


document.getElementById('inamp-playButton').addEventListener('click', function() {
	inamp.play();
});

document.getElementById('inamp-pauseButton').addEventListener('click', function() {
	inamp.stop();
});

document.getElementById('inamp-stopButton').addEventListener('click', function() {
	try {
		bufferSource.stop();
	} catch (e) {};
});



styleElement.innerHTML = `
	
	#inamp,
	#inamp * {
		box-sizing: border-box;
	}
	
	#inamp {
		position: fixed;
		right: 2px;
		bottom: 2px;
		width: 277px;
		height: 116px;
		border: 1px solid #1c1c27;
		background-color: #1a1922;
	}
	
	#inamp-mainPanel {
		position: absolute;
		left: 7px;
		top: 15px;
		width: 263px;
		height: 96px;
		border-left: 1px solid #5c5c63;
		border-top: 1px solid #5c5c63;
		background: linear-gradient(to right, #1c1c25 0%, #3a3a58 50%, #2d2d41 100%);
	}
	
	#inamp-display {
		position: absolute;
		left: 5px;
		top: 8px;
		width: 93px;
		height: 43px;
		border-top: 1px solid #1f1f2a;
		border-right: 1px solid #6f6f81;
		border-bottom: 1px solid #6d6d7d;
		background-color: #000;
	}
	
	.inamp-button {
		position: absolute;
		width: 22px;
		height: 17px;
		background-color: #c1cdd5;
		border-left: 1px solid #aeb4c4;
		border-top: 1px solid #aeb4c4;
		border-right: 1px solid #505a6a;
		border-bottom: 1px solid #505a6a;
		padding-left: 0;
		padding-right: 0;
		font-size: 15px;
		line-height: 15px;
	}
	
	#inamp-previousButton {
		left: 11px;
		top: 75px;
	}
	
	#inamp-playButton {
		left: 34px;
		top: 75px;
	}
	
	#inamp-pauseButton {
		left: 57px;
		top: 75px;
	}
	
	#inamp-stopButton {
		left: 80px;
		top: 75px;
	}
	
	#inamp-nextButton {
		left: 103px;
		top: 75px;
	}
	
	#inamp-ejectButton {
		left: 131px;
		top: 76px;
		width: 22px;
		height: 15px;
	}
	
	#inamp-trackControl {
		position: absolute;
		top: 59px;
		left: 11px;
		width: 249px;
		height: 10px;
		border-left: 2px solid #252434;
		border-top: 2px solid #252434;
		border-right: 1px solid #656571;
		border-bottom: 1px solid #656571;
	}
`;