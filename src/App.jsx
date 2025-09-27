import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Entertainment from "./pages/Entertainment";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import ThemeParkBooking from "./pages/ThemeParkBooking";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/booking" element={<ThemeParkBooking />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
