import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import  Products  from "./pages/Products";
import ProductDetails from"./pages/ProductDetails";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;
