import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { MessageResponse } from '../../types/api-types';
import { User } from '../../types/types';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: '/new',
        method: 'POST',
        body: user,
      }),
    }),

    lol: builder.query({ query: () => 'new2' }),
  }),
});

export const {useLoginMutation} = userAPI;