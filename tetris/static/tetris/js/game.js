/*eslint-env jquery*/

let roomId = $('input[name="roomID"]').val();

let gameSocket = new WebSocket(
	'ws://' + window.location.host +
	'/ws/game/tetris/' + roomId + '/');

gameSocket.onmessage = function(e) {
	let data = JSON.parse(e.data);
	let message = data['message'];

	console.log(message);
}

gameSocket.onclose = function(e) {
	console.error('Game socket closed unexpectedly');
}

$('#screen canvas, #screen').click(function (e) {
	gameSocket.send(JSON.stringify({
		'message' : `${mouseX} ${mouseY}`
	}));
});

$(function () {
	let inviteLink = $('#invite-link');

	inviteLink.ready(function () {
		inviteLink.text(`${window.location.host}/game/tetris/join/?room_id=${roomId}`);
	});
});
// .text(`${window.location.host}/game/tetris/join/?room_id=${roomId}`);



let blocksData = [
	{
		'type' : 'block',
		'pos' : {'x' : 0, 'y' : 0},
		'current' : true
	}
];

function keyPressed() {
	let currentBlock;
	blocksData.forEach(function (e) {
		if (e.current) {
			currentBlock = e;
		}
	});

	if (keyCode == 32) {
		currentBlock.pos.y = 19;
	}
}

function setup () {
	let canvas = createCanvas(1000, 800);
	// console.log(canvas);

	canvas.parent('screen');
	let item = ellipse(50, 50, 80, 80);
	// console.log(item);
}

function draw () {
	clear();
	blocksData.forEach(function (e) {
		square(e.pos.x * 40, e.pos.y * 40, 40);
	});

	debug(
		`X: ${mouseX}, Y:${mouseY}`
	);
}

function mouseMoved() {
	clear()

	let offsetX = Math.floor(mouseX / 40) * 40;
	let offsetY = Math.floor(mouseY / 40) * 40;
 
	let item = square(offsetX, offsetY, 40);
	// items_array.push(item);
}

function debug(msg) {
	$('#debug-msg').text(
		msg
	);
}

/* jQuery events */
$('p5Canvas').ready(function () {

});

