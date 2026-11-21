import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 12,
    quantity: 60,
    unit: "kg",
    farmer: "Ahmed Farm",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600",
    description: "Fresh and organic tomatoes directly from the farm."
  },
  {
    id: 2,
    name: "Fresh Potatoes",
    category: "Vegetables",
    price: 8,
    quantity: 100,
    unit: "kg",
    farmer: "Green Farm",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600",
    description: "High quality fresh potatoes."
  },
  {
    id: 3,
    name: "Fresh Wheat",
    category: "Grains",
    price: 5,
    quantity: 120,
    unit: "kg",
    farmer: "Golden Farm",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
    description: "Natural agricultural wheat."
  },
  {
    id: 4,
    name: "Fresh Carrots",
    category: "Vegetables",
    price: 10,
    quantity: 80,
    unit: "kg",
    farmer: "Ali Farm",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600",
    description: "Fresh carrots directly from the farm."
  },
  {
    id: 5,
    name: "Fresh Strawberries",
    category: "Fruits",
    price: 25,
    quantity: 40,
    unit: "kg",
    farmer: "Red Farm",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600",
    description: "Sweet and fresh strawberries."
  },
  {
    id: 6,
    name: "Fresh Lettuce",
    category: "Vegetables",
    price: 7,
    quantity: 70,
    unit: "kg",
    farmer: "Green Valley",
    image: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=600",
    description: "Fresh green lettuce."
  }
];

export function MyProvider({ children }) {

  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || initialProducts;
  });

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Save data automatically
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add product
  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Edit product
  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map((product) =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  // Add to cart
  
const addToCart = (product, amount = 1) => {

  const existing = cart.find((item) => item.id === product.id);

  const currentQuantity = existing ? existing.cartQuantity : 0;

  if (currentQuantity + amount > product.quantity) {
    alert("Not enough stock available.");
    return;
  }

  if (existing) {
    setCart(cart.map((item) =>
      item.id === product.id
        ? { ...item, cartQuantity: item.cartQuantity + amount }
        : item
    ));
  } else {
    setCart([
      ...cart,
      { ...product, cartQuantity: amount }
    ]);
  }
};


  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Change cart quantity
  const changeQuantity = (id, amount) => {
    setCart(cart.map((item) =>
      item.id === id
        ? {
            ...item,
            cartQuantity: Math.max(
              1,
              Math.min(item.cartQuantity + amount, item.quantity)
            )
          }
        : item
    ));
  };

  // Favorites
  const toggleFavorite = (product) => {
    const exists = favorites.some((item) => item.id === product.id);

    if (exists) {
      setFavorites(favorites.filter((item) => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  return (
    <MyContext.Provider value={{
      products,
      cart,
      favorites,
      cartTotal,
      addProduct,
      deleteProduct,
      updateProduct,
      addToCart,
      removeFromCart,
      changeQuantity,
      toggleFavorite
    }}>
      {children}
    </MyContext.Provider>
  );
}