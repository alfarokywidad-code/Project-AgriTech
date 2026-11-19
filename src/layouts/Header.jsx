
import { Link, NavLink } from "react-router-dom";
import { Leaf, ShoppingCart, Heart, Menu } from "lucide-react";


function Header() {
 

  const links = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "About", path: "/about" },
    { name: "Weather", path: "/weather" }
  ];

  return (
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
                  isActive ? "text-green-700" : "text-gray-600 hover:text-green-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">

          <Link to="/favorites" className="relative text-gray-600 hover:text-green-700">
            <Heart size={22} />

          </Link>

          <Link to="/cart" className="relative text-gray-600 hover:text-green-700">
            <ShoppingCart size={22} />

          </Link>

          <Link
            to="/login"
            className="hidden sm:block bg-green-700 text-white px-5 py-2.5 rounded-xl hover:bg-green-800 transition"
          >
            Login
          </Link>

          <button className="md:hidden text-gray-700" aria-label="Open menu">
            <Menu />
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Header;