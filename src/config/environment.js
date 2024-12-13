const GG_CLIENT_ID = import.meta.env.VITE_GG_CLIENT_ID;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const NODE_ENV = import.meta.env.VITE_NODE_ENV;
const BASE_URL_API =
  NODE_ENV === 'postman'
    ? import.meta.env.VITE_BASE_URL_API_POSTMAN
    : import.meta.env.VITE_BASE_URL_API;
export const env = {
  BASE_URL_API,
  GG_CLIENT_ID,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  NODE_ENV
};
