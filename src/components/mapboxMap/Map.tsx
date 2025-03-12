import mapboxgl from 'mapbox-gl'
import React, { useEffect, useState } from 'react'
import Supercluster from 'supercluster'
import styles from './styles/map.module.scss'
import { ClusterJSON, GeometryJSON, ViewState } from './lib/types.ts'
import { createMapboxPoint } from './lib/functions.ts'
import ClusterMarker from './components/ClusterMarker.tsx'
import Coordinates from './components/Coordinates.tsx'
import { Loader } from '@components/ui/loader/Loader.tsx'
import { MarkerInfo, PointOnMap } from '@common/types/map.ts'
import * as consts from './lib/consts.ts'
import Map, { Marker, Popup } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useWindowSizes } from '@common/hooks/window.ts'

/**
 * `styles` - стили карты
 * `projection` - режим отображения карты (по умолчанию globe)
 * `startZoom` - начальный зум для карты (по умолчанию 5). От 1 до 24
 * `minZoom` - минимально возможный зум карты (по умолчанию 5). От 1 до 24
 * `maxZoom` - максимально возможный зум карты (по умолчанию 15). От 1 до 24
 * `markers` - маркеры на карте
 * `getPopUp` - получение поп-ап по точке на карте
 * `whenLoaded` - будет вызвано сразу после загрузки карты
 * `getDefaultMarker` - получение стандартного маркера (не кластерного) по `markerInfo`
 */
type Props = {
	projection?: string
	startZoom?: number
	minZoom?: number
	maxZoom?: number
	markers: MarkerInfo[]
	getPopUp?: (point: PointOnMap) => React.JSX.Element
	whenLoaded?: () => void
	showLatAndLon?: boolean
	fixedLatAndLon?: boolean
	useMarkerAutoSize?: boolean
	getDefaultMarker: (markerInfo: MarkerInfo) => React.JSX.Element
	loading?: boolean
	showMapIfLoading?: boolean
	className?: string
	viewCoordinates?: PointOnMap
}

/**
 * Карта с использованием Mapbox. Переданные стили влияют на отображение карты.
 */
export default function MapboxMap(props: Readonly<Props>): React.JSX.Element {
	const { windowSizes } = useWindowSizes()

	const maxZoom = props.maxZoom ?? consts.DEFAULT_MAX_ZOOM
	const minZoom = props.minZoom ?? consts.DEFAULT_MIN_ZOOM

	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [viewState, setViewState] = useState<ViewState>({
		zoom: props.startZoom ?? consts.DEFAULT_MIN_ZOOM,
		longitude: props.viewCoordinates?.longitude ?? consts.DEFAULT_LONGITUDE,
		latitude: props.viewCoordinates?.latitude ?? consts.DEFAULT_LATITUDE,
	})
	const [latAndLon, setLatAndLon] = useState<PointOnMap>({
		longitude: props.viewCoordinates?.longitude ?? consts.DEFAULT_LONGITUDE,
		latitude: props.viewCoordinates?.latitude ?? consts.DEFAULT_LATITUDE,
	})
	const [clusters, setClusters] = useState<ClusterJSON[]>([])
	const [popUp, setPopUp] = useState<PointOnMap | null>(null)
	const [points, setPoints] = useState<GeometryJSON[]>([])

	useEffect(() => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
	}, [])

	useEffect(() => {
		if (!props.fixedLatAndLon)
			setLatAndLon({
				latitude: viewState.latitude,
				longitude: viewState.longitude,
			})
	}, [viewState])

	useEffect(() => {
		if (props.viewCoordinates) {
			setViewState({
				...viewState,
				latitude: props.viewCoordinates.latitude,
				longitude: props.viewCoordinates.longitude,
			})
			setLatAndLon({
				latitude: props.viewCoordinates.latitude,
				longitude: props.viewCoordinates.longitude,
			})
		}
	}, [props.viewCoordinates])

	useEffect(() => {
		if (props.loading !== undefined) setIsLoaded(!props.loading)
	}, [props.loading])

	useEffect(() => {
		setPoints(
			props.markers.map(value => {
				return createMapboxPoint([value.longitude, value.latitude])
			})
		)
	}, [props.markers])

	useEffect(() => {
		const index = new Supercluster({ radius: 40, maxZoom: maxZoom - 2 })
		index.load(points)
		const newClusters = index.getClusters([-180, -85, 180, 85], viewState.zoom)

		if (newClusters.length < clusters.length) {
			// Если кластеров стало меньше, то поп-ап удаляется, т.к. допустим баг, при котором после создания
			// кластера уже не получится закрыть поп-ап
			setPopUp(null)
		}

		setClusters(newClusters)
	}, [points, viewState.zoom, maxZoom])

	const getInitialPoint = (): PointOnMap => {
		if (!clusters.length) {
			return {
				latitude: consts.DEFAULT_LATITUDE,
				longitude: consts.DEFAULT_LONGITUDE,
			}
		}

		let maxCluster = clusters[0]
		for (const cluster of clusters) {
			if (
				(cluster.properties?.point_count ?? 1) >
				(maxCluster.properties?.point_count ?? 1)
			) {
				maxCluster = cluster
			}
		}
		return {
			longitude: maxCluster.geometry.coordinates[0],
			latitude: maxCluster.geometry.coordinates[1],
		}
	}

	useEffect(() => {
		if (isLoaded) return

		const initialPoint = getInitialPoint()
		setViewState({
			...viewState,
			latitude: initialPoint.latitude,
			longitude: initialPoint.longitude,
		})
	}, [clusters])

	return (
		<div
			className={`${styles.map} ${props.className}`}
			style={{
				height: windowSizes.height - consts.INVISIBLE_MAP_HEIGHT + 'px',
			}}
		>
			{!isLoaded && <Loader className={styles.map__loading} />}
			<Map
				{...viewState}
				mapStyle='mapbox://styles/mapbox/streets-v12'
				doubleClickZoom={true}
				minZoom={minZoom}
				maxZoom={maxZoom}
				fadeDuration={100}
				onClick={() => {
					if (popUp) setPopUp(null)
				}}
				onMove={e => {
					setViewState({
						zoom: e.viewState.zoom,
						latitude: e.viewState.latitude,
						longitude: e.viewState.longitude,
					})
				}}
				onZoomEnd={e =>
					setViewState({ ...viewState, zoom: e.target.getZoom() })
				}
				onLoad={() => {
					if (!props.loading) setIsLoaded(true)
					if (props.whenLoaded) props.whenLoaded()
				}}
				style={{
					opacity: isLoaded ? 1 : props.showMapIfLoading ? 0.3 : 0,
				}}
				projection={{
					name: 'mercator',
				}}
			>
				{clusters.map((value, index) => {
					const pointCount: number = value.properties?.point_count ?? 1
					const longitude = value.geometry.coordinates[0]
					const latitude = value.geometry.coordinates[1]

					const marker = props.markers.find(
						v => v.longitude === longitude && v.latitude === latitude
					)

					if (!marker && !value.properties?.cluster) {
						return <div key={index}></div>
					}

					const markerSize = props.useMarkerAutoSize
						? `${10 + (pointCount / points.length) * 20}px`
						: 'auto'

					return (
						<Marker
							key={index}
							longitude={longitude}
							latitude={latitude}
							onClick={() =>
								setTimeout(() => {
									if (
										popUp &&
										popUp.latitude === latitude &&
										popUp.longitude === longitude
									)
										setPopUp(null)
									else
										setPopUp({
											longitude: longitude,
											latitude: latitude,
										})
								}, 10)
							}
						>
							<div
								style={{
									width: markerSize,
									height: markerSize,
								}}
							>
								{value.properties?.cluster ? (
									<ClusterMarker count={pointCount} />
								) : (
									props.getDefaultMarker(marker as MarkerInfo)
								)}
							</div>
						</Marker>
					)
				})}
				{popUp && (
					<Popup
						longitude={popUp.longitude}
						latitude={popUp.latitude}
						closeOnClick={false}
						className={styles.map__popUp}
					>
						<div className={styles.popUp__container}>
							{props.getPopUp && props.getPopUp(popUp)}
						</div>
					</Popup>
				)}
				{props.showLatAndLon && (
					<div className={styles.map__coordinates}>
						<Coordinates
							latitude={latAndLon.latitude + ''}
							longitude={latAndLon.longitude + ''}
						/>
					</div>
				)}
			</Map>
		</div>
	)
}
