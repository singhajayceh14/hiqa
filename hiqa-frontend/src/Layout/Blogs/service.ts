import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, toastr } from '@/utils/helpers';
const API_URL =  process.env.BACKEND_API_URL + 'home/'
/* Get Front Page */

//eslint-disable-next-line no-unused-vars
export async function getBlogPage(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}get-list/blog`, 'POST', {data:payload});
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

