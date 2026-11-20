import { useContext, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { MyContext } from "../../utils/MyContext"; 
import ProductCard from "./components/productCard";

function Marketplace() {

  const { products } = useContext(MyContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100);

  const filteredProducts = products.filter((product) => {

    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-[#EAF5EC] rounded-3xl p-10 md:p-14 mb-12">

        <p className="text-green-700 font-semibold">
          AgriTech Marketplace
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
          Discover Fresh Products
        </h1>

        <p className="text-gray-600 mt-4">
          Explore quality products directly from local farmers.
        </p>

      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Grains">Grains</option>
        </select>

      </div>

      {/* Price Filter */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 mb-10 flex flex-col sm:flex-row sm:items-center gap-4">

        <SlidersHorizontal className="text-green-700" />

        <label className="font-medium">
          Maximum Price: {maxPrice} MAD / kg
        </label>

        <input
          type="range"
          min="5"
          max="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="flex-1 accent-green-700"
        />

      </div>

      {/* Results */}
      <div className="flex justify-between items-center mb-7">

        <h2 className="text-2xl font-bold">
          Available Products
        </h2>

        <span className="text-gray-500 text-sm">
          {filteredProducts.length} products found
        </span>

      </div>

      {filteredProducts.length > 0 ? (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

      ) : (

        <div className="text-center py-20 bg-white rounded-2xl">
          <p className="text-gray-500 text-lg">
            No products found.
          </p>
        </div>

      )}

    </div>
  );
}

export default Marketplace;
