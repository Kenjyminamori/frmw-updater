$(document).ready(function(){
    console.log("ready")

function chooseFile(name) {
	var chooser = $(name);
	chooser.unbind('change');
	chooser.change(function(evt) {
		console.log($(this).val());
		updater.setPath($(this).val());
	});
}

	$('#updateDialog').click(chooseFile('#updateDialog'));
	$('#process').click(function(){
		update(file2, port)
		console.log('go')
	});

}); 

function appendFirmware(ver) {
	console.log('yes')
	$('#version').text(ver)
}

function switchUpdate(val){
	$( "#update" ).prop( "disabled", val );
}

function consoleOutput(val) {
	$("#console").append(convert.toHtml(cleanStr(val)))
}