import AppRouter from './router/AppRouter'
import { useState } from "react"
import { RootState } from '@common/types/app'
import { DEFAULT_ROOT_STATE } from "@common/consts/app"
import RootStateContext from '@common/context/RootStateContext'

function App() {
    const [rootState] = useState<RootState>(DEFAULT_ROOT_STATE);

    return (
        <RootStateContext.Provider value={rootState}>
            <AppRouter />
        </RootStateContext.Provider>
    );
}

export default App;