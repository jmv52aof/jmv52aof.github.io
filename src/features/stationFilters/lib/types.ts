import { ConnectorStandard } from "@common/types/stations";

export type StationFilters = {
    connectors: ConnectorStandard[];
    onlyAvailableStations: boolean;
    minimalPower: number;
    isModified: boolean;
};