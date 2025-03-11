import {
	ConnectorStatus,
	ConnectorStandard,
	ConnectorPowerType,
} from '@common/types/stations'
import { ColorTemplate } from '@components/ui/status/lib/types'

import ccs1 from '@assets/images/connectors/ccs1.svg'
import ccs2 from '@assets/images/connectors/ccs2.svg'
import chademo from '@assets/images/connectors/chademo.svg'
import gbtAc from '@assets/images/connectors/gbt-ac.svg'
import gbtDc from '@assets/images/connectors/gbt-dc.svg'
import tesla from '@assets/images/connectors/tesla.svg'
import type1 from '@assets/images/connectors/type1.svg'
import type2 from '@assets/images/connectors/type2.svg'
import unknownType from '@assets/images/connectors/unknown-type.png'

export const statusColorMap: Record<ConnectorStatus, ColorTemplate> = {
	Доступен: 'green',
	Занят: 'orange',
	Недоступен: 'grey',
	'Нет соединения': 'grey',
	Отключен: 'grey',
}
export const standardMap: Record<ConnectorStandard, string> = {
	CCS1: ccs1,
	CCS2: ccs2,
	CHAdeMO: chademo,
	'GB/T (AC)': gbtAc,
	'GB/T (DC)': gbtDc,
	Tesla: tesla,
	'Type 1': type1,
	'Type 2': type2,
	Другой: unknownType,
}

export const powerTypeMap: Record<ConnectorPowerType, string> = {
	AC: 'green',
	'AC-2': 'green',
	'AC-3': 'green',
	DC: 'orange',
}
