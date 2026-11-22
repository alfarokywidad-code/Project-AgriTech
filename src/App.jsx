import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Error from './pages/Error/Error';
import Marketplace from './pages/Marketplace/marketplace';
import Home from "./pages/Home/Home";
import Favorites from './pages/Favorites/favorites';
import Weather from './pages/Weather/weather';
import ProductDetails from './pages/ProductDetails/productdetails';

function App() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
