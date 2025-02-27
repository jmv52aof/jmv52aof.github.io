import { createContext } from "react";
import { DEFAULT_ROOT_STATE } from "@common/consts/app";
import { RootState } from "@common/types/app";

const RootStateContext = createContext<RootState>(DEFAULT_ROOT_STATE);

export default RootStateContext;