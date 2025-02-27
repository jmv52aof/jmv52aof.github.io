import { createContext } from "react";
import { DEFAULT_ROOT_STATE } from "@common/consts/app";
import { RootState } from "@common/types/app";

export const RootStateContext = createContext<RootState>({
    stationFilters: DEFAULT_ROOT_STATE,
    setStationFilters: () => {}
});