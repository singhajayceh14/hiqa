import React, { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { formatDate } from '@/utils/helpers';

const columns = [
  {
    dataField: 'time',
    text: 'DATE/Time',
  },
  {
    dataField: 'category',
    text: 'Request',
  },
  {
    dataField: 'error',
    text: 'Error',
  },
];

interface LOG {
  id: string;
  user: string;
  time: Date;
  payload: unknown;
  category: string;
  hitsRetried: string;
  status: number;
  error: unknown;
}
function Index() {
  const { state: globalState } = useContainerContext();

  const cronList = useMemo(
    () =>
      globalState?.dashboardErrorLogsLast5?.logs
        ? globalState?.dashboardErrorLogsLast5?.logs.map((log: LOG) => ({
            id: log.id,
            time: formatDate(log.time),
            category: log.category,
            error: log.error || '',
          }))
        : [],
    [globalState?.dashboardErrorLogsLast5?.logs],
  );

  return (
    <div className={`cmnTable`}>
      <h3>
        <i className="fa fa-circle-exclamation"></i>
        {'Last 5 Errors'}
      </h3>
      <DefaultTable
        api={{
          url: 'dashboardErrorLogsLast5',
        }}
        search={false}
        columns={columns}
        data={cronList}
        pagination={false}
        title="Error Log Activity"
      />
      <div className="float-end p-2">
        <Link href="/errorlog">
          <Button className="customBtnSm">More</Button>
        </Link>
      </div>
    </div>
  );
}

export default Index;
