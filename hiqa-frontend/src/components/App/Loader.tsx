import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ThreeDots, Bars } from 'react-loader-spinner';
import Spinner from 'react-bootstrap/Spinner';

interface PROPS {
  color?: string;
}
function ButtonLoader(props?: PROPS) {
  return (
    <div className="d-flex justify-content-center">
      <ThreeDots
        height="30"
        width="30"
        color={props?.color || '#FFFFFF'}
        ariaLabel="three-circles-rotating"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export function BarLoader(props?: PROPS) {
  return (
    <div className="d-flex justify-content-center">
      <Bars
        height="30"
        width="30"
        color={props?.color || '#FFFFFF'}
        ariaLabel="three-circles-rotating"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export function SuspenseLoader(props?: PROPS) {
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: '5%' }}>
      <ThreeDots
        height="30"
        width="50"
        color={props?.color || '#FFFFFF'}
        ariaLabel="three-circles-rotating"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export function SimpleLoader() {
  return (
    <div className="preloader">
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
export const useLoading = () => {
  return { ButtonLoader, SimpleLoader };
};

export function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });
  return loading ? (
    <div className="mainLoader">
      <div className="d-flex justify-content-center" style={{ marginTop: '25%' }}>
        <ThreeDots
          height="30"
          width="50"
          color={'#002e6e'}
          ariaLabel="three-circles-rotating"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  ) : null;
}
