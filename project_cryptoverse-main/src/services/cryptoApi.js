import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CRYPTO_API_URL,
    prepareHeaders: (headers) => {
      // Add any additional headers here
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
      // Add error handling here
      transformResponse: (response) => {
        if (!response) {
          throw new Error('No data received');
        }
        return response;
      },
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),

    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
  }),
  tagTypes: ['Cryptos'],
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
