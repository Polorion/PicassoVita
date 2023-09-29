import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    endpoints: (build) => ({
        getPost: build.query({
            query: (limit) => `posts?_page= ${limit}`,
        }),
        getPostId: build.query({
            query: (id) => `posts/${id}`,
        })
    })
});

export const {useGetPostQuery, useGetPostIdQuery} = postApi;