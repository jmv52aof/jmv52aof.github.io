import { StationFilters } from "@features/stationFilters/lib/types"

export type RootState = {
    stationFilters: StationFilters;
    setStationFilters: React.Dispatch<React.SetStateAction<StationFilters>>;
};
