import { Dispatch, createContext, useReducer } from "react";
import { AlignmentType, NodeType, WrapperType } from "../utils/types";
import { addNode, generateColor } from "../utils/helper";

type AppStateType = {
  node: NodeType;
  totalNodes: number;
};

const initialState: AppStateType = {
  node: { id: 1, color: "#faebd7", children: [], alignment: "horizontal" },
  totalNodes: 1,
};

type actionType = { type: "ADD_NODE"; payload: { id: number; alignment: AlignmentType } };

function appReducer(state: AppStateType, action: actionType) {
  switch (action.type) {
    case "ADD_NODE": {
      const { id, alignment } = action.payload;
      const { node, totalNodes } = state;
      const color = generateColor();
      const newNode = addNode({ node, id, alignment, color, totalNodes });
      return { ...state, node: newNode, totalNodes: totalNodes + 2 };
    }
  }
}

export const AppContext = createContext<{ state: AppStateType; dispatch: Dispatch<actionType> } | null>(null);

export function AppProvider({ children }: WrapperType) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
