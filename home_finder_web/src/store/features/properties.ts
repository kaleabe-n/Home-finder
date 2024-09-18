import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import base_uri from '../base_uri.ts'
import Property from '../../types/Property.ts'

export const COUNT_ON_SINGLE_PAGE = 8

export const propertiesApi = createApi({
    reducerPath: "propertiesapi",
    baseQuery: fetchBaseQuery({baseUrl:base_uri}),
    endpoints: (builder)=>({
        getProperties: builder.mutation<{total:number,data:[Property]},any>({
            query:(data:{token:string,page:number,perPage:number})=>({
                url: `/api/property/`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
                params: {
                    page:data.page,
                    perPage:data.perPage
                }
            })
        }),
        getSingleProperty: builder.query<Property,any>({
            query:(data:{id:number,token:string})=>{
                return ({url: `/api/property/${data.id}/`,
                    method: "GET",
                    headers:{
                        Authorization: `Bearer ${data.token}`,
                    }
                })
            }
        }),
        // getDoctors: builder.mutation({
        //     query:()=>({
        //         url:'/property/',
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

export const { useGetPropertiesMutation,useGetSinglePropertyQuery } = propertiesApi