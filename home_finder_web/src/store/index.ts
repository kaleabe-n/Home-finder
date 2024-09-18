import { useLoginMutation } from "./features/auth.ts"
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth.ts";
import { propertiesApi } from "./features/properties.ts";
import tokenReducer from "./features/token.ts";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [propertiesApi.reducerPath]:propertiesApi.reducer,
    token:tokenReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware, propertiesApi.middleware),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export {useLoginMutation}