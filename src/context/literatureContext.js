import React from 'react';
import { createContext, useReducer } from 'react';

export const LiteratureContext = createContext();

const initialState = {
  literatures: [],
  loading: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_LITERATURES_PENDING':
      return {
        ...state,
        loading: true,
        error: '',
      };
    case 'FETCH_LITERATURES_SUCCESS':
      return {
        ...state,
        literatures: action.payload,
        loading: false,
        error: '',
      };
    case 'FETCH_LITERATURES_FAILED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      throw new Error();
  }
};

export const LiteratureContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LiteratureContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LiteratureContext.Provider>
  );
};
