import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Error from './pages/Error/Error';
import Marketplace from './pages/Marketplace/marketplace';
function App() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <Routes>
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
