import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useContext } from "react";
import { MyContext } from "../../../utils/MyContext";

function ProductCard({ product }) {

  const { addToCart, favorites, toggleFavorite } = useContext(MyContext);

  const isFavorite = favorites.some(
    (item) => item.id === product.id
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 group">

      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
        />

        <button
          onClick={() => toggleFavorite(product)}
          className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md"
          aria-label="Toggle favorite"
        >
          <Heart
            size={19}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </button>

        <span className="absolute bottom-4 left-4 bg-white/95 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full">
          {product.category}
        </span>

      </div>

      <div className="p-5">

        <p className="text-xs text-gray-400">
          {product.farmer}
        </p>

        <h3 className="font-bold text-lg text-gray-900 mt-2">
          {product.name}
        </h3>

        <div className="flex justify-between items-center mt-4">

          <div>
            <span className="text-green-700 text-xl font-extrabold">
              {product.price} MAD
            </span>
            <span className="text-gray-400 text-xs">
              /{product.unit}
            </span>
          </div>

          <span className="text-xs text-gray-500">
            {product.quantity} {product.unit} available
          </span>

        </div>

        <div className="grid grid-cols-2 gap-2 mt-5">

          <Link
            to={`/product/${product.id}`}
            className="flex justify-center items-center gap-2 border border-green-700 text-green-700 py-2.5 rounded-xl hover:bg-green-50 transition text-sm"
          >
            <Eye size={17} />
            Details
          </Link>

          <button
            onClick={() => addToCart(product)}
            disabled={product.quantity === 0}
            className="flex justify-center items-center gap-2 bg-green-700 text-white py-2.5 rounded-xl hover:bg-green-800 transition text-sm disabled:opacity-50"
          >
            <ShoppingCart size={17} />
            Add
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;
