import { DEFAULT_FILTERS } from "@common/consts/stations";
import { StationFilters } from "@common/types/stations";

export const isFiltersDefault = (filters: StationFilters) =>
    filters.connectors.length === DEFAULT_FILTERS.connectors.length &&
    filters.connectors.every((item) => DEFAULT_FILTERS.connectors.includes(item)) &&
    filters.onlyAvailableStations === DEFAULT_FILTERS.onlyAvailableStations &&
    filters.minimalPower === DEFAULT_FILTERS.minimalPower &&
    filters.isModified === DEFAULT_FILTERS.isModified;