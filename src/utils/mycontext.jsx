
import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 12,
    quantity: 60,
    category: "Vegetables",
    farmer: "Ahmed",
    description: "Fresh and organic tomatoes.",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600",
  },
  {
    id: 2,
    name: "Fresh Potatoes",
    price: 8,
    quantity: 100,
    category: "Vegetables",
    farmer: "Youssef",
    description: "Fresh potatoes from local farms.",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600",
  },
  {
    id: 3,
    name: "Wheat",
    price: 5,
    quantity: 120,
    category: "Grains",
    farmer: "Mohamed",
    description: "High quality local wheat.",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600",
  },
  {
    id: 4,
    name: "Fresh Carrots",
    price: 10,
    quantity: 80,
    category: "Vegetables",
    farmer: "Ahmed",
    description: "Fresh and healthy carrots.",
    image:
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600",
  },
  {
    id: 5,
    name: "Strawberries",
    price: 25,
    quantity: 40,
    category: "Fruits",
    farmer: "Youssef",
    description: "Sweet and fresh strawberries.",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600",
  },
  {
    id: 6,
    name: "Fresh Lettuce",
    price: 7,
    quantity: 70,
    category: "Vegetables",
    farmer: "Mohamed",
    description: "Fresh green lettuce.",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600",
  },
];

// Read data from localStorage safely
const getSavedData = (key, fallback) => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
};

export function MyProvider({ children }) {
  // Products
  const [products, setProducts] = useState(() =>
    getSavedData("products", initialProducts)
  );

  // Shopping cart
  const [cart, setCart] = useState(() =>
    getSavedData("cart", [])
  );

  // Favorites
  const [favorites, setFavorites] = useState(() =>
    getSavedData("favorites", [])
  );

  // Orders
  const [orders, setOrders] = useState(() =>
    getSavedData("orders", [])
  );

  // Categories
  const [categories, setCategories] = useState(() =>
    getSavedData("categories", [
      "Vegetables",
      "Fruits",
      "Grains",
    ])
  );

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + Number(item.price) * Number(item.cartQuantity);
  }, 0);

  // Add product to cart
  const addToCart = (product, amount = 1) => {
    const currentProduct = products.find(
      (item) => item.id === product.id
    );

    if (!currentProduct || currentProduct.quantity <= 0) {
      alert("This product is out of stock.");
      return;
    }

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    const currentQuantity = existingItem
      ? Number(existingItem.cartQuantity)
      : 0;

    if (currentQuantity + amount > currentProduct.quantity) {
      alert("You cannot add more than the available stock.");
      return;
    }

    setCart((previousCart) => {
      const itemExists = previousCart.some(
        (item) => item.id === product.id
      );

      if (itemExists) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + amount,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...currentProduct,
          cartQuantity: amount,
        },
      ];
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    );
  };

  // Change cart quantity
  const changeQuantity = (productId, amount) => {
    setCart((previousCart) =>
      previousCart
        .map((item) => {
          if (item.id !== productId) return item;

          const currentProduct = products.find(
            (product) => product.id === productId
          );

          if (!currentProduct) return null;

          const newQuantity = Math.max(
            1,
            Math.min(
              item.cartQuantity + amount,
              currentProduct.quantity
            )
          );

          return {
            ...item,
            quantity: currentProduct.quantity,
            cartQuantity: newQuantity,
          };
        })
        .filter(Boolean)
    );
  };

  // Clear shopping cart
  const clearCart = () => {
    setCart([]);
  };

  // Add product to favorites or remove it
  const toggleFavorite = (product) => {
    setFavorites((previousFavorites) => {
      const alreadyFavorite = previousFavorites.some(
        (item) => item.id === product.id
      );

      if (alreadyFavorite) {
        return previousFavorites.filter(
          (item) => item.id !== product.id
        );
      }

      return [...previousFavorites, product];
    });
  };

  // Add a new product
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
    };

    setProducts((previousProducts) => [
      ...previousProducts,
      product,
    ]);

    return product;
  };

  // Update an existing product
  const updateProduct = (productId, updatedData) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              ...updatedData,
              price:
                updatedData.price !== undefined
                  ? Number(updatedData.price)
                  : product.price,
              quantity:
                updatedData.quantity !== undefined
                  ? Number(updatedData.quantity)
                  : product.quantity,
            }
          : product
      )
    );

    // Keep cart and favorites synchronized
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              ...updatedData,
              price:
                updatedData.price !== undefined
                  ? Number(updatedData.price)
                  : item.price,
              quantity:
                updatedData.quantity !== undefined
                  ? Number(updatedData.quantity)
                  : item.quantity,
              cartQuantity: Math.min(
                item.cartQuantity,
                updatedData.quantity !== undefined
                  ? Number(updatedData.quantity)
                  : item.quantity
              ),
            }
          : item
      ).filter((item) => item.quantity > 0)
    );

    setFavorites((previousFavorites) =>
      previousFavorites.map((item) =>
        item.id === productId
          ? { ...item, ...updatedData }
          : item
      )
    );
  };

  // Delete a product
  const deleteProduct = (productId) => {
    setProducts((previousProducts) =>
      previousProducts.filter((item) => item.id !== productId)
    );

    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    );

    setFavorites((previousFavorites) =>
      previousFavorites.filter((item) => item.id !== productId)
    );
  };

  // Add a category
  const addCategory = (categoryName) => {
    const name = categoryName.trim();

    if (!name) return;

    setCategories((previousCategories) => {
      const exists = previousCategories.some(
        (category) =>
          category.toLowerCase() === name.toLowerCase()
      );

      if (exists) return previousCategories;

      return [...previousCategories, name];
    });
  };

  // Update a category name
  const updateCategory = (oldName, newName) => {
    const name = newName.trim();

    if (!name) return;

    setCategories((previousCategories) =>
      previousCategories.map((category) =>
        category === oldName ? name : category
      )
    );

    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.category === oldName
          ? { ...product, category: name }
          : product
      )
    );
  };

  // Delete a category
  const deleteCategory = (categoryName) => {
    setCategories((previousCategories) =>
      previousCategories.filter(
        (category) => category !== categoryName
      )
    );
  };

  // Create an order from checkout
  const placeOrder = ({ customer, paymentMethod }) => {
    if (cart.length === 0) {
      return null;
    }

    // Check stock again before placing the order
    for (const item of cart) {
      const currentProduct = products.find(
        (product) => product.id === item.id
      );

      if (
        !currentProduct ||
        currentProduct.quantity < item.cartQuantity
      ) {
        alert(
          `${item.name} is no longer available in the requested quantity.`
        );
        return null;
      }
    }

    const orderItems = cart.map((item) => {
      const currentProduct = products.find(
        (product) => product.id === item.id
      );

      return {
        ...currentProduct,
        cartQuantity: item.cartQuantity,
      };
    });

    const total = orderItems.reduce(
      (sum, item) =>
        sum + Number(item.price) * Number(item.cartQuantity),
      0
    );

    const newOrder = {
      id: Date.now(),
      items: orderItems,
      customer,
      paymentMethod,
      total,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Decrease product stock
    setProducts((previousProducts) =>
      previousProducts.map((product) => {
        const orderedItem = orderItems.find(
          (item) => item.id === product.id
        );

        if (!orderedItem) return product;

        return {
          ...product,
          quantity: Math.max(
            0,
            product.quantity - orderedItem.cartQuantity
          ),
        };
      })
    );

    // Save the order and empty the cart
    setOrders((previousOrders) => [
      newOrder,
      ...previousOrders,
    ]);

    setCart([]);

    return newOrder;
  };

  // Update order status (Farmer/Admin)
  const updateOrderStatus = (orderId, newStatus) => {
    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
    ];

    if (!allowedStatuses.includes(newStatus)) return;

    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <MyContext.Provider
      value={{
        // Main data
        products,
        cart,
        favorites,
        orders,
        categories,

        // Cart
        cartTotal,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,

        // Favorites
        toggleFavorite,

        // Products
        addProduct,
        updateProduct,
        deleteProduct,

        // Categories
        addCategory,
        updateCategory,
        deleteCategory,

        // Orders
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

