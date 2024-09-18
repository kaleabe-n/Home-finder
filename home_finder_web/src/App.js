import "./App.css";
import HomePage from "./pages/HomePage.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import SignUpPage from "./pages/SignUpPage.tsx";
import VerificationPage from "./pages/Verify.tsx";
import ListingPage from "./pages/Listing.tsx";
import PropertyPage from "./pages/PropertyPage.tsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route element={<PropertyPage />} path="/property/:id" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ListingPage />} path="/listing" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<VerificationPage />} path="/verify" />
        <Route element={<HomePage />} path="/" />
      </Route>
    )
  );
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
export default App;
