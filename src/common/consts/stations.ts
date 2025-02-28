import { ConnectorStandard } from "@common/types/stations"
import { StationFilters } from "@common/types/stations"
import type1Image from '@assets/images/connectors/type1.svg'
import type2Image from '@assets/images/connectors/type2.svg'
import ccs1Image from '@assets/images/connectors/ccs1.svg'
import ccs2Image from '@assets/images/connectors/ccs2.svg'
import gbtAcImage from '@assets/images/connectors/gbt-ac.svg'
import gbtDcImage from '@assets/images/connectors/gbt-dc.svg'
import chademoImage from '@assets/images/connectors/chademo.svg'
import teslaImage from '@assets/images/connectors/tesla.svg'

export const CONNECTOR_HAS_ICON: Record<ConnectorStandard, string> = {
	"Type 1": type1Image,
    "Type 2": type2Image,
    "CCS1": ccs1Image,
    "CCS2": ccs2Image,
    "GB/T (AC)": gbtAcImage,
    "GB/T (DC)": gbtDcImage,
    "CHAdeMO": chademoImage,
    "Tesla": teslaImage
};

export const CONNECTORS: ConnectorStandard[] = ['Type 1', 'Type 2', 'CCS1', 'CCS2', 'GB/T (AC)', 'GB/T (DC)', 'CHAdeMO', 'Tesla'];

export const DEFAULT_FILTERS: StationFilters = {
    connectors: [...CONNECTORS],
    onlyAvailableStations: true,
    minimalPower: 0,
    isModified: false,
};