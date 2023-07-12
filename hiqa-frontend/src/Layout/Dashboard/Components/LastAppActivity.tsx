import React, { useMemo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import DefaultTable from '@/components/Default/Table';
import Modal from '@/components/Default/Modal';
import Popover from '@/components/Default/Popover';
import { useContainerContext } from '@/Layout/Container/context';
import { useCommonReducer } from '@/components/App/reducer';
import { formatDate } from '@/utils/helpers';

const columns = [
  {
    dataField: 'activityStartTime',
    text: 'Start Date/Time',
  },
  {
    dataField: 'user',
    text: 'User',
  },
  {
    dataField: 'startTime',
    text: 'Data Start Point',
  },

  {
    dataField: 'endTime',
    text: 'Data End Point',
  },

  {
    dataField: 'status',
    text: 'Status',
  },

  {
    dataField: 'action',
    text: '',
  },
];

function Index() {
  const { state: globalState } = useContainerContext();
  const { state, dispatch } = useCommonReducer();
  const cronList = useMemo(
    () =>
      globalState?.dashboardLoginActivityLast5?.logs
        ? globalState?.dashboardLoginActivityLast5?.logs.map((log: any) => ({
            activityStartTime: formatDate(log.activityStartTime),
            user: log.user,
            startTime: formatDate(log.startTime),
            endTime: log.endTime ? formatDate(log.endTime) : 'Processing...',
            status: <span className="text-uppercase">{log.status}</span>,
            action: (
              <>
                {log.status && log.status !== 'success' ? (
                  <>
                    <Button
                      style={{
                        height: '30px',
                        lineHeight: '30px',
                        fontSize: '10px',
                        border: 'none',
                        background: log.status === 'failed' ? 'red' : '#002e6e',
                      }}
                      onClick={() => {
                        openLogModal(log.errors);
                      }}
                      size="sm"
                      className="customBtn"
                    >
                      {log.status === 'success with errors'
                        ? 'View Error Log'
                        : log.status === 'failed'
                        ? 'Job Failed'
                        : ''}
                    </Button>
                    {log.status === 'failed' && (
                      <Popover
                        header="This job failed"
                        label={
                          <i style={{ color: '#002e6e' }} role="button" className="fa fa-circle-exclamation p-2"></i>
                        }
                      >
                        <p>
                          We could not connect to clipboard or Engage to complete this job. Please check both systems
                          then mannually run the process from the scheduler section
                        </p>
                      </Popover>
                    )}
                  </>
                ) : null}
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.dashboardLoginActivityLast5?.logs],
  );

  const openLogModal = (logErrors: string[]) => {
    dispatch({ viewLogModal: true, logErrors: logErrors });
  };
  const closeModal = (key: string) => {
    dispatch({ [key]: false, logDetail: null, cronsetTime: null, crondisplay: null });
  };
  return (
    <div className={`cmnTable`}>
      <h3>
        <i className="fa fa-list-check"></i>
        {'Last 5 Activities'}
      </h3>
      <DefaultTable
        api={{
          url: 'dashboardLoginActivityLast5',
        }}
        search={false}
        columns={columns}
        data={cronList}
        pagination={false}
        title="Log Activity"
      />
      <div className="float-end p-2">
        <Link href="/activities">
          <Button className="customBtnSm">More</Button>
        </Link>
      </div>
      <Modal
        id={'LastAppActivity' + '_modal'}
        title={'Success with errors'}
        width="55%"
        show={state.viewLogModal}
        onClose={() => closeModal('viewLogModal')}
      >
        <div className="container">
          <ListGroup as="ol" numbered className="d-flex justify-content-between align-items-start">
            {state?.logErrors?.map((log: string, index: number) => (
              <ListGroup.Item key={index}>{log}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Modal>
    </div>
  );
}

export default Index;
