import { STATION_STATUS_COLORS } from '@common/consts/stations'
import { MarkerInfo } from '@common/types/map'
import MapboxMap from '@components/mapboxMap/Map'
import { RootStateContext } from 'contexts/RootStateContext'
import { useContext, useEffect, useState } from 'react'
import { markersInSameLocation } from './lib/functions'
import StationPopUp from './components/StationPopUp'
import { ColorTemplate } from '@common/types/status'
import StationsGroupMarker from './components/StationsGroupMarker'
import StationMarkerOnMap from './components/StationMarker'

type Props = {
	loading?: boolean
}

/**
 * Карта с отображением станций на ней
 */
export default function StationsMap(props: Readonly<Props>): React.JSX.Element {
	const { stations, mapViewState, setMapViewState } =
		useContext(RootStateContext)

	const [loading, setLoading] = useState<boolean>(true)
	const [markers, setMarkers] = useState<MarkerInfo[]>([])

	useEffect(() => {
		setMarkers(
			stations.map((value, index) => {
				return {
					id: index,
					latitude: Number.parseFloat(value.coordinates.latitude) ?? 0,
					longitude: Number.parseFloat(value.coordinates.longitude) ?? 0,
					color: STATION_STATUS_COLORS[value.status],
				} as MarkerInfo
			})
		)
	}, [stations])

	const findSameMarkers = (marker: MarkerInfo): MarkerInfo[] => {
		const result: MarkerInfo[] = []
		for (const m of markers)
			if (markersInSameLocation(m, marker)) result.push(m)
		return result
	}

	return (
		<MapboxMap
			useMarkerAutoSize
			markers={markers}
			startZoom={mapViewState?.zoom}
			viewCoordinates={mapViewState}
			onChangeViewState={v => setMapViewState(v)}
			getPopUp={point => {
				const marker = markers.find(
					value =>
						value.longitude === point.longitude &&
						value.latitude === point.latitude
				)
				if (!marker) return <></>

				const station = stations.find((_, i) => i === marker.id)

				const sameMarkers = findSameMarkers(marker)
				const otherStations = sameMarkers
					.map(value => stations.find((_, index) => value.id === index))
					.filter(value => !!value)
					.sort((a, b) => (a.id < b.id ? -1 : 1))

				return station ? (
					<StationPopUp station={station} otherStations={otherStations} />
				) : (
					<></>
				)
			}}
			whenLoaded={() => setLoading(false)}
			getDefaultMarker={markerInfo => {
				const sameMarkers = findSameMarkers(markerInfo)
				if (sameMarkers.length) {
					const sortedMarkerIds = [markerInfo.id]
						.concat(sameMarkers.map(value => value.id))
						.sort((a, b) => (a < b ? -1 : 1))
					// Отображает только самый первый как представителя группы
					return sortedMarkerIds[0] === markerInfo.id ? (
						<StationsGroupMarker stationsCount={sameMarkers.length + 1} />
					) : (
						<></>
					)
				}
				return <StationMarkerOnMap color={markerInfo.color as ColorTemplate} />
			}}
			loading={props.loading || loading}
		/>
	)
}
