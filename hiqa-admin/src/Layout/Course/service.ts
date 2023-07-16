import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, toastr } from '@/utils/helpers';
const API_URL = process.env.BACKEND_API_URL + 'course/';
/* Get Course */

//eslint-disable-next-line no-unused-vars
export async function getCourse(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}list`, 'POST', { data: payload });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Create  Course */
export async function addCourse(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}add`, 'POST', {
    data: payload,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res.status) {
    toastr('Course Successfully Added', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return await handleErrors(res.errors);
  }
}

/* Get Course Details*/
export async function getCourseDetail(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}detail/${payload?.id}`);
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Update Course */
export async function updateCourse(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}update`, 'POST', {
    data: payload,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res.status) {
    toastr('Course Successfully Updated', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Remove Course */
export async function removeCourse(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`${API_URL}remove/${payload?.id}`, 'DELETE');
  if (res.status) {
    toastr('Course Successfully Removed', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
