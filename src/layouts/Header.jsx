
import { Link, NavLink } from "react-router-dom";
import { Leaf, ShoppingCart, Heart, Menu } from "lucide-react";
import { useContext, useState } from "react";
import { MyContext } from "../utils/MyContext";
import Cart from "../pages/Cart/cart";

function Header() {
  const { cart, favorites } = useContext(MyContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "About", path: "/about" },
    { name: "Weather", path: "/weather" }
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-xl">
              <Leaf className="text-green-700" size={27} />
            </div>

            <span className="text-2xl font-extrabold text-green-900">
              Agri<span className="text-green-600">Tech</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? "text-green-700"
                      : "text-gray-600 hover:text-green-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">

            {/* Favorites */}
            <Link
              to="/favorites"
              className="relative text-gray-600 hover:text-green-700"
            >
              <Heart size={22} />

              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-600 hover:text-green-700"
              aria-label="Open shopping cart"
            >
              <ShoppingCart size={22} />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Login */}
            <Link
              to="/login"
              className="hidden sm:block bg-green-700 text-white px-5 py-2.5 rounded-xl hover:bg-green-800 transition"
            >
              Login
            </Link>

            {/* Mobile Menu */}
            <button
              className="md:hidden text-gray-700"
              aria-label="Open menu"
            >
              <Menu />
            </button>

          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

export default Header;