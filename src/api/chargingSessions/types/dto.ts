import {
	ConnectorInfoResponseDto,
	ConnectorTariffResponseDto,
} from 'api/stations/types/dto'

export type ChargingSessionStatusResponse = 'ACTIVE' | 'COMPLETED' | 'INVALID'

export type PaymentStatusResponse = 'PAID' | 'UNPAID'

export interface ChargingSessionResponseDto {
	id: string
	connector_info: ConnectorInfoResponseDto
	tariffs?: ConnectorTariffResponseDto[]
	status: ChargingSessionStatusResponse
	/** Заряженное количество кВт*ч */
	charged_kwh: number
	current_power?: number
	/** Максимальная мощность во время зарядки */
	max_power?: number
	/** Минимальная мощность во время зарядки */
	min_power?: number
	/** Дата и время начала сессии. RFC 3339 */
	start_date: string
	/** Дата и время конца сессии. RFC 3339 */
	end_date?: string
	/** Для активной сессии может не быть */
	total_cost?: number
	/** Способ оплаты (например Т-Банк) */
	payment_method?: string
	/** Статус оплаты */
	payment_status?: PaymentStatusResponse
	/** Процент заряда батареи авто */
	battery_percentage?: number
}
