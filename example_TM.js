
tape = ['1', '0', '1', '1']
grammar =['q0', 'STOP', {
		'q0': [['1', '0', 'R', 'q0'],
		      ['0', '1', 'R', 'q1'],
		      [undefined, undefined, 'L', 'STOP']],
		'q1': [['0', '0', 'R', 'q1'],
		      ['1', '1', 'R', 'q1'],
		      [undefined, undefined, 'L', 'STOP']],
}];


var tm = new TuringMachine(tape, grammar);
tm.next()
tm.next()
tm.next()
tm.next()