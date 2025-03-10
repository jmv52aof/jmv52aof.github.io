import { DECIMAL_IN_MAX_POWER } from '@common/consts/stations'
import { ConnectorDto } from '@common/types/stations'

export const getMaxPowerForConnector = (connector: ConnectorDto): number => {
	return (
		Math.round((connector.max_electric_power / 1000) * DECIMAL_IN_MAX_POWER) /
		DECIMAL_IN_MAX_POWER
	)
}
