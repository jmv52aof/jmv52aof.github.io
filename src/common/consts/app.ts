import { CONNECTORS } from "@common/consts/stations";
import { RootState } from "@common/types/app";

export const DEFAULT_ROOT_STATE: RootState = {
    stationFilters: {
        connectors: [...CONNECTORS],
        onlyAvailableStations: true,
        minimalPower: 0,
        isModified: false,
    },
};