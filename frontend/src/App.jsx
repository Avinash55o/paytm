import { BrowserRouter,Routes,Route } from "react-router-dom"; //i the react-router-dom through node
import Signup from "./pages/signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />

          {/* <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/send" element={<SendMoney />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
