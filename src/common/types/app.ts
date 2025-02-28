import { StationFilters } from "./stations";

export type RootState = {
    stationFilters: StationFilters;
};

export interface IRootStateContext extends RootState {
    setStationFilters: (filters: StationFilters) => void;
};