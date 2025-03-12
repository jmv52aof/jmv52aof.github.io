import { ConnectorStandard } from '@common/types/stations'
import { StationFilters } from '@common/types/stations'
import { ConnectorStatus } from '@common/types/stations'
import { ConnectorColorTemplate } from '@components/stationCard/lib/types'
import type1Image from '@assets/images/connectors/type1.svg'
import type2Image from '@assets/images/connectors/type2.svg'
import ccs1Image from '@assets/images/connectors/ccs1.svg'
import ccs2Image from '@assets/images/connectors/ccs2.svg'
import gbtAcImage from '@assets/images/connectors/gbt-ac.svg'
import gbtDcImage from '@assets/images/connectors/gbt-dc.svg'
import chademoImage from '@assets/images/connectors/chademo.svg'
import teslaImage from '@assets/images/connectors/tesla.svg'
import unknownTypeImage from '@assets/images/connectors/unknown-type.png'
import { StationStatus } from '@common/types/stations'
import { ColorTemplate } from '@common/types/status'

export namespace StationStatuses {
	export const AVAILABLE: StationStatus = 'Доступна'
	export const CHARGING: StationStatus = 'Занята'
	export const INOPERATIVE: StationStatus = 'Не работает'
}

export const CONNECTOR_HAS_ICON: Record<ConnectorStandard, string> = {
	'Type 1': type1Image,
	'Type 2': type2Image,
	CCS1: ccs1Image,
	CCS2: ccs2Image,
	'GB/T (AC)': gbtAcImage,
	'GB/T (DC)': gbtDcImage,
	CHAdeMO: chademoImage,
	Tesla: teslaImage,
	Другой: unknownTypeImage,
}

export const CONNECTOR_STATUS_COLORS: Record<
	ConnectorStatus,
	ConnectorColorTemplate
> = {
	Доступен: 'green',
	Занят: 'orange',
	Отключен: 'red',
	'Нет соединения': 'red',
	Недоступен: 'grey',
}

export const CONNECTORS: ConnectorStandard[] = [
	'Type 1',
	'Type 2',
	'CCS1',
	'CCS2',
	'GB/T (AC)',
	'GB/T (DC)',
	'CHAdeMO',
	'Tesla',
]

export const DEFAULT_FILTERS: StationFilters = {
	connectors: [...CONNECTORS],
	onlyAvailableStations: false,
	minimalPower: 0,
	isModified: false,
	shouldUpdateStations: false,
}

export const STATION_STATUS_COLORS: Record<StationStatus, ColorTemplate> = {
	Доступна: 'green',
	Занята: 'orange',
	'Не работает': 'grey',
}

export const DECIMAL_IN_MAX_POWER = 2
