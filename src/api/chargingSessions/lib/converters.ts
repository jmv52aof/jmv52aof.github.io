import {
	ChargingSessionDto,
	ChargingSessionStatus,
	PaymentStatus,
} from '@common/types/chargingSessions'
import {
	ChargingSessionResponseDto,
	ChargingSessionStatusResponse,
	PaymentStatusResponse,
} from '../types/dto'
import {
	convertConnectorInfoResponseDto,
	convertConnectorTariffResponseDto,
} from 'api/stations/lib/converters'
import { dateStringToTimestamp } from '@common/functions/date'

/** Преобразование серверных моделей в dto */

const convertChargingSessionStatusResponse = (
	status: ChargingSessionStatusResponse
): ChargingSessionStatus => {
	switch (status) {
		case 'ACTIVE':
			return 'Зарядка'
		case 'COMPLETED':
			return 'Завершена'
		case 'INVALID':
			return 'Невалидна'
	}
	throw new Error('Conversion for charging session status not exists')
}

const convertPaymentStatusResponse = (
	status: PaymentStatusResponse
): PaymentStatus => {
	switch (status) {
		case 'PAID':
			return 'Оплачено'
		case 'UNPAID':
			return 'Неоплачено'
	}
	throw new Error('Conversion for payment status not exists')
}

/** Преобразует серверную модель зарядной сессии к dto */
export const convertChargingSessionResponseDto = (
	session: ChargingSessionResponseDto
): ChargingSessionDto => {
	return {
		id: session.id,
		connector_info: convertConnectorInfoResponseDto(session.connector_info),
		tariffs: session.tariffs
			? session.tariffs.map(value => convertConnectorTariffResponseDto(value))
			: undefined,
		status: convertChargingSessionStatusResponse(session.status),
		charged_kwh: session.charged_kwh,
		current_power: session.current_power,
		max_power: session.max_power,
		min_power: session.min_power,
		start_date: dateStringToTimestamp(session.start_date),
		end_date: session.end_date
			? dateStringToTimestamp(session.end_date)
			: undefined,
		total_cost: session.total_cost,
		payment_method: session.payment_method,
		payment_status: convertPaymentStatusResponse(session.payment_status),
		battery_percentage: session.battery_percentage,
	}
}

/** Преобразование dto к серверным моделям */

export const convertChargingSessionStatus = (
	status: ChargingSessionStatus
): ChargingSessionStatusResponse => {
	switch (status) {
		case 'Зарядка':
			return 'ACTIVE'
		case 'Завершена':
			return 'COMPLETED'
		case 'Невалидна':
			return 'INVALID'
	}
	throw new Error('Conversion for charging session status not exists')
}
