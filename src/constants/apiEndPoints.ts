export default {
  BASE_URL: `http://192.168.18.80:3000/api/v1`,
  LOGIN: `/users/login`,
  SIGNUP: `/users/signup`,
  LOGOUT: `/users/logout`,

  // ============== >> USER << ===============
  POST_BID: `/bid`,
  GET_ALL_BIDS: `/bid`,
  GET_ALL_VENDOR_SERVICES: `/services/public`,

  // =============== >> VENDOR << ===============
  POST_NEW_SERVICE: `/services`,
  GET_VENDOR_ALL_SERVICES: `/services`,
  DELETE_SERVICE_BY_ID: (id: any) => `/services/${id}`,
  GET_VENDOR_SERVICE_BY_ID: (id: any) => `/services/${id}`,
  GET_SERVICE_BY_ID: (id: any) => `/services/${id}`,
  POST_NEW_SERVICE_IMAGE: `/gallery/post-img`,
  GET_ALL_SERVICE_IMAGES: `/gallery/get-img`,
  DELETE_SERVICE_IMAGE: (id: any) => `/gallery/get-img/${id}`,
  GET_ALL_REVIEWS_OF_VENDOR: (vendorId: any) => `/reviews/vendor/${vendorId}`,
  GET_AVERAGE_RATING_OF_VENDOR: (vendorId: any) =>
    `/reviews/averageRating/${vendorId}`,
};
