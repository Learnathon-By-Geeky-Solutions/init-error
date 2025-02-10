import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import NotFound from "./components/NotFound/NotFound";
import Signin from "./components/signin/signin";
function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/signin" element={<Signin/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
