import React, { useEffect } from "react";
import AppRouter from "./pages/AppRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
