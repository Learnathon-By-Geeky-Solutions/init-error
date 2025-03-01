import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import NotFound from "./components/not-found/NotFound";
import Signin from "./components/signin/signin";
import Signup from "./components/signup/signup";
import HomePage from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
