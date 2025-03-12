import { GeometryJSON } from './types.ts'

const createMapboxPoint = (coordinates: number[]): GeometryJSON => {
	return {
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: coordinates,
		},
	}
}

export { createMapboxPoint }
