import { useContext, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { MyContext } from "../../utils/MyContext";
import ProductCard from "./components/productCard";

export default function Marketplace() {
  const { products, categories } = useContext(MyContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("newest");

  const regions = [
    ...new Set(products.map((p) => p.region).filter(Boolean)),
  ];

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || p.category === category) &&
        (region === "All" || p.region === region) &&
        Number(p.price) >= minPrice &&
        Number(p.price) <= maxPrice &&
        (!inStock || p.quantity > 0)
    );

    return list.sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
    );
  }, [
    products,
    search,
    category,
    region,
    minPrice,
    maxPrice,
    inStock,
    sort,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setRegion("All");
    setMinPrice(0);
    setMaxPrice(100);
    setInStock(false);
    setSort("newest");
  };

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

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-5 py-4"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="bg-white p-5 rounded-xl border border-gray-100 mb-9 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-2">
            Min price (MAD)
          </label>

          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Max price (MAD)
          </label>

          <input
            type="number"
            min={minPrice}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Region
          </label>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="All">All regions</option>
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Sort by
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>

        <label className="flex items-center gap-2 pb-2 text-sm">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="accent-green-700"
          />
          In stock only
        </label>
      </div>

      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl font-bold">
          Available Products
        </h2>

        <span className="text-gray-500 text-sm">
          {filtered.length} products found
        </span>
      </div>

      {filtered.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl">
          <SlidersHorizontal className="mx-auto text-gray-300 mb-3" />

          <p className="text-gray-500 text-lg">
            No products match these filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-4 text-green-700 font-semibold"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

