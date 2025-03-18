import { Timestamp } from './date'
import { ConnectorInfoDto, ConnectorStandard } from './stations'
import { ConnectorTariffDto } from './tariffs'
export type ChargingSessionStatus = 'Зарядка' | 'Завершена' | 'Невалидна'

export type PaymentStatus = 'Оплачено' | 'Неоплачено'

export interface ChargingSessionDto {
	id: string
	connector_info: ConnectorInfoDto
	tariffs?: ConnectorTariffDto[]
	status: ChargingSessionStatus
	/** Заряженное количество кВт*ч */
	charged_kwh: number
	current_power?: number
	/** Максимальная мощность во время зарядки */
	max_power?: number
	/** Минимальная мощность во время зарядки */
	min_power?: number
	/** Дата и время начала сессии */
	start_date: Timestamp
	/** Дата и время конца сессии */
	end_date?: Timestamp
	/** Для активной сессии может не быть */
	total_cost?: number
	/** Способ оплаты (например Т-Банк) */
	payment_method?: string
	/** Статус оплаты */
	payment_status?: PaymentStatus
	/** Процент заряда батареи авто */
	battery_percentage?: number
}

export type SessionFilters = {
	connectors: ConnectorStandard[]
	onlyPaidSessions: boolean
	durationInHours: number
	isModified: boolean
	shouldUpdateSessions?: boolean
}
