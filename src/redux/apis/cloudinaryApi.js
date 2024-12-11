import { env } from '@/config/environment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tạo API service với RTK Query
export const cloudinaryApi = createApi({
  reducerPath: 'cloudinaryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}`
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (image) => {
        console.log(image);
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', env.CLOUDINARY_UPLOAD_PRESET);
        return {
          url: `/image/upload`,
          method: 'POST',
          body: formData
        };
      }
    }),
    uploadMultipleImages: builder.mutation({
      async queryFn(files, api, _extraOptions, baseQuery) {
        try {
          const uploadPromises = Array.from(files).map((file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', env.CLOUDINARY_UPLOAD_PRESET);

            return baseQuery({
              url: `/image/upload`,
              method: 'POST',
              body: formData
            });
          });

          const responses = await Promise.all(uploadPromises);

          const errors = responses.filter((response) => response.error);
          if (errors.length > 0) {
            return { error: errors[0].error };
          }

          const results = responses.map((response) => response.data);

          return { data: results };
        } catch (error) {
          return { error };
        }
      }
    })
  })
});

export const { useUploadImageMutation, useUploadMultipleImagesMutation } =
  cloudinaryApi;
