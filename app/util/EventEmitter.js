import { SubscriberList, isFunction } from 'cx/util';

export class EventEmitter {
	constructor() {
		this.eventTypes = {};
	}

	on(eventType, callback) {
		let list = this.eventTypes[eventType];
		if (!list) list = this.eventTypes[eventType] = new SubscriberList();

		return list.subscribe(callback);
	}

	fire(eventType, ...args) {
		let list = this.eventTypes[eventType];
		if (!list) return;

		list.notify(...args);
	}

	isActive() {
		let isActive = false;
		for (let eventType in this.eventTypes) {
			let list = this.eventTypes[eventType];
			if (!list.isEmpty()) {
				isActive = true;
				break;
			}
		}
		return isActive;
	}
}

export function withEventEmitter(Controller, eventEmitter) {
	let subscriptions = {};

	return class extends Controller {
		subscribe(event, callback) {
			if (!eventEmitter) return;
			if (subscriptions[event]) subscriptions[event]();
			subscriptions[event] = eventEmitter.on(event, callback, true);
		}

		fireEvent(eventName, ...args) {
			if (!eventEmitter) return;
			eventEmitter.fire(eventName, ...args);
		}

		onDestroy() {
			for (let event in subscriptions) {
				subscriptions[event]();
			}
			if (super.onDestroy) super.onDestroy();
		}
	};
}

export function eventEmitterGenerator() {
	let eventEmitter = new EventEmitter();

	return function withEventEmitter(Controller) {
		let subscriptions = {};

		function subscribe(event, callback) {
			if (!eventEmitter) return;
			if (subscriptions[event]) subscriptions[event]();
			subscriptions[event] = eventEmitter.on(event, callback);
		}

		function fireEvent(eventName, ...args) {
			if (!eventEmitter) return;
			eventEmitter.fire(eventName, ...args);
		}

		if (isClass(Controller)) {
			return class extends Controller {
				subscribe(...args) {
					subscribe(...args);
				}

				fireEvent(...args) {
					fireEvent(...args);
				}

				onDestroy() {
					for (let event in subscriptions) {
						subscriptions[event]();
					}
					if (super.onDestroy) super.onDestroy();
				}
			};
		} else if (isFunction(Controller)) {
			return function (params, ...args) {
				params = {
					...params,
					subscribe,
					fireEvent,
				};

				let config = Controller(params, ...args);
				let onDestroy = config.onDestroy;
				return {
					...config,
					onDestroy() {
						for (let event in subscriptions) {
							subscriptions[event]();
						}
						if (onDestroy) onDestroy();
					},
				};
			};
		} else {
			return {
				...Controller,

				subscribe(...args) {
					subscribe(...args);
				},

				fireEvent(...args) {
					fireEvent(...args);
				},

				onDestroy() {
					for (let event in subscriptions) {
						subscriptions[event]();
					}
					Controller.onDestroy && Controller.onDestroy();
				},
			};
		}
	};
}

function isClass(v) {
	return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}
