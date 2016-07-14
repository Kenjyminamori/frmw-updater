var messages = {
	deb: true,
	bold  :'\x1B[1m',
	green :'\x1B[32m',
	red   :'\x1B[31m',
	white :'\x1B[0m',
	startTime: process.hrtime(),
	timeFrom: function (start) {
		var now = process.hrtime();
		var sec = (now[0] - start[0])>>>0;
		var nano = (now[1] - start[1])>>>0;
		var time = [sec,nano]
		return time
	},
	log: "",
	saveLog: false,
	error: function(mes){
		process.stdout.write("\x1B[31mE[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n");
		if (this.saveLog) this.log += "\x1B[31mE[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n";
	},
	pass: function(mes){
		process.stdout.write("\x1B[32mP[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n");
		if (this.saveLog) this.log += "\x1B[32mP[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n";
	},
	warn: function(mes){
		process.stdout.write("\x1B[33mW[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n");
		if (this.saveLog) this.log += "\x1B[33mI[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n";
	},
	info: function(mes){
		process.stdout.write("\x1B[1mI[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n");
		if (this.saveLog) this.log += "\x1B[1mI[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n";
	},
	debug: function(mes){
		if (this.deb) process.stdout.write("\x1B[37mD[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n");
		if (this.saveLog) this.log += "\x1B[37mD[ "+ this.timeFrom(this.startTime) + " ] " + mes + this.white + "\r\n";
	},
	box: function(mes, color){
		process.stdout.write('\n     ╔══');
		for (i = 0; i < mes.length; i++){
			process.stdout.write('═');
		}
		process.stdout.write('══╗\n');
		process.stdout.write('     ║  ');
		for (i = 0; i < mes.length; i++){
			process.stdout.write(' ');
		}		
		process.stdout.write('  ║\n');
		if (color)
			process.stdout.write('     ║  '+ color + mes + this.white +'  ║\n');
		else
			process.stdout.write('     ║  '+ mes + this.white +'  ║\n');
		process.stdout.write('     ║  ');
		for (i = 0; i < mes.length; i++){
			process.stdout.write(' ');
		}		
		process.stdout.write('  ║\n');
		process.stdout.write('     ╚══');
		for (i = 0; i < mes.length; i++){
			process.stdout.write('═');
		}
		process.stdout.write('══╝\n\n');
	},
	failbox: function(mes){
		this.box(mes, this.bold + this.red);
	},
	passbox: function(mes){
		this.box(mes, this.bold + this.green);
	},
	resetLog: function() {
		this.log = "";
	},
}


exports.msg = messages;
