import React, { memo, useEffect, useState } from 'react';

type Props = {
  children: JSX.Element | string | JSX.Element[];
  auth?: boolean;
  meta: {
    title: string;
    description: string;
  };
};
function FreeContainer({ children, auth }: Props) {
  return <>{children}</>;
}

export default memo(FreeContainer);
