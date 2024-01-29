import memeMachine from './memeMachine.js';
import initialMemeMachine from './initialMemeMachine.js';
import clueMemeMachine from './clueMemeMachine.js';
import finalMemeMachine, { MemeMachineEvent, MemeMachineContext } from './finalMemeMachine.js';
import { StateMachine } from 'xstate';

// cast any version of the machines to the final version
type FinalMemeMachine = StateMachine<
	MemeMachineContext,
	MemeMachineEvent,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any
>;

export default function loadMachine(): FinalMemeMachine {
	const name = window.location.search.substring(1);
	switch (name) {
		case 'initial':
			console.log('Loading initialMachine');
			return initialMemeMachine as unknown as FinalMemeMachine;
		case 'clue':
			console.log('Loading clueMachine');
			return clueMemeMachine as unknown as FinalMemeMachine;
		case 'final':
			console.log('Loading finalMachine');
			return finalMemeMachine;
		default:
			console.log('Loading memeMachine');
			return memeMachine as unknown as FinalMemeMachine;
	}
}
