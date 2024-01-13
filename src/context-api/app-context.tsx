import { Dispatch, createContext, useReducer } from "react";
import { NodeType, WrapperType } from "../utils/types";

type AppStateType = {
  lastId: number;
  nodes: NodeType;
  colors: string[];
};

const initialState: AppStateType = {
  lastId: 0,
  nodes: { id: 0, color: "", children: [] },
  colors: ["#faebd7"],
};

type actionType = { type: "ADD_NODE" };

function appReducer(state: AppStateType, action: actionType) {
  switch (action.type) {
    case "ADD_NODE":
      return { ...state };
  }
}

export const AppContext = createContext<{ state: AppStateType; dispatch: Dispatch<actionType> } | null>(null);

export function AppProvider({ children }: WrapperType) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
