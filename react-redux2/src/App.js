import "./App.css";
import Subscribers from "./components/subscriber";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Display from "./components/Display";
import View from "./components/Views";
import Comments from "./components/comments";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Subscribers />
        <Display />
        <View />
        <Comments />
      </div>
    </Provider>
  );
}

export default App;
