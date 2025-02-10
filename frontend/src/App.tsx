import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
