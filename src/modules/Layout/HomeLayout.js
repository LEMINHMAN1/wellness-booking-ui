import React, { useReducer, useState } from 'react';
import globalReducer from '../../reducers';

export const GlobalStateContext = React.createContext([{}, () => { }]);

const HomeLayout = ({ children }) => {

  const [globalState, dispatch] = useReducer(globalReducer, {});

  return (
    <GlobalStateContext.Provider value={[globalState, dispatch]}>
          {children}
    </GlobalStateContext.Provider>
  );
}

export default HomeLayout;
