import type { EventObject, ExtractEvent } from 'xstate';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Generate a list of css classes, merged.
 */
export function cn(...args: Parameters<typeof clsx>): string {
	return twMerge(clsx(...args));
}

/**
 * Assert that the event object passed in is of the type specified in the second argument.
 * @throws if the event object is not of the type specified in the second argument.
 * @param event The event to check.
 * @param eventType The type of event to check for on th event's `type` property.
 */
export function assertEventType<TEvent extends EventObject, TEventType extends TEvent['type']>(
	event: TEvent,
	eventType: TEventType,
): asserts event is ExtractEvent<TEvent, TEventType> {
	if (event.type !== eventType) {
		throw new Error(`Expected event of type ${eventType}, but got ${event.type}`);
	}
}

/**
 * Flatten an object into a dot-separated string.
 * @param obj The object to flatten.
 */
export function createDotSeparatedString(obj: string | Record<string, any>): string {
	if (typeof obj === 'string') {
		return obj;
	}
	const keys = Object.keys(obj);
	if (keys.length === 1 && typeof obj[keys[0]] === 'object' && obj[keys[0]] !== null) {
		return `${keys[0]}.${createDotSeparatedString(obj[keys[0]])}`;
	} else if (keys.length === 1) {
		return `${keys[0]}.${obj[keys[0]]}`;
	} else {
		throw new Error('Object must have exactly one key');
	}
}

/**
 * add an artificial delay to an asynchronous call
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
