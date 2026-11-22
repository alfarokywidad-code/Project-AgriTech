import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { MyContext } from "../../utils/MyContext";

function ProductDetails() {

  const { id } = useParams();

  const { products, addToCart, favorites, toggleFavorite } = useContext(MyContext);

  const product = products.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="text-center py-24 text-xl">Product not found.</div>;
  }

  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <Link to="/marketplace" className="flex items-center gap-2 text-green-700 mb-8">
        <ArrowLeft size={18} /> Back to Marketplace
      </Link>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-2xl"
        />

        <div className="flex flex-col justify-center">

          <span className="bg-green-100 text-green-700 w-fit px-4 py-2 rounded-full text-sm">
            {product.category}
          </span>

          <h1 className="text-4xl font-extrabold mt-5">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-4 leading-8">
            {product.description}
          </p>

          <p className="text-gray-500 mt-5">
            Farmer: <span className="font-semibold text-gray-800">{product.farmer}</span>
          </p>

          <p className="text-3xl font-extrabold text-green-700 mt-5">
            {product.price} MAD / {product.unit}
          </p>

          <p className="text-sm text-gray-500 mt-3">
            Available: {product.quantity} {product.unit}
          </p>

          <div className="flex items-center gap-4 mt-7">

            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="border px-4 py-2 rounded-lg"
            >
              -
            </button>

            <span className="font-bold">{quantity}</span>

            <button
              onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
              className="border px-4 py-2 rounded-lg"
            >
              +
            </button>

          </div>

          <div className="flex gap-3 mt-7">

            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  addToCart(product);
                }
              }}
              disabled={product.quantity === 0}
              className="flex-1 bg-green-700 text-white rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-green-800 disabled:opacity-50"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button
              onClick={() => toggleFavorite(product)}
              className="border border-gray-200 p-4 rounded-xl"
              aria-label="Toggle favorite"
            >
              <Heart className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;