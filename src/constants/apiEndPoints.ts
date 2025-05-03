export default {
  BASE_URL: `http://192.168.18.80:3000/api/v1`,
  LOGIN: `/users/login`,
  SIGNUP: `/users/signup`,
  LOGOUT: `/users/logout`,

  // ============== >> USER << ===============
  POST_BID: `/bid`,
  GET_ALL_BIDS: `/bid`,

  // =============== >> VENDOR << ===============
  POST_NEW_SERVICE: `/services`,
  GET_VENDOR_ALL_SERVICES: `/services`,
  DELETE_SERVICE_BY_ID: (id: any) => `/services/${id}`,
  GET_VENDOR_SERVICE_BY_ID: (id: any) => `/services/${id}`,
  GET_SERVICE_BY_ID: (id: any) => `/services/${id}`,
};
