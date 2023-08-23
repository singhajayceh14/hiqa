import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors } from '@/utils/helpers';
const AUTH_API_URL = process.env.BACKEND_API_URL + 'auth/';
const HOME_API_URL = process.env.BACKEND_API_URL + 'home/';

/* Get Error Logs */
//eslint-disable-next-line no-unused-vars
export async function register(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${AUTH_API_URL}register`, 'POST', {
    data: payload,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

export async function courseList(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${HOME_API_URL}course-list`, 'POST', {
    data: payload,
  });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

export async function docUpload(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${HOME_API_URL}doc-uploads`, 'POST', {
    data: payload,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

export async function razorpayOrders(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${HOME_API_URL}razorpay-orders`, 'POST', { data: payload });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
