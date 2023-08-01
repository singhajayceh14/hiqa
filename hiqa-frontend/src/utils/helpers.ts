import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import router from 'next/router';
import * as Yup from 'yup';

import { HANDLE_ERRORS } from '@/types/interfaces';

export const setAuthToken = (token: string | boolean) => {
  if (typeof token == 'string') {
    Cookies.set('token', token);
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const setHeader = (token: string | boolean, tokenName: string) => {
  if (typeof token == 'string') {
    Cookies.set(tokenName, token);
    axios.defaults.headers.common[tokenName] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const toastr = (title: string, icon: any) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    timerProgressBar: true,
    focusCancel: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon,
    title: title,
    timer: 3000,
    timerProgressBar: true,
    heightAuto: true,
    grow: 'row',
  });
};
export const confirmDialog = (title: string) => {
  return new Promise(resolve => {
    Swal.fire({
      title: '',
      text: title,
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#002e6e',
      // denyButtonText: `Don't save`,
    })
      .then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          resolve(true);
          // Swal.fire('Saved!', '', 'success');
        } else if (result.isDenied) {
          resolve(false);
          // Swal.fire('Changes are not saved', '', 'info');
        } else {
          resolve(false);
        }
      })
      .catch(() => resolve(false));
  });
};

export const confirmSweetRequest = (title: string) => {
  return new Promise(resolve => {
    Swal.fire({
      title: title,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#3299cc',
      showLoaderOnConfirm: true,
      preConfirm: response => {
        return resolve(response);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then(result => {
        if (result.isConfirmed) {
          resolve(true);
          // Swal.fire('Saved!', '', 'success');
        } else if (result.isDenied) {
          resolve(false);
          // Swal.fire('Changes are not saved', '', 'info');
        } else {
          resolve(false);
        }
      })
      .catch(() => resolve(false));
  });
};

export const showSweetProcessing = () => {
  return new Promise(resolve => {
    Swal.fire({
      title: 'Processing...',
      html: '',
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton() as HTMLButtonElement);
      },
    });
    resolve(Swal);
  });
};

export const UploadFileSchema = () => {
  const FILE_SIZE = 1000;
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  return Yup.mixed()
    .test('fileSize', 'File Size is too large', value => value.size <= FILE_SIZE)
    .test('fileType', 'Unsupported File Format', value => SUPPORTED_FORMATS.includes(value.type));
};
export const capitalize = (title: string) => (title ? title.charAt(0).toUpperCase() + title.slice(1) : '');

export const trimAndLower = (data: string) => data.toLowerCase().trim();
export const handleErrors = (errors: HANDLE_ERRORS) => {
  let msg = '';
  if (errors) {
    if (typeof errors == 'object' && Object.keys(errors)?.length) {
      Object.entries(errors).map(([, value]) => {
        msg += value + '\n';
      });
    } else {
      if (typeof errors == 'string') {
        msg = errors;
        if (msg === 'Invalid auth token') {
          logout();
        }
      }
    }
  }
  toastr(msg, 'error');
};

export const formatDate = (date: string | Date, type?: string) => {
  if (!date) return '';
  if (!moment(date).isValid()) return '';
  if (type == 'custom') {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    date = new Date(date);
    return `<strong>${date.getDate()}</strong> ${month[date.getMonth()]}, ${date.getFullYear()}`;
  } else {
    date = new Date(date);
    date = date.toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
    return moment(date).format(type || 'DD/MM/YYYY hh:mm:ss a');
  }
};

export const getPDFFromBuffer = (bufferArray: number[], filename?: string) => {
  try {
    const blob = new Blob([new Uint8Array(bufferArray).buffer], { type: 'application/pdf' });
    // const win = window.open('', '_blank');
    // const URL = window.URL || window.webkitURL;
    // const dataUrl = URL.createObjectURL(blob);
    // if (win) win.location = dataUrl;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    if (link.download !== undefined) {
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      link.setAttribute('title', filename || 'Order Confirmation PDF');
      // link.setAttribute('download', filename || 'Order Confirmation PDF');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.log('Blob Error', error);
  }
};
export const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line no-useless-escape
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
export const logout = () => {
  console.log('LogOut');
  setAuthToken(false);
  setHeader(false,'');
  Cookies.remove('token');
  Cookies.remove('rememberme');
  router.push('/login');
  // window.location.href = '/';
};

export const validateAuthentication = () => {
  const jwtDecodedToken = Cookies.get('token') as undefined | string;
  if (jwtDecodedToken) {
    // Non Null Assertion ! will remove undefined and null from a type without doing any explicit type checking
    try {
      const decoded: any = jwt_decode(jwtDecodedToken as string);
      console.log(decoded);
      const currentTime = Date.now() / 1000;
      if (decoded && decoded.exp < currentTime) {
        logout();
        return false;
      }
      return true;
    } catch (error) {
      logout();
      return false;
    }
  } else {
    logout();
    return false;
  }
};

export const getDecodedToken = () => {
  const jwtDecodedToken = Cookies.get('token') as undefined | string;
  if (jwtDecodedToken) {
    // Non Null Assertion ! will remove undefined and null from a type without doing any explicit type checking
    const decoded: any = jwt_decode(jwtDecodedToken as string);

    return { decoded, isValid: true };
  } else {
    return { isValid: false };
  }
};
