import { api } from '@/utils/axiosInterceptor';
import { ACTION } from '@/types/interfaces';
import { handleErrors, toastr } from '@/utils/helpers';

/* Get Address */

//eslint-disable-next-line no-unused-vars
export async function getAddresses(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api('/v1/api/address-manager/address-list', 'POST', { data: payload });
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Create Fleet  User Address */
export async function addAddress(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api('/v1/api/address-manager/add-address', 'POST', { data: payload });
  if (res.status) {
    toastr('Address Successfully Added', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return await handleErrors(res.errors);
  }
}

/* Get Address Detail User */
export async function getAddressDetail(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`/v1/api/address-manager/address-detail/${payload?._id}`);
  if (res.status) {
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Update Fleet  User Address */
export async function updateAddress(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`/v1/api/address-manager/update-address/${payload?._id}`, 'POST', {
    data: payload,
  });
  if (res.status) {
    toastr('Address Successfully Updated', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}

/* Remove Fleet  User Address */
export async function removeAddress(action: ACTION): Promise<unknown> {
  const { payload } = action;
  const res: ReturnType<any> = await api(`/v1/api/address-manager/remove-address/${payload?._id}`, 'DELETE');
  if (res.status) {
    toastr('Address Successfully Removed', 'success');
    return res;
  } else {
    // Handle Errors
    if (res.errors) return handleErrors(res.errors);
  }
}
