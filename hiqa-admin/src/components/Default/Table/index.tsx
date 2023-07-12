import React, { useCallback, useReducer, useEffect, memo, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

import { useRequest, useLoading } from '@/components/App';
import { useContainerContext } from '@/Layout/Container/context';
import { KEYPAIR } from '@/types/interfaces';

import { reducer, initialState } from './reducer';

const Pagination = React.lazy(() => import('./Components/Pagination'));
interface column {
  dataField: string;
  text: string | JSX.Element;
  hidden?: boolean;
  sort?: boolean;
  value?: string;
  search?: boolean;
}
interface data {
  [field: string]: JSX.Element | JSX.Element[] | string | number | boolean;
}
interface Props {
  columns: Array<column>;
  data: Array<data>;
  api?: {
    model?: string;
    url: string;
    body?: {
      [key: string]: unknown;
    };
    isAPILoading?: (loading: boolean) => void;
  };
  title: string;
  page?: number;
  url?: string;
  loading?: boolean;
  pagination?: boolean;
  search?: boolean;
  stopApiCall?: boolean;
  options?: {
    expandRow?: {
      renderer: () => JSX.Element;
    };
  };
}
interface RESPONSE_DATATABLE {
  status: boolean;
  data?: {
    [key: string]: unknown;
    result?: data[];
    total?: number | string;
    limit?: number | string;
    page?: number | string;
    pages?: number | string;
    skip?: number | string;
  };
}
function Index(props: Props) {
  const { request, loading } = useRequest();
  const { dispatch: globalDispatch } = useContainerContext();
  const { SimpleLoader } = useLoading();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { columns, data } = props;

  const [search, setSearch] = useState(false);

  const NoDataIndication = () => (
    <tr>
      <td className="text-center" colSpan={columns?.length || 1}>
        {loading?.[`${props?.api?.url}_LOADING`] ? <SimpleLoader /> : 'No Data Found'}
      </td>
    </tr>
  );

  const filterDatatable = useCallback(() => {
    const filterData = data;
    if (!props?.api?.url) {
      const start = state.currentPage * state.limit - state.limit;
      const end = start + state.limit;
      const paginatedData = filterData?.slice(start, end);
      return paginatedData;
    }
    return filterData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, state]);

  useEffect(() => {
    filterDatatable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDatatable]);

  const fetchAPIResult = useCallback(async () => {
    if (props?.api?.url) {
      // Don't call API is this params is true
      if (props?.stopApiCall) return;
      if (props?.loading) return;
      const payload = {
        page: state.currentPage,
        limit: state.limit,
        sortBy: state.sortBy,
        pathname: props.api.url,
      } as KEYPAIR;
      if (state.searchKeyword) {
        payload['keyword'] = state.searchKeyword;
      }
      if (props?.api?.body) {
        payload['filter'] = props?.api?.body;
      }

      const res = (await request(props?.api?.url, payload)) as RESPONSE_DATATABLE;
      if (res?.status && res.data !== undefined) {
        const total = Number(res.data?.total);
        const lastPage: number = +Math.ceil(total / state.limit);
        const paginationSize = 4;
        dispatch({
          type: 'SET_DATA',
          data: {
            ...state,
            endPage:
              state.endPage && state.endPage > 1
                ? state.endPage
                : (lastPage > paginationSize ? paginationSize : lastPage) || 1,
            totalSize: total,
            result: data,
          },
        });
        globalDispatch({
          [payload.pathname as string]: res.data,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPage, state.limit, props?.loading, state.searchKeyword, state.sortBy, props?.stopApiCall]);

  const searchDatatable = useCallback((event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
      dispatch({
      type: 'SET_DATA',
      data: {
        ...state,
        searchKeyword: value,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortBy = useCallback(
    (sortField: string) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          sortBy: state.sortBy === sortField + '_desc' ? sortField + '_asc' : sortField + '_desc',
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.sortBy],
  );

  useEffect(() => {
    if (!props?.api?.url) {
      const lastPage = Math.ceil(data?.length / state.limit);
      const paginationSize = 4;
      dispatch({
        type: 'SET_DATA',
        data: {
          ...state,
          result: data,
          endPage: lastPage > paginationSize ? paginationSize : lastPage,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.searchKeyword) {
      const timer = setTimeout(() => {
        fetchAPIResult();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    } else {
      if (!props.loading && props?.api?.url) {
        const timer = setTimeout(() => {
          fetchAPIResult();
        }, 500);

        return () => {
          clearTimeout(timer);
        };
      } else {
        fetchAPIResult();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAPIResult]);

  useEffect(() => {
    if (props?.api?.isAPILoading) {
      props?.api?.isAPILoading(loading?.[`${props?.api?.url}_LOADING`] as boolean);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading?.[`${props?.api?.url}_LOADING`]]);

  return (
    <div>
      <div className="hdSearchOuter">
        <h3></h3>
        {(props?.search === undefined || props?.search) === true && (
          <div className="serachBlock">
            {!search ? (
              <Button onClick={() => setSearch(!search)} className="srchIcon">
                <img src="/assets/images/search-icon.svg" alt="search" />
              </Button>
            ) : (
              ''
            )}
            <div className={search ? 'serachBox open' : 'serachBox'}>
              <Form.Control type="text" onChange={searchDatatable} placeholder="Search" className="srchInput" />
              <button className="srchBtn" onClick={() => setSearch(!search)}>
                Search
              </button>
            </div>
          </div>
        )}
      </div>
      <Table responsive borderless>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th style={{ display: col.hidden ? 'none' : '' }} key={i}>
                {col.text}
                {typeof col.text === 'string' &&
                  col.dataField !== 'action' &&
                  (col?.sort === undefined || col?.sort === true) && (
                    <span role="button" onClick={() => sortBy(col.dataField)} style={{ marginLeft: '2px' }}>
                      <i
                        className={`fa fa-arrow-${state.sortBy === col.dataField + '_desc' ? 'down' : 'up'}`}
                        style={{ color: state.sortBy.includes(col.dataField) ? '#3299cc' : '#a6b1c2' }}
                      ></i>
                    </span>
                  )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length && !loading?.[`${props?.api?.url}_LOADING`] ? (
            filterDatatable().map((row: data, i: number) => (
              <tr key={i}>
                {columns.map((col, j) => (
                  <td
                    data-label={typeof col.text === 'string' ? col.text : ''}
                    style={{ display: col.hidden ? 'none' : '' }}
                    key={i + '_' + j}
                  >
                    {row[col.dataField]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <NoDataIndication />
          )}
        </tbody>
      </Table>
      {(props?.pagination === undefined || props?.pagination) && (
        <Pagination records={data} state={state} dispatch={dispatch} onPageChange={filterDatatable} />
      )}
    </div>
  );
}

export default memo(Index);
