import { createActorContext } from '@xstate/react';
import { memeMachine } from '../memeMachine.js';

const MemeMachineContext = createActorContext(memeMachine);

export const MachineProvider = MemeMachineContext.Provider;

export const useActorRef = MemeMachineContext.useActorRef;
export const useSelector = MemeMachineContext.useSelector;
