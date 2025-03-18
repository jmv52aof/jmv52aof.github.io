import { ChargingSessionStatus } from '@common/types/chargingSessions'
import SessionFilters from '@common/types/chargingSessions'
import { CONNECTORS } from '@common/consts/stations'
import { ColorTemplate } from '@common/types/status'

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

export const DEFAULT_FILTERS: SessionFilters = {
	connectors: [...CONNECTORS],
	onlyPaidSessions: false,
	minimalPower: 0,
	isModified: false,
	shouldUpdateSessions: false,
}
