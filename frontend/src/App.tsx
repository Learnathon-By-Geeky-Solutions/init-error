import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/not-found/NotFound";
import HomePage from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/DashBoard";
import UserAccount from "./pages/UserAccount";
import Header from "./components/Header/Header";
import SignInPage from "./pages/SignIn";
import SignupPage from "./pages/SignUp";
import OTPVerification from "./pages/email_verification";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify/:email" element={<OTPVerification />} />
        <Route path="/account/profile" element={<UserAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
