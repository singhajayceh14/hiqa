import React, { memo, useCallback, useMemo } from 'react';
import Pagination from 'react-responsive-pagination';

import LoadStatusList from '@/components/Default/LoadStatusList';
import styles from '@/styles/Components/Default/Pagination.module.scss';

interface data {
  [field: string]: JSX.Element | JSX.Element[] | string | number | boolean;
}
interface Props {
  state: Array<data> | any;
  records: data[];
  dispatch: any;
  onPageChange: () => Array<data>;
}
interface SizePerPageList {
  text: string;
  value: number;
}
interface PaginationOption {
  totalSize: number;
  paginationSize: number;
  showTotal: boolean;
  sizePerPage: number;
  hidePageListOnlyOnePage: boolean;
  sizePerPageList: SizePerPageList[];
}

// const range = (min: number, max: number): number[] => Array.from({ length: max - min + 1 }, (_, i) => min + i);

function Index(props: Props) {
  const { state, dispatch, records } = props;
  const sizePerPage = 5;
  const pagination_options: PaginationOption = {
    totalSize: state?.result?.length,
    paginationSize: 4,
    showTotal: false,
    sizePerPage: sizePerPage,
    hidePageListOnlyOnePage: true,
    sizePerPageList: [
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: '25',
        value: 25,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: '100',
        value: 100,
      },
    ],
  };
  const lastPage = useMemo(
    () => Math.ceil(state.totalSize ? state.totalSize / state.limit : state.result?.length / state.limit),
    [state],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onPageChange = useCallback(
    (page: number | string) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          currentPage: page,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, records],
  );

  const onChangeRecordPerPage = useCallback(
    (limit: number) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          limit: limit,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );
  if (!records) return <div></div>;
  else
    return (
      <div className="paginationOuter">
        {(state.totalSize || state.result) && (
          <LoadStatusList
            label={
              <div className={styles.loadStatusListLabel}>
                {state.limit} <i className="fa fa-caret-down"></i>
              </div>
            }
            position={'absolute'}
            rightSide={'unset'}
            items={pagination_options.sizePerPageList.map(mp => mp.text)}
            selectValue={state?.limit}
            onItemClick={(limit: string) => onChangeRecordPerPage(+limit as number)}
          />
        )}
        <Pagination maxWidth={100} onPageChange={onPageChange} total={lastPage} current={state.currentPage} />
      </div>
    );
}

export default memo(Index);
