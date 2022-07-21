class AbortError extends Error {
	constructor(...args) {
		super(...args);
		this.name = 'AbortError';
	}
}

export function withRaceControl(asyncFn) {
	let abortPrevRequest;
	return function (...args) {
		if (abortPrevRequest) {
			abortPrevRequest();
			abortPrevRequest = null;
		}
		let promise = Promise.resolve(asyncFn(...args));
		let [cancelablePromise, cancel] = withCancelablePromise(promise);
		abortPrevRequest = cancel;
		return cancelablePromise;
	};
}

export function withCancelablePromise(promise) {
	let cancel;
	let cancelablePromise = Promise.race([
		promise,
		new Promise((resolve, reject) => {
			let err = new AbortError('Fetch aborted');
			cancel = () => reject(err);
		}),
	]);
	return [cancelablePromise, cancel];
}
