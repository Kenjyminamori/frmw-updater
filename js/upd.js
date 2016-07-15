
//require('nw.gui').Window.get().showDevTools()
console.log("HELLO")

var lightYModem = require('./js/node_modules/particle-ymodem');
var sp = require("./js/node_modules/serialport");
var fs = require('fs');
var util = require('util');
var sysinfo = require('./js/st-regex.js').sysinfo;
var msg = require('./js/pp.js').msg;

var firmware = './js/firmware/nfc-gcc.bin'
var firmware_old = './js/firmware/nfc-gcc-old.bin'
var firm = true;
var tty_port = 'COM1'
var tty_baud = 115200
var logCallback = console.log;

var power_tty = "/dev/ttyUSB9"
var power_baud = 115200
var Convert = require('./js/node_modules/ansi-to-html');
var convert = new Convert();



var file2 = fs.readFileSync(firmware);
var port = new sp.SerialPort(tty_port, {baudrate: tty_baud}, false);
var powerSerial = new sp.SerialPort(power_tty, {baudrate: power_baud, dtr: true}, false);
var sendData = false;
var updater = {
	pathfile : null,
	file: null,
	setPath: function(val) {
		this.pathfile = val;
		this.file = fs.readFileSync(firmware);
	},
	getPath: function(val) {
		console.log(this.pathfile);
	}
}



port.on('error', function(msg){
	console.error('Error', msg);
})


port.on('data', function (data) {
	consoleOutput(data.toString())
	if (data.toString() == "C") {
		sendData = true;
		switchUpdate(false)
	} else {
		sendData = false;
		switchUpdate(true)
		
		//document.write(convert.toHtml(cleanStr(data.toString())));
	}
	console.log(data.toString())
	sysinfo.token.write(data);
});

var cleanStr = function(str){
	
	str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
	console.log(str)
	return str;	
}	

port.on('open', function (data) {
	console.log('port is opened')
});
port.open()

sysinfo.callback = function() {
	msg.info("Firmware version:");
	msg.pass(sysinfo.stats.version);
	console.log(sysinfo.stats.version);
	appendFirmware(sysinfo.stats.version);
}

var hell = function(){
	console.log('hi')
}
var modem = new lightYModem();
var update = function(firmware, port) {
	if (sendData  && port.isOpen()) {
		delete modem 
		modem = new lightYModem();
		port.removeAllListeners('open');
		port.removeAllListeners('close');
		port.close(function(){
			var progressCallback = function(val){ 
				console.log( Math.round(val.current*100/val.total) + '%' + '   '+ val.current);
				console.trace(val.current);
				}
			var logBack = msg.debug;
			modem.transfer(firmware, port, progressCallback, console.log);
			});
	}
} 



/*
process.stdin.on('data', function (text) {
	var str = text.toString()
	if (str === '\r\n') {
		if (port.isOpen()){
			msg.pass('port is open')
			msg.info(sendData)
		} else {
			msg.error('port is closed')
			msg.info(sendData)
		}
	}
	if (str === 'upd\n' || str === 'upd\r\n') {
		transfer();
	}
	if (str === 'close\n' || str === 'close\r\n') {
		port.close();
	}
	if (str === 'open\n' || str === 'open\r\n') {
		port.open();
	}
	if (str === 'rst\n' || str === 'rst\r\n') {
		reset(port);
	}
	if (str === 'i\n' || str === 'i\r\n') {
		console.log(port.isOpen());
		console.log('something');
	}
	if (str.match(/upd .{1,30}/g)){
		a = str.split(' ');
		firm = a[1].slice(0, -1)
		msg.info('update file: "'+ firm + '"');
		if (firm == 1 || firm == 'dirty') {
			msg.warn('updating firmware with dirty build'); 
			update(file, port);
		}
		if (firm == 2) {
			msg.warn('updating firmware with stable build'); 
			update(file2, port);
		}
		
	}
	if (str === 'count\n') {
		console.log((port.listeners('open')));
	}
});	
*/

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
var reset = function(port){
	port.close(function(){
		console.log(port.isOpen());
		port.open(function(){
			console.log(port.isOpen())
			});
		
		});
}
