Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


var LISPIE = function () {
	this.tokens = [];
	this.parsedTokens = [];
	
	this.tokenize = function(code) { 
		/* 
			Split the source code into Lisp logical chunks
		*/
		
		var tokens = code.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').split(' ').clean('');
		this.raiseonEOF();
		this.tokens = tokens;
		return tokens;
	}
	
	this.parse = function(){
		/*
			Check syntax & 
			Create the `AST`
		*/
		this.raiseonEOF();
		var top = this.tokens.shift()
		if(top === '('){
			var parsed = [];

			while(this.tokens[0] !== ')'){
				parsed.push(this.parse());
			}
			this.tokens.shift();
			return parsed;
		}else if(top === ')'){
			throw 'Syntax error.';
		}else{
			return this.atom(top.toString());
		}
		
	}
	
	this.atom = function(top){
		return top.toString(); // beta!
	}
	
	this.raiseonEOF = function(){
		if(this.tokens.length === 0){
			return -1;
		}
	}
	
	this.evaluate = function(parsedTokens){
		
	}
}


var code = "(begin (let tape (list 1 2 3)) (let grammar (let definition (list q0 STOP)) (let productions (let q0 (list 1 1 R q0)) (let q0 (list b b L STOP)))))";
var lispie = new LISPIE();
var tokens = lispie.tokenize(code);
//console.log(lispie.tokens);
//console.log("DOGE!\n\n");
var parsed = lispie.parse();
console.log(parsed);
console.log(lispie.evaluate(parsed));
