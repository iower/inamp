var mainWindow = document.createElement('div');
mainWindow.id = 'inamp';
document.body.appendChild(mainWindow);

mainWindow.innerHTML = `
	<div id="inamp-mainPart">
		<div id="inamp-mainPart-frame">
			<div id="inamp-mainPart-frame-inner">
				<div id="inamp-title">
					<div id="inamp-menu-button"></div>
					<div class="inamp-title-decoration" id="inamp-title-decoration-left"></div>
					<div class="inamp-title-decoration" id="inamp-title-decoration-right"></div>
					<div id="inamp-top-button-1"></div>
					<div id="inamp-top-button-2"></div>
					<div id="inamp-top-button-3"></div>
				</div>
				<div id="inamp-mainPanel">
					<div id="inamp-display"></div>
					<div id="inamp-ticker"></div>
					<div id="inamp-bitrate"></div>
					<div id="inamp-frequency"></div>
					
					<div id="inamp-volume-control">
						<div id="inamp-volume-control-slider"></div>
					</div>
					
					<div id="inamp-balance-control">
						<div id="inamp-balance-control-slider"></div>
					</div>
					
					<div id="inamp-trackControl"></div>
					
					<button id="inamp-previousButton" class="inamp-button">&#x23ea;</button>
					<button id="inamp-playButton" class="inamp-button">&#x23f4;</button>
					<button id="inamp-pauseButton" class="inamp-button">&#x23f8;</button>
					<button id="inamp-stopButton" class="inamp-button">&#x23f9;</button>
					<button id="inamp-nextButton" class="inamp-button">&#x23e9;</button>
					<button id="inamp-ejectButton" class="inamp-button">&#x23f6;</button>
				</div>
			</div>
		</div>
	</div>
	
	<style id="inamp-styles"></style>
`;

var styleElement = document.getElementById('inamp-styles');
var panel = document.getElementById('inamp-mainPanel');
var display = document.getElementById('inamp-display');
var ticker = document.getElementById('inamp-ticker');
var bitrate = document.getElementById('inamp-bitrate');
var frequency = document.getElementById('inamp-frequency');

var previousButton = document.getElementById('inamp-previousButton');
var playButton = document.getElementById('inamp-playButton');
var pauseButton = document.getElementById('inamp-pauseButton');
var stopButton = document.getElementById('inamp-stopButton');
var nextButton = document.getElementById('inamp-nextButton');
var ejectButton = document.getElementById('inamp-ejectButton');


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
	bufferSource.stop();
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
	}
	
	#inamp-mainPart {
		width: 275px;
		height: 116px;
		border: 1px solid #1c1c27;
		background-color: #1a1922;
	}
	
	#inamp-mainPart-frame {
		width: 100%;
		height: 100%;
		border: 1px solid #5c5c63;
		border-right: none;
		border-bottom: none;
	}
	
	#inamp-mainPart-frame-inner {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	#inamp-title {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 12px;
		background: linear-gradient(to right, #1b1b22 0%, #383854 50%, #2c2b40 100%);
	}
	
	#inamp-menu-button {
		position: absolute;
		left: 4px;
		top: 2px;
		width: 9px;
		height: 7px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAYAAADam2dgAAAAVklEQVQY02NggILpDTb/GfCBdbMj/+tpqPzHpZBp3ezI/w29pxm+/WHGaQgLAwMDg44mNwOytWdv/oPzjdWZMHVNb7D5r6KijmI9Ey4rMiMk8PoDw6cAvqYfnW0ZYesAAAAASUVORK5CYII=');
	}
	
	.inamp-title-decoration {
		position: absolute;
		top: 2px;
		height: 7px;
		background-color: #817650;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAHCAYAAADJTCeUAAAAK0lEQVQI12NQUVH/zxQbpMnAxCdpz8BgZmzwn0lLXYKBSVGGg4FBXUPrPwBzhAZzg9MmVgAAAABJRU5ErkJggg==');
		background-repeat: repeat-x;
	}
	
	#inamp-title-decoration-left {
		left: 19px;
		width: 91px;
	}
	
	#inamp-title-decoration-right {
		left: 161px;
		width: 78px;
	}
	
	#inamp-title-decoration-left::before,
	#inamp-title-decoration-right::before {
		display: table;
		content: '';
		position: absolute;
		left: -2px;
		top: 0;
		width: 2px;
		height: 7px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAHCAYAAAAie5yXAAAAP0lEQVQI12NgYGBgUFFR/8+ooqL+38ZMkYGJgYGBQd/UnYFRRUX9vxA/J0RES10Cwnj28jsDAwMDA4O6htZ/AC6tCmKOtW66AAAAAElFTkSuQmCC');
	}
	
	#inamp-title-decoration-left::after,
	#inamp-title-decoration-right::after {
		display: table;
		content: '';
		position: absolute;
		right: -2px;
		top: 0;
		width: 2px;
		height: 7px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAHCAYAAAAie5yXAAAAPklEQVQI1zXLsQpAUBQA0OPlO5R6UUoGvMnu/39C2ZhMuiZnP3LuA+qttBBpWndQzcsQ9/VKY9eAdJwP8K8PiCgMyrr3AzMAAAAASUVORK5CYII=');
	}
	
	#inamp-top-button-1,
	#inamp-top-button-2,
	#inamp-top-button-3 {
		position: absolute;
		top: 2px;
		width: 7px;
		height: 7px;
	}
	
	#inamp-top-button-1 {
		right: 22px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAgElEQVQI12XNsQrCMBSF4f9CaBJaSGiXoEHI5OjuEzk5+QAOrj6ji4OLgyBqO3jdlNqzfodzBKCkTvnL6XIVKanTyk+M4SmYyish2gne6DEhWmrnaax84d4rRDDz2ZIQHCW739/5xfB+YBarNSm3o8mcGwAEYLc/qmvrUeGw3cgHdaMaULjhTuoAAAAASUVORK5CYII=');
	}
	
	#inamp-top-button-2 {
		right: 12px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAYklEQVQI12NkYGBgqJk04/+Pd18ZOIS4GWB0S14GI2PNpBn/+ZkYMMDLN18ZGM0MJf8z4ABMDHgAfsmnr7DLP3z9m4GRgYGBQVFC+P8vZg4GBgYGhj+MPxlY/rMzPH36lBEAvpYdogedra8AAAAASUVORK5CYII=');
	}
	
	#inamp-top-button-3 {
		right: 2px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAl0lEQVQI102OrwvCQACFv5MJImgxHBcHhgUdzLAoWlZMNhGW97+uHGwLa2seF8QwEH9Mznbs1e/xvUeRZy5NlGOUNFGuyDMX9N8XcRQC+EIcheimRgCcTwe3Wn6wxiKVpGo7Sm1EAPB83xjMD6kk1livnwA87r0Hx93aQ3G97N1cDFRtx3izajuCxXSGbmpKbcTosEs2W/6uQjeekkkBrQAAAABJRU5ErkJggg==');
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
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAD0lEQVQI12OQk9P9z4AMABSFAWk1/ErCAAAAAElFTkSuQmCC');
		background-repeat: repeat;
	}
	
	#inamp-ticker {
		position: absolute;
		left: 103px;
		top: 10px;
		width: 159px;
		height: 14px;
		background-color: #000;
		border-top: 1px solid #272737;
		border-left: 1px solid #272737;
		border-right: 1px solid #707084;
		border-bottom: 1px solid #707084;
	}
	
	#inamp-bitrate {
		position: absolute;
		left: 103px;
		top: 27px;
		width: 20px;
		height: 12px;
		background-color: #000;
		border-top: 1px solid #272737;
		border-left: 1px solid #272737;
		border-right: 1px solid #707084;
		border-bottom: 1px solid #707084;
	}
	
	#inamp-bitrate::after {
		display: table;
		content: '';
		position: absolute;
		top: 2px;
		left: 22px;
		width: 15px;
		height: 7px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAHCAYAAADXhRcnAAAAPklEQVQY06WQQQoAIAgEXf//5+lSIKJFNRcdFRQNwALZd7h94NVGJkevGjnv4tPZkgTgUfJZkhRry2+e2g4PLrZbvXdgOtQAAAAASUVORK5CYII=');
	}
	
	#inamp-frequency {
		position: absolute;
		left: 148px;
		top: 27px;
		width: 15px;
		height: 12px;
		background-color: #000;
		border-top: 1px solid #272737;
		border-left: 1px solid #272737;
		border-right: 1px solid #707084;
		border-bottom: 1px solid #707084;
	}
	
	#inamp-frequency::after {
		display: table;
		content: '';
		position: absolute;
		top: 2px;
		left: 17px;
		width: 13px;
		height: 6px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAGCAYAAAAYLBS/AAAAP0lEQVQY05WQ0QoAMAgCM/b/v+xeEqQ12HyU84KCJOMz2QuX3ITLAQCYoD6GCg0OwEQS52RGpV9Tl4JeHsLKBnzDL/xppXwjAAAAAElFTkSuQmCC');
	}
	
	#inamp-volume-control,
	#inamp-balance-control {
		position: absolute;
		top: 45px;
		height: 6px;
		border-radius: 4px;
		border-left: 1px solid #1e1e29;
		border-top: 1px solid #1e1e29;
		border-right: 1px solid #7e7e92;
		border-bottom: 1px solid #7e7e92;
	}
	
	#inamp-volume-control {
		left: 106px;
		width: 60px;
		background-color: #559126;
	}
	
	#inamp-balance-control {
		left: 171px;
		width: 38px;
		background-color: #cbd945;
	}
	
	#inamp-volume-control-slider,
	#inamp-balance-control-slider {
		position: absolute;
		top: -3px;
		width: 14px;
		height: 11px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAdklEQVQoz2NkYGBgEBGT+c9AAnjz6gkjo4iYzP+TF86Soo/B3MCYgeXNqycMDAwMDJev3iSo4eyJCwyXr99gePPqCQMTumRKdBRWGh0wMZAJ6K+RkYGB4f/dZy9JCpwjezYxsCALkgJYRMRkGIpLGslyKlkpBwAR1C3d9Dy5EwAAAABJRU5ErkJggg==');
	}
	
	#inamp-volume-control-slider {
		right: -2px;
	}
	
	#inamp-balance-control-slider {
		left: 50%;
		margin-left: -7px;
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