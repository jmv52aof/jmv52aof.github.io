import { ConnectorPowerType } from '@common/types/stations'

export const POWER_TYPE_MAP: Record<ConnectorPowerType, string> = {
	AC: 'green',
	'AC-2': 'green',
	'AC-3': 'green',
	DC: 'orange',
}
