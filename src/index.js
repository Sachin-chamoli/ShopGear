import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/cart_context";
import { FilterContextProvider } from "./context/filter_context";
import { AppProvider } from "./context/productcontext";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <Auth0Provider
    domain="dev-a3op5ylbnat7tcfh.us.auth0.com"
    clientId="4Mj9zqqFP3R50ut0VZXoub0SeGIKGckQ"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <AppProvider>
        <FilterContextProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </FilterContextProvider>
    </AppProvider>
    </Auth0Provider>
);
