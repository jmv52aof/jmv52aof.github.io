import { ChargingSessionStatus } from '@common/types/chargingSessions'
import { ColorTemplate } from '@components/ui/status/lib/types'

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
