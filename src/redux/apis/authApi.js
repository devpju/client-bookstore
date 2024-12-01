import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ emailOrPhoneNumber, password }) => ({
        url: 'login',
        method: 'POST',
        body: { emailOrPhoneNumber, password }
      })
    }),
    register: builder.mutation({
      query: ({ fullName, email, phoneNumber, password }) => ({
        url: 'register',
        method: 'POST',
        body: { fullName, email, phoneNumber, password }
      })
    }),
    loginWithGoogle: builder.mutation({
      query: ({ token }) => ({
        url: 'login-with-google',
        method: 'POST',
        body: { token }
      })
    }),
    verifyOTP: builder.mutation({
      query: ({ email, otp }) => ({
        url: 'verify-otp',
        method: 'POST',
        body: { email, otp }
      })
    }),
    sendOTP: builder.mutation({
      query: ({ email }) => ({
        url: 'send-otp',
        method: 'POST',
        body: { email }
      })
    }),
    forgotPassword: builder.mutation({
      query: ({ email, token }) => ({
        url: 'forgot-password',
        method: 'POST',
        body: { email, token }
      })
    }),
    resetPassword: builder.mutation({
      query: ({ newPassword, token }) => ({
        url: 'reset-password',
        method: 'POST',
        body: { newPassword, token }
      })
    }),
    signout: builder.mutation({
      query: () => ({
        url: 'signout',
        method: 'POST'
      })
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOTPMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useSignoutMutation,
  useLoginWithGoogleMutation
} = authApi;
