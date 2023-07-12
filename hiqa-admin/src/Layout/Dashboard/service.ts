import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors } from '@/utils/helpers';

/* Get Error Logs */
//eslint-disable-next-line no-unused-vars
export async function dashboardCronListLog(): Promise<unknown> {
  // const { payload } = action;
  const res: ReturnType<any> = await api('/v1/api/cron-manager/lastCronStatus');
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

export async function dashbordResyncCron(): Promise<unknown> {
  const res: ReturnType<any> = await api('/v1/api/cron-manager/resyncAllCrons');
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

export async function dashboardLoginActivityLast5(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api('/v1/api/logs-manager/activitylogs-list?limit=5', 'POST', { data: payload });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

export async function dashboardErrorLogsLast5(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api('/v1/api/logs-manager/errorlogs-list?limit=5', 'POST', { data: payload });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
