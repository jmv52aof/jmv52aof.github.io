import { StationFilters } from "@features/stationFilters/lib/types";
import { CONNECTORS } from "@common/consts/stations";

export const DEFAULT_ROOT_STATE = {
    stationFilters: {
        connectors: [...CONNECTORS],
        onlyAvailableStations: true,
        minimalPower: 0,
        isModified: false,
    } as StationFilters,
};