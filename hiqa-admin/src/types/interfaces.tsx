export interface IETarget {
  event: MouseEvent;
}

export interface KEYPAIR {
  [key: string]: unknown;
}

export interface DATATABLE_COLUMN {
  dataField: string;
  text: string;
  hidden?: boolean;
  value?: string;
  search?: boolean;
}
export interface DATATABLE_ROWS {
  [field: string]: JSX.Element | JSX.Element[] | string | number | boolean;
}

export interface ACTION {
  payload?: {
    [key: string]: unknown;
  };
  model?: string;
}
export interface REQUEST {
  status: boolean;
  data?: unknown;
  errros?: unknown;
}

export interface PAYLOAD {
  data?: unknown;
}
export type RESPONSE = {
  success: boolean;
  data?: unknown;
  errors?: unknown;
};
export interface HANDLE_ERRORS {
  [key: string]: string[];
}
export interface REGISTER {
  (action: ACTION): unknown;
}

// Address List Add Interface
export interface ADDRESS {
  [key: string]: unknown;
  geoPoint?: {
    coordinates: number[];
  };
}

export interface Address {
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  buildingNo?: string;
  streetAddress?: string;
  tag: string;
  name?: string;
  phone?: string;
}

export interface FullAddress extends Address {
  geoPoint?: {
    coordinates: number[];
  };
}

export interface ADDRESSES extends Address {
  _id: string;
  tag: string;
  action?: JSX.Element;
  location?: string;
  fullAddress?: FullAddress;
  isDefault?: boolean;
}

export interface ADDRESS_PROPS {
  [key: string]: unknown;
  component?: (data: { [key: string]: unknown }) => void;
  state?: {
    [key: string]: ADDRESS;
  };
  edit?: boolean;
}


// user List Add Interface
export interface USER  {
  id: string;
  name: string;
  action?: JSX.Element;
  email?: string;
  status?: boolean;
  mobile_number?: string;
  image?: string;
}

export interface USER_PROPS {
  [key: string]: unknown;
  component?: (data: { [key: string]: unknown }) => void;
  state?: {
    [key: string]: USER;
  };
  edit?: boolean;
}

// Course List Add Interface

export interface COURSE  {
  id: string;
  name: string;
  short_description?:string;
  long_description?:string;
  duraion_course?:string;
  total_seat?:string;
  site_visits?:string;
  action?: JSX.Element;
  status?: boolean;
  image?: string;
}
export interface COURSE_PROPS {
  [key: string]: unknown;
  component?: (data: { [key: string]: unknown }) => void;
  state: {
    [key: string]: COURSE;
  };
  edit?: boolean;
}



// Front Page List Add Interface

export interface FRONTPAGE  {
  id: string;
  type: string;
  title?:string;
  description?:string;
  action?: JSX.Element;
  status?: boolean;
  image?: string;
}
export interface FRONTPAGE_PROPS {
  [key: string]: unknown;
  component?: (data: { [key: string]: unknown }) => void;
  state: {
    [key: string]: FRONTPAGE;
  };
  edit?: boolean;
}