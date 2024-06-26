import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.jsx";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./error/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ErrorBoundary>
            <Header />
            <App />
            <Toaster />
          </ErrorBoundary>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
