import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, setHeader, toastr } from '@/utils/helpers';
// import { registerService } from '@/store/services';

/* Login User */
export async function LoginUser(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api('/v1/api/auth/login', 'POST', { data: payload });
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
  const res: ReturnType<any> = await api('/v1/api/auth/logout');
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
