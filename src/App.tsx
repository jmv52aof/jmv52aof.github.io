import AppRouter from './router/AppRouter'
import { useMemo, useState } from "react"
import { RootState } from '@common/types/app'
import { DEFAULT_ROOT_STATE } from "@common/consts/app"
import { RootStateContext } from 'contexts/RootStateContext'
import { StationFilters } from '@features/stationFilters/lib/types'

export default function App() {
    const [stationFilters, setStationFilters] = useState<StationFilters>(DEFAULT_ROOT_STATE);

    const contextValue = useMemo<RootState>(() => ({
        stationFilters,
        setStationFilters
    }), [stationFilters]);

    return (
        <RootStateContext.Provider value={contextValue}>
            <AppRouter />
        </RootStateContext.Provider>
    );
}