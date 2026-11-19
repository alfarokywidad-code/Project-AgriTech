import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Routes, Route } from "react-router-dom";
import Error from './pages/Error/Error';
function App() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <Routes>
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
