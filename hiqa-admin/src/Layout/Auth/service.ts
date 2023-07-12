import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, setHeader, toastr } from '@/utils/helpers';
// import { registerService } from '@/store/services';
const API_URL =  process.env.BACKEND_API_URL + 'auth/'
/* Login User */
export async function LoginUser(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}login`, 'POST', { data: payload });
  if (res.status) {
    if (res?.data?.token) {
      toastr('Login Successful', 'success');
      setHeader(res.data.token, 'token');
    }
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

export async function logoutUser(): Promise<unknown> {
  const res: ReturnType<any> = await api(`${API_URL}logout`);
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
