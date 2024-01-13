import { Dispatch, createContext, useReducer } from 'react';
import { AlignmentType, NodeType, WrapperType } from '../utils/types';
import { addNode, deleteNode, generateColor } from '../utils/helper';

type AppStateType = {
  node: NodeType;
  totalNodes: number;
  lastNodeId: number;
};

const initialState: AppStateType = {
  node: { id: 1, color: '#faebd7', children: [], alignment: 'horizontal' },
  totalNodes: 1,
  lastNodeId: 1,
};

type actionType =
  | { type: 'ADD_NODE'; payload: { id: number; alignment: AlignmentType } }
  | { type: 'DELETE_NODE'; payload: { id: number } };

function appReducer(state: AppStateType, action: actionType) {
  switch (action.type) {
    case 'ADD_NODE': {
      const { id, alignment } = action.payload;
      const { node, totalNodes, lastNodeId } = state;
      const color = generateColor();
      const newNode = addNode({ node, id, alignment, color, lastNodeId });
      return {
        ...state,
        node: newNode,
        totalNodes: totalNodes + 2,
        lastNodeId: lastNodeId + 2,
      };
    }
    case 'DELETE_NODE': {
      const { id } = action.payload;
      const { node, totalNodes } = state;
      const updatedNode = deleteNode(node, id);
      return { ...state, node: updatedNode, totalNodes: totalNodes - 2 };
    }
  }
}

export const AppContext = createContext<{
  state: AppStateType;
  dispatch: Dispatch<actionType>;
} | null>(null);

export function AppProvider({ children }: WrapperType) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
