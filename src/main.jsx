import ReactDOM from "react-dom/client";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./store/store";
import './styles/index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
