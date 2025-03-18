import { MarkerInfo } from '@common/types/map'

/**
 * Определяет, находятся ли маркеры так близко, что их можно отнести к одной локации
 */
export const markersInSameLocation = (
	marker1: MarkerInfo,
	marker2: MarkerInfo
): boolean => {
	if (marker1.id === marker2.id) return false

	const diffLat =
		Math.max(marker1.latitude, marker2.latitude) -
		Math.min(marker1.latitude, marker2.latitude)
	const diffLon =
		Math.max(marker1.longitude, marker2.longitude) -
		Math.min(marker1.longitude, marker2.longitude)

	return diffLat <= 0.0001 && diffLon <= 0.0001
}
