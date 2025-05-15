export function debounce(func, timeout) {
	let timer;
	timeout = timeout || 300;
	return () => {
		const args = arguments;
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

export function throttle(func, delay) {
    let timer;
    return function() {
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}