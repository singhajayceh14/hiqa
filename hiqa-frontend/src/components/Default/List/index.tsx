// eslint-disable react-hooks/exhaustive-deps /
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { CSSProperties } from 'styled-components';

interface PROPS {
  onReachEnd?: () => void;
  direction?: 'horizontal' | 'vertical';
  children: JSX.Element | JSX.Element[] | any;
  style?: CSSProperties;
  onEndReachedThreshold?: number;
}

function List(props: PROPS) {
  const { direction = 'vertical', onReachEnd, onEndReachedThreshold = 10 } = props;
  const scrollContainerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const scrollContainer: HTMLDivElement | any = scrollContainerRef.current;
    // Check if the user has scrolled to the end of the container
    if (direction === 'vertical') {
      if (
        scrollContainer.scrollHeight - scrollContainer.scrollTop <=
        scrollContainer.clientHeight + onEndReachedThreshold
      ) {
        onReachEnd && onReachEnd();
      }
    } else {
      if (
        scrollContainer.scrollWidth - scrollContainer.scrollLeft <=
        scrollContainer.clientWidth + onEndReachedThreshold
      ) {
        onReachEnd && onReachEnd();
      }
    }
  }, [onReachEnd, scrollContainerRef, onEndReachedThreshold]);

  useEffect(() => {
    const scrollContainer: HTMLDivElement | any = scrollContainerRef?.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, scrollContainerRef]);

  const style: CSSProperties = useMemo(() => {
    const verticalStyle: CSSProperties = {
      overflowY: 'scroll',
    };

    const horizontalStyle: CSSProperties = {
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
    };

    return direction === 'horizontal' ? horizontalStyle : verticalStyle;
  }, [direction]);

  return (
    <div ref={scrollContainerRef} style={{ ...style, ...(props.style ?? {}) }}>
      {props.children}
    </div>
  );
}

export default memo(List);
