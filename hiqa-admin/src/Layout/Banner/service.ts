import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, toastr } from '@/utils/helpers';
const API_URL = process.env.BACKEND_API_URL + 'banners/';
/* Get Banner */

//eslint-disable-next-line no-unused-vars
export async function getBanner(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}list`, 'POST', { data: payload });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Create  Banner */
export async function addBanner(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}add`, 'POST', {
    data: payload,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res.status) {
    toastr('Banner Successfully Added', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return await handleErrors(res.errors);
  }
}

/* Get Banner Details*/
export async function getBannerDetail(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}detail/${payload?.id}`);
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Update Banner */
export async function updateBanner(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}update`, 'POST', {
    data: payload,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res.status) {
    toastr('Banner Successfully Updated', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Remove Banner */
export async function removeBanner(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}remove/${payload?.id}`, 'DELETE');
  if (res.status) {
    toastr('Banner Successfully Removed', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
