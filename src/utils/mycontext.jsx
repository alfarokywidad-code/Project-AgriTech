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



  // Save data automatically
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);



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


  return (
    <MyContext.Provider value={{
      products,
      addProduct,
      deleteProduct,
      updateProduct
    }}>
      {children}
    </MyContext.Provider>
  );
}