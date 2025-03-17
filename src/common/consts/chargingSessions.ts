import { ChargingSessionStatus } from '@common/types/chargingSessions'
import { ColorTemplate } from '@components/ui/status/lib/types'
import SessionFilters from '@common/types/chargingSessions'
import { ConnectorStandard } from '@common/types/chargingSessions'
export namespace ChargingSessionStatuses {
	export const CHARGING: ChargingSessionStatus = 'Зарядка'
	export const COMPLETED: ChargingSessionStatus = 'Завершена'
	export const INVALID: ChargingSessionStatus = 'Невалидна'
}

export const CHARGING_SESSION_STATUS_HAS_COLOR: Record<
	ChargingSessionStatus,
	ColorTemplate
> = {
	Зарядка: 'green',
	Невалидна: 'red',
	Завершена: 'grey',
}

export const CONNECTORS_SESSION: ConnectorStandard[] = [
	'Type 1',
	'Type 2',
	'CCS1',
	'CCS2',
	'GB/T (AC)',
	'GB/T (DC)',
	'CHAdeMO',
	'Tesla',
]

export const DEFAULT_FILTERS: SessionFilters = {
	connectors: [...CONNECTORS_SESSION],
	onlyAvailableSessions: false,
	minimalPower: 0,
	isModified: false,
	shouldUpdateSessions: false,
}
