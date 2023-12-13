import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./pageRoutes";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
