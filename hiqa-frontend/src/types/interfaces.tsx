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

// COURSE LIST
export interface COURSE {
  id: string;
  name: string;
  slug: string;
}

export interface QUALIFICATION {
  id: string;
  name: string;
  slug: string;
}
// Banner
export interface BANNER {
  id: string;
  title: string;
  image: string;
}

// BANNER LIST
export interface SECTION_DATA {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface COURSE_DATA {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  long_description?: string;
  duraion_course?: string;
  total_seat?: string;
  site_visits?: string;
  image?: string;
  price?: string;
  discount_prices?: string;
}

export interface SETTINGS_DATA {
  address: string;
  email: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  phone: string;
  youtube_url: string;
  twitter_url: string;
  longitude: string;
  latitude: string;
}

export interface EVENT_DATA {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  image: string;
  event_date: string;
  event_address: string;
  long_description?: string;
  event_start_time?: string;
  event_end_time?: string;
  event_facebook_url?: string;
  event_instagram_url?: string;
  event_twitter_url?: string;
}

export interface BLOG_DATA {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  image: string;
  long_description?: string;
}
export interface DOC_DATA {
  [key: string]: {
    name: string;
    year: string;
    docs: string;
  };
}

export interface USER_DOC_DATA {
  id?: string;
  qualification: string[];
  qualificationId: string[];
  qualificationDoc: DOC_DATA;
  course: string[];
  courseId: string[];
}
export interface USER_DATA {
  id?: string;
  fullName: string;
  fatherName: string;
  email: string;
  gender: string;
  mobile: string;
  dob: string;
  image: string;
  address: string;
  zipcode: string;
  longitude: string;
  latitude: string;
  country: string;
  state: string;
  city: string;
  category: string;
  qualification: string[];
  [key: string]: string | number | any;
}
export interface CART_ITEMS {
  id: number;
  cartId: number;
  userId: number;
  amount: number;
  course: COURSE_DATA;
}

export interface ADDRESS {
  formattedAddress: string;
  lat: number;
  lng: number;
}
