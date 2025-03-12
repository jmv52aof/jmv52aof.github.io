type ViewState = {
	zoom: number
	longitude: number
	latitude: number
}

type ClusterProperties = {
	cluster: boolean
	cluster_id: number
	point_count: number
	point_count_abbreviated: string
}

type Geometry = {
	type: string
	coordinates: number[]
}

type GeometryJSON = {
	type: string
	geometry: Geometry
}

interface ClusterJSON extends GeometryJSON {
	properties?: ClusterProperties
}

export { type ViewState, type ClusterJSON, type GeometryJSON }
