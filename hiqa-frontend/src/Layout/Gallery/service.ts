import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors } from '@/utils/helpers';
const API_URL = process.env.BACKEND_API_URL + 'home/';
/* Get Front Page */

//eslint-disable-next-line no-unused-vars
export async function getGallery(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}get-gallery`, 'GET');
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
