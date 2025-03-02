import {
	ConnectorDto,
	ConnectorFormat,
	ConnectorPowerType,
	ConnectorStandard,
	ConnectorStatus,
	DailyOccupationDto,
	GeolocationDto,
	StationDto,
	StationStatus,
} from '@common/types/stations'
import {
	ConnectorFormatResponse,
	ConnectorPowerTypeResponse,
	ConnectorResponseDto,
	ConnectorStandardResponse,
	ConnectorStatusResponse,
	ConnectorTariffResponseDto,
	DailyOccupationResponseDto,
	GeolocationResponseDto,
	StationResponseDto,
	StationStatusResponse,
	TariffCurrencyResponse,
	TariffTypeResponse,
} from '../types/dto'
import {
	ConnectorTariffDto,
	TariffCurrency,
	TariffType,
} from '@common/types/tariffs'

const convertStationStatusResponse = (
	status: StationStatusResponse
): StationStatus => {
	switch (status) {
		case 'AVAILABLE':
			return 'Доступна'
		case 'CHARGING':
			return 'Занята'
		case 'INOPERATIVE':
			return 'Не работает'
		default:
			throw new Error('Conversion for station status not exists')
	}
}

const convertConnectorStatusResponse = (
	status: ConnectorStatusResponse
): ConnectorStatus => {
	switch (status) {
		case 'AVAILABLE':
			return 'Доступен'
		case 'CHARGING':
			return 'Занят'
		case 'INOPERATIVE':
			return 'Недоступен'
		case 'OUTOFORDER':
			return 'Отключен'
		case 'UNKNOWN':
			return 'Нет соединения'
		default:
			throw new Error('Conversion for connector status not exists')
	}
}

const convertConnectorStandardResponse = (
	standard: ConnectorStandardResponse
): ConnectorStandard => {
	switch (standard) {
		case 'CCS1':
			return 'CCS1'
		case 'CCS2':
			return 'CCS2'
		case 'CHADEMO':
			return 'CHAdeMO'
		case 'GBT_AC':
			return 'GB/T (AC)'
		case 'GBT_DC':
			return 'GB/T (DC)'
		case 'TESLA':
			return 'Tesla'
		case 'TYPE_1':
			return 'Type 1'
		case 'TYPE_2':
			return 'Type 2'
		default:
			return 'Другой'
	}
}

const convertConnectorFormatResponse = (
	format: ConnectorFormatResponse
): ConnectorFormat => {
	switch (format) {
		case 'CABLE':
			return 'Кабель'
		case 'SOCKET':
			return 'Розетка'
		default:
			throw new Error('Conversion for connector format not exists')
	}
}

const convertConnectorPowerTypeResponse = (
	powerType: ConnectorPowerTypeResponse
): ConnectorPowerType => {
	switch (powerType) {
		case 'AC_1_PHASE':
			return 'AC'
		case 'AC_2_PHASE':
		case 'AC_2_PHASE_SPLIT':
			return 'AC-2'
		case 'AC_3_PHASE':
			return 'AC-3'
		case 'DC':
			return 'DC'
		default:
			throw new Error('Conversion for connector power type not exists')
	}
}

const convertTariffTypeResponse = (type: TariffTypeResponse): TariffType => {
	switch (type) {
		case 'ENERGY':
			return 'Энергия'
		case 'FLAT':
			return 'Начало зарядки'
		case 'PARKING_TIME':
			return 'Длительность парковки'
		case 'TIME':
			return 'Длительность'
		default:
			throw new Error('Conversion for tariff type not exists')
	}
}

const convertTariffCurrencyResponse = (
	currency: TariffCurrencyResponse
): TariffCurrency => {
	switch (currency) {
		case 'RUB':
			return 'руб'
		default:
			throw new Error('Conversion for tariff currency not exists')
	}
}

const convertGeolocationResponseDto = (
	geolocation: GeolocationResponseDto
): GeolocationDto => {
	return {
		latitude: geolocation.latitude,
		longitude: geolocation.longitude,
	}
}

const convertConnectorTariffResponseDto = (
	tariff: ConnectorTariffResponseDto
): ConnectorTariffDto => {
	return {
		type: convertTariffTypeResponse(tariff.type),
		price: tariff.price,
		currency: convertTariffCurrencyResponse(tariff.currency),
	}
}

const convertDailyOccupationResponseDto = (
	occupation: DailyOccupationResponseDto
): DailyOccupationDto => {
	return {
		weekday: occupation.weekday,
		occupancy_in_percentage: occupation.occupancy_in_percentage,
	}
}

/** Преобразование серверной модели коннектора к dto */
const convertConnectorResponseDto = (
	connector: ConnectorResponseDto
): ConnectorDto => {
	return {
		evse_uid: connector.evse_uid,
		id: connector.id,
		status: convertConnectorStatusResponse(connector.status),
		standard: convertConnectorStandardResponse(connector.standard),
		format: convertConnectorFormatResponse(connector.format),
		power_type: convertConnectorPowerTypeResponse(connector.power_type),
		max_voltage: connector.max_voltage,
		max_amperage: connector.max_amperage,
		max_electric_power: connector.max_electric_power,
		tariffs: connector.tariffs
			? connector.tariffs.map(tariff =>
					convertConnectorTariffResponseDto(tariff)
			  )
			: [],
	}
}

/** Преобразование серверной модели станции к dto */
export const convertResponseStationDto = (
	station: StationResponseDto
): StationDto => {
	return {
		id: station.id,
		name: station.name,
		address: station.address,
		status: convertStationStatusResponse(station.status),
		description: station.description,
		coordinates: convertGeolocationResponseDto(station.coordinates),
		connectors: station.connectors.map(connector =>
			convertConnectorResponseDto(connector)
		),
		images: station.images,
		metres_to_station: station.metres_to_station,
		rating: station.rating,
		occupation: station.occupation
			? station.occupation.map(value =>
					convertDailyOccupationResponseDto(value)
			  )
			: [],
	}
}
