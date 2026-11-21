import { useContext } from "react";
import { MyContext } from "../../utils/MyContext"; 
import ProductCard from "../Marketplace/components/productCard";

function Favorites() {

  const { favorites } = useContext(MyContext);

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">

      <h1 className="text-4xl font-extrabold">My Favorites</h1>

      <p className="text-gray-500 mt-3 mb-10">
        Your favorite agricultural products.
      </p>

      {favorites.length === 0 ? (

        <div className="bg-white p-16 text-center rounded-2xl">
          <h2 className="text-xl font-bold">No favorites yet</h2>
          <p className="text-gray-500 mt-3">
            Add products to your favorites to see them here.
          </p>
        </div>

      ) : (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

      )}

    </div>
  );
}

export default Favorites;
