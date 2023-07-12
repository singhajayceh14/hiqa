import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, toastr } from '@/utils/helpers';
const API_URL =  process.env.BACKEND_API_URL + 'user/'
/* Get User */

//eslint-disable-next-line no-unused-vars
export async function getUser(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}list`, 'POST', { data: payload });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Create  User */
export async function addUser(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}add`, 'POST', { data: payload });
  if (res.status) {
    toastr('User Successfully Added', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return await handleErrors(res.errors);
  }
}

/* Get User Details*/
export async function getUserDetail(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}detail/${payload?.id}`);
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Update User */
export async function updateUser(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}update/${payload?.id}`, 'POST', {
    data: payload,
  });
  if (res.status) {
    toastr('User Successfully Updated', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Remove User */
export async function removeUser(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}remove/${payload?.id}`, 'DELETE');
  if (res.status) {
    toastr('User Successfully Removed', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
