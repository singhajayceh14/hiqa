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
