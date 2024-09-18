import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  type: undefined
};

export const typeContext = createContext(INITIAL_STATE);

const typeReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const TypeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(typeReducer, INITIAL_STATE);
  return (
    <typeContext.Provider
      value={{
        type: state.type,
        dispatch,
      }}
    >
      {children}
    </typeContext.Provider>
  );
};
