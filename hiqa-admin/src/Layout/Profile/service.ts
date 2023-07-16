import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, toastr } from '@/utils/helpers';
const API_URL = process.env.BACKEND_API_URL + 'auth/';
/* Get Error Logs */
//eslint-disable-next-line no-unused-vars
export async function getProfileUserDetail(): Promise<unknown> {
  // const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}user-details`);
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Update User Profile Data */
export async function updateProfileUserDetail(action: ACTION): Promise<unknown> {
  const { payload } = action;

  const res: ReturnType<any> = await api(`${API_URL}update-user-details`, 'POST', {
    data: payload,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res.status) {
    toastr('Profile Updated Successfully', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
