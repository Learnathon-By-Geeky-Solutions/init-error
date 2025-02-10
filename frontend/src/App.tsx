import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import NotFound from "./components/NotFound/NotFound";
function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
