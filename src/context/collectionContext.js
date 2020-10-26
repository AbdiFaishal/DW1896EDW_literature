import React, { createContext, useReducer } from 'react';

export const CollectionContext = createContext();

const initialState = {
  collections: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_COLLECTIONS':
      return {
        ...state,
        collections: action.payload,
      };
    case 'EMPTY_COLLECTIONS':
      return {
        ...state,
        collections: [],
      };
    default:
      return state;
  }
};

export const CollectionContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CollectionContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CollectionContext.Provider>
  );
};
