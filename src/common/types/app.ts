import { StationFilters } from "@features/stationFilters/lib/types"

export type RootState = {
    stationFilters: StationFilters;
};

export interface IRootStateContext extends RootState {
    setStationFilters: React.Dispatch<React.SetStateAction<StationFilters>>;
};