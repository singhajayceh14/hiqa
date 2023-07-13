import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { KEYPAIR } from '@/types/interfaces';
import { useCommonReducer } from '@/components/App/reducer';
import { validateAuthentication, getDecodedToken } from '@/utils/helpers';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface CONTEXTVALUE {
  state: any;
  dispatch: React.Dispatch<KEYPAIR>;
}
const AppContext = React.createContext<CONTEXTVALUE | null>(null);
export const ContainerContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const { state, dispatch } = useCommonReducer({
    profileDetail: {},

    show: false,
  });

  const value: CONTEXTVALUE = {
    state,
    dispatch,
  };

  // useEffect(() => {
  //   if (!validateAuthentication()) router.push('/login');
  //   const { decoded, isValid } = getDecodedToken();
  //   if (isValid) {
  //     dispatch({ profileDetail: decoded });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router.asPath]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useContainerContext() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
