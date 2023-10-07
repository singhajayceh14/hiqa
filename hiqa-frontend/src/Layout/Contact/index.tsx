import React, { memo, useMemo } from 'react';

import { useApp } from '@/components/App';

import TouchPage from './Components/TouchPage';
import MapPage from './Components/MapPage';
import ContactForm from './Components/ContactForm';

function Index() {
  const { state } = useApp();

  const touch = useMemo(() => <TouchPage personalData={state?.setting_data ?? {}} />, [state?.setting_data]);
  const map = useMemo(() => <MapPage personalData={state?.setting_data ?? {}} />, [state?.setting_data]);

  return (
    <>
      {touch}
      {map}
      <ContactForm />
    </>
  );
}

// Index.auth = false;
export default memo(Index);
