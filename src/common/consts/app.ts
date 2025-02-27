import { StationFilters } from "@features/stationFilters/lib/types";
import { CONNECTORS } from "@common/consts/stations";

export const DEFAULT_ROOT_STATE: StationFilters = {
    connectors: [...CONNECTORS],
    onlyAvailableStations: true,
    minimalPower: 0,
    isModified: false,
};