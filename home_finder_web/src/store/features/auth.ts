import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import base_uri from '../base_uri.ts'
import Login, { LoginResponse } from '../../types/Login.ts'
import User from '../../types/User.ts'
import Signup,{ Verification } from '../../types/Signup.ts'

export const COUNT_ON_SINGLE_PAGE = 8

export const authApi = createApi({
    reducerPath: "authapi",
    baseQuery: fetchBaseQuery({baseUrl:base_uri}),
    endpoints: (builder)=>({
        login: builder.mutation<LoginResponse,Login>({
            query:(body:Login)=>({
                url: 'api/token/',
                method: 'POST',
                body,
            })
        }),
        signup: builder.mutation<User,Signup>({
            query:(body:Login)=>({
                url: 'api/user/register/',
                method: 'POST',
                body,
            })
        }),
        verify: builder.mutation<null,Verification>({
            query:(body:Verification)=>({
                url: 'api/user/verify/',
                method: 'POST',
                body:{code:body.code},
                headers:{
                    Authorization: `Bearer ${body.token}`
                }
            })
        }),
        // getDoctors: builder.mutation({
        //     query:()=>({
        //         url:'search',
        //         method:"POST",
        //         params: {
        //             institutions:false,
        //             articles:false
        //         }
        //     })
        // }),
        // getDoctorsWithPage: builder.mutation({
        //     query:(pageNumber:number)=>({
        //         url: 'search',
        //         method: 'POST',
        //         params: {
        //             institutions:false,
        //             from: pageNumber,
        //             size: COUNT_ON_SINGLE_PAGE
        //         }
        //     })
        // }),
        // getSingleDoctor: builder.query({
        //     query:(id:string)=>({
        //         url: `/users/doctorProfile/${id}`
        //     })
        // }),
        // getDoctorsByKeyword: builder.mutation({
        //     query:(keyword:string)=>({
        //         url:'search',
        //         method:'POST',
        //         params: {
        //             institutions: false,
        //             articles: false,
        //             keyword:keyword
        //         }
        //     })
        // })
    })
})

// export const { useGetDoctorsMutation,useGetDoctorsWithPageMutation,useGetSingleDoctorQuery,useGetDoctorsByKeywordMutation } = authApi
export const { useLoginMutation,useSignupMutation,useVerifyMutation } = authApi