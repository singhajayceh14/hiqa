import React, { useCallback, useEffect } from 'react';

import styles from '@/styles/Components/Dashboard/APIService.module.scss';
import { SuspenseLoader } from '@/components/App/Loader';
import { useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import { useCommonReducer } from '@/components/App/reducer';
import { formatDate } from '@/utils/helpers';

function APIServiceStatus() {
  const { request, loading } = useRequest();
  const { state, dispatch } = useCommonReducer();

  const getLastCronStatus = useCallback(async () => {
    const req = (await request('dashboardCronListLog')) as REQUEST;
    if (req?.status) {
      dispatch({ cron: req.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getLastCronStatus();
  }, [getLastCronStatus]);

  return state?.cron?.status === 'failed' ? (
    <div className={styles.warningActivity}>
      <div>
        {loading?.dashboardCronListLog_LOADING ? (
          <SuspenseLoader color={'#002e6e'} />
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div className={`d-flex ${styles.warningHead}`}>
              <i className="fa fa-warning"></i>
              <h3>{`Warning: Job Failure`}</h3>
            </div>
            <div>
              {state?.cron?.data && state?.cron?.data.lastRunAt ? (
                <>
                  <h3>Nightly Session - Clipboard to Engage {formatDate(state?.cron.data.lastRunAt)}</h3>
                </>
              ) : (
                ''
              )}
            </div>

            <div className={styles.errorReason}>
              <p>Reason - Could not connect to engage </p>
              <p>Please fix this issue and mannually retry process in scheduler</p>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
}

export default APIServiceStatus;
