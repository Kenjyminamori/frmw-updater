var tokenizer = require("regexp-stream-tokenizer");


function splitValue (data){
	answer = null;
	if (data){
		answer = data.toString();
		
		i = answer.indexOf(':');
		answer = answer.slice(i+2);
		
		answer = answer.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,"")
		return answer;
	}
	return answer;
}

var testinfo = {
	str: "",
	stats: {},
	calc: function(){
		//this.stats.statusOfTest = this.str.match(/PASS|TEST STAT|FAIL/mg )[0];
		this.stats.pass  = splitValue(this.str.match(/Pass\s*:\s*.*/mg ));
		this.stats.fail  = splitValue(this.str.match(/Fail\s*:\s*.*/mg ));
		this.stats.NFC   = splitValue(this.str.match(/NFC\s*:\s*.*/mg ));
		this.stats.USART = splitValue(this.str.match(/USART\s*:\s*.*/mg ));
		this.stats.cr95  = splitValue(this.str.match(/CR95\s*:\s*.*/mg ));
		this.stats.E_RF  = splitValue(this.str.match(/E_RF\s*:\s*.*/mg ));
		this.stats.E_P2S = splitValue(this.str.match(/E_P2S\s*:\s*.*/mg ));
		this.stats.E_S2P = splitValue(this.str.match(/E_S2P\s*:\s*.*/mg ));
	},
	callback: function(){},
	token: tokenizer(/====.{6}(PASS[\s\S]*|TEST STAT|FAIL).{5}====[\s\S]{0,200}===================/mg).on('data', function(data){
	testinfo.str = data.toString();
	testinfo.calc();
	testinfo.callback();
	}),
}


var sysinfo = {
	str   : "",
	stats : {},
	calc  : function(){
		this.stats.version   = splitValue(this.str.match(/Version\s*:\s*.*/mg));
		this.stats.buildDate = splitValue(this.str.match(/Build Date\s*:\s*.*/mg));
		this.stats.buildTime = splitValue(this.str.match(/Build Time\s*:\s*.*/mg));
		this.stats.syslock   = splitValue(this.str.match(/Sysclock\s*:\s*.*/mg));
		this.stats.buildType = splitValue(this.str.match(/Build type\s*:\s*.*/mg));
		this.stats.mode      = splitValue(this.str.match(/Mode\s*:\s*.*/mg));
		this.stats.flash     = splitValue(this.str.match(/Flash\s*:\s*.*/mg));
		this.stats.pcb       = splitValue(this.str.match(/PCB\s*:\s*.*/mg));
		this.stats.pcbrev    = splitValue(this.str.match(/PCB rev\s*:\s*.*/mg));
		this.stats.sn        = splitValue(this.str.match(/S\/N\s*:\s*.*/mg));
		},
	show  : function(){
		console.log("%j",this.stats);
		},
	callback: function(){},
	token : tokenizer(/========= NFC Barcode emulator for MediaMarkt =========[\s\S]{0,500}=======================================================/mg).on('data', function(data){
		sysinfo.str = data.toString();
		sysinfo.calc();
		sysinfo.callback();
		}),
};


exports.testinfo = testinfo;
exports.sysinfo = sysinfo;
