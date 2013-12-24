var TuringMachine = function(tape, grammar){
	this.tape = tape;
	this.cursor = 0;
	this.grammar = grammar;
	this.state = null;
	this.DEBUG = true;

	this.next = function(){
		if(this.state === null){
			this.state = this.grammar[0];
		}

		var head = this.read(this.state);
	
		this.state = head['nextstate'];
		// debug!
		this.write(head['cursor'], head['tobewritten']);
		
		if(this.DEBUG){
			this.debug(head);
		}
	}

	this.read = function(state){
		var readed = this.tape[this.cursor];

		this.clean(); // changes undefineds => nulls
		this.tape[this.cursor] = null; // empty element on the infinite tape
		

		var output = this.from(state, readed); // retrieve output data
		output['value'] = readed;
		output['cursor'] = this.cursor;
		this.move(output['moveto']);
		return output;
	}

	this.write = function(cursor, value){
		this.tape[cursor] = value;	
	}

	this.move = function(direction){
		if(direction === 'R'){
			++this.cursor;
		}else if(direction === 'L'){
			--this.cursor;
		}else{
			this.halt();
		}
	}

	this.from = function(state, readed){ // make moar λ-ish
		
		var productions = this.grammar[2][state];
		for(var i=0; productions && i<productions.length; i++){
			if(productions[i][0]===readed){
				return {
					'nextstate': productions[i][3],
					'moveto': productions[i][2],
					'tobewritten': productions[i][1],
				}
			}
		}

	}

	this.halt = function(){
		throw "Halt state has been reached.";
	}

	this.clean = function(){
		for (var i = this.tape - 1; i >= 0; i--) {
			if(this.tape[i] === undefined){
				this.tape[i] = null;
			}
		}
	}

	this.debug = function(head){
		var c = console;
		c.log("Readed: " + head['value'] + ". Written: " + head['tobewritten'] + ". Moving to: " + head['moveto'] + ". Next state: " + head['nextstate']);
		c.log(this.tape);
	}
}