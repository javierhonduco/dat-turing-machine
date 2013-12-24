
tape = ['1', '0', '1', '0']
grammar =['q0', 'STOP', {
		'q0': [['1', '0', 'R', 'q0'],
		      ['0', '1', 'R', 'q0'],
		      [undefined, undefined, 'L', 'q1']],
		'q1': [['1', '1', 'L', 'q1'],
		      ['0', '0', 'L', 'q1'],
		      [undefined, undefined, 'R', 'STOP']],
}];





var TMFrontend = function(tape, grammar){
	this.TM = new TuringMachine(tape, grammar);

	this.load = function(element, cursor){
		var tape_dom = $(element);
		var cursor_dom = $(cursor);
		tape_dom.html('');
		cursor_dom.html('');
		
		tape_dom.append('<td id="tape_-1">b</td>');
		cursor_dom.append('<td id="cursor_-1"></td>');

		for (var i = 0; i < tape.length+1; i++) {
			tape_dom.append('<td id="tape_'+i+'"">'+ (tape[i] === undefined ? 'b' : tape[i]) +'</td>');
			cursor_dom.append('<td id="cursor_'+i+'"></td>');
		}
		$('#cursor_0').html('^');
	}

	this.run = function(lastcursor){
		var tm = this.TM;
		
		if(tm.state === null){
			tm.state = tm.grammar[0];
		}

		var head = tm.read(tm.state);
	 	
		this.cleanCursor();
		
		$('#cursor_'+ head['cursor']).html('^');

		// TODO. Simulate destructive reads & `bounds`
		tm.state = head['nextstate'];

		tm.write(head['cursor'], head['tobewritten']);
		this.cleanCursor();

		$('#cursor_'+ head['cursor']).html('^');
		/* Write & update html */
		$('#tape_'+ head['cursor']).html(head['tobewritten']);		
	}

	this.cleanCursor = function(){
		var cursors = $('.cursor > td').length;
		for (var i = -1; i < cursors+1; i++) {
			$('#cursor_'+i).html('');
		}
	}
}


$(document).ready(function(){

	tmf = new TMFrontend(tape, grammar);
	tmf.load('.tape', '.cursor');



	/*$('#load').click(function(){

	});*/

	$('#run').click(function(){
		
		for (var i = 0; i < parseInt($('#step').val()); i++) {
			tmf.run()
		}

	});


});
//(function(){


//})();


