export const initMarkers = (min: number, max: number, step: number) => {
	const result = [];
	for (let i = min; i <= max; i += step) {
		result.push(i);
	}
	return result;
}