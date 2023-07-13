import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, toastr } from '@/utils/helpers';
const API_URL =  process.env.BACKEND_API_URL + 'settings/'
/* Get Error Logs */
//eslint-disable-next-line no-unused-vars
export async function getSettingsDetail(): Promise<unknown> {
  // const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}detail`);
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Update User Profile Data */
export async function updateSettingsDetail(action: ACTION): Promise<unknown> {
  const { payload } = action;

  const res: ReturnType<any> = await api(`${API_URL}update`, 'POST', {
    data: payload,
  });
  if (res.status) {
    toastr('Settings Updated Successfully', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
