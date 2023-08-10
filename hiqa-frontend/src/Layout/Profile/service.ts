import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, toastr } from '@/utils/helpers';
const AUTH_API_URL = process.env.BACKEND_API_URL + 'auth/';
/* Get Error Logs */
//eslint-disable-next-line no-unused-vars
export async function getProfileUserDetail(): Promise<unknown> {
  // const { payload } = action;
  const res: ReturnType<any> = await api('/v1/api/user-manager/get-user-detail');
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Update User Profile Data */
export async function updateUser(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${AUTH_API_URL}update-user`, 'POST', {
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

/* Update Change Password */
export async function CHANGE_PASSWORD(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${AUTH_API_URL}change-password`, 'POST', {
    data: payload,
  });

  if (res.status) {
    toastr(res.message, 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
