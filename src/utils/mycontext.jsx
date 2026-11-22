
import { createContext, useEffect, useMemo, useState } from "react";

// Create context
export const MyContext = createContext();

// Initial products
const initialProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 12,
    quantity: 60,
    category: "Vegetables",
    farmer: "Ahmed",
    farmerId: 2,
    region: "Fes",
    unit: "kg",
    description: "Fresh and organic tomatoes.",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600",
    createdAt: "2026-01-01",
  },
  {
    id: 2,
    name: "Fresh Potatoes",
    price: 8,
    quantity: 100,
    category: "Vegetables",
    farmer: "Youssef",
    farmerId: 3,
    region: "Meknes",
    unit: "kg",
    description: "Fresh potatoes from local farms.",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600",
    createdAt: "2026-01-02",
  },
  {
    id: 3,
    name: "Wheat",
    price: 5,
    quantity: 120,
    category: "Grains",
    farmer: "Mohamed",
    farmerId: 4,
    region: "Sefrou",
    unit: "kg",
    description: "High quality local wheat.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600",
    createdAt: "2026-01-03",
  },
  {
    id: 4,
    name: "Fresh Carrots",
    price: 10,
    quantity: 80,
    category: "Vegetables",
    farmer: "Ahmed",
    farmerId: 2,
    region: "Fes",
    unit: "kg",
    description: "Fresh and healthy carrots.",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600",
    createdAt: "2026-01-04",
  },
  {
    id: 5,
    name: "Strawberries",
    price: 25,
    quantity: 40,
    category: "Fruits",
    farmer: "Youssef",
    farmerId: 3,
    region: "Meknes",
    unit: "kg",
    description: "Sweet and fresh strawberries.",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600",
    createdAt: "2026-01-05",
  },
  {
    id: 6,
    name: "Fresh Lettuce",
    price: 7,
    quantity: 70,
    category: "Vegetables",
    farmer: "Mohamed",
    farmerId: 4,
    region: "Sefrou",
    unit: "kg",
    description: "Fresh green lettuce.",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600",
    createdAt: "2026-01-06",
  },
];

// Read data from localStorage safely
const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

// Remove password from user data
const safeUser = ({ password, ...user }) => user;

// Main provider
export function MyProvider({ children }) {
  // Products
  const [products, setProducts] = useState(() =>
    read("products", initialProducts)
  );

  // Shopping cart
  const [cart, setCart] = useState(() => read("cart", []));

  // Favorite products
  const [favorites, setFavorites] = useState(() =>
    read("favorites", [])
  );

  // Orders
  const [orders, setOrders] = useState(() => read("orders", []));

  // Categories
  const [categories, setCategories] = useState(() =>
    read("categories", ["Vegetables", "Fruits", "Grains"])
  );

  // Users
  const [users, setUsers] = useState(() =>
    read("users", [
      {
        id: 1,
        fullName: "Administrator",
        email: "admin@agritech.com",
        password: "Admin123!",
        role: "Admin",
        city: "Fes",
      },
      {
        id: 2,
        fullName: "Ahmed",
        email: "ahmed@agritech.com",
        password: "Farmer123!",
        role: "Farmer",
        city: "Fes",
      },
      {
        id: 3,
        fullName: "Youssef",
        email: "youssef@agritech.com",
        password: "Farmer123!",
        role: "Farmer",
        city: "Meknes",
      },
      {
        id: 4,
        fullName: "Mohamed",
        email: "mohamed@agritech.com",
        password: "Farmer123!",
        role: "Farmer",
        city: "Sefrou",
      },
    ])
  );

  // Current user
  const [currentUser, setCurrentUser] = useState(() =>
    read("currentUser", null)
  );

  // Save data whenever it changes
  useEffect(() => {
    [
      ["products", products],
      ["cart", cart],
      ["favorites", favorites],
      ["orders", orders],
      ["categories", categories],
      ["users", users],
      ["currentUser", currentUser],
    ].forEach(([k, v]) =>
      localStorage.setItem(k, JSON.stringify(v))
    );
  }, [products, cart, favorites, orders, categories, users, currentUser]);

  // Calculate cart total
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (s, i) => s + Number(i.price) * Number(i.cartQuantity),
        0
      ),
    [cart]
  );

  // Register a new user
  const register = ({ fullName, email, password, role, city }) => {
    if (
      users.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      )
    ) {
      return { error: "This email is already registered." };
    }

    if (!["Buyer", "Farmer"].includes(role)) {
      return { error: "Choose Buyer or Farmer." };
    }

    const user = {
      id: Date.now(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
      city: city || "Fes",
    };

    setUsers((p) => [...p, user]);
    setCurrentUser(safeUser(user));

    return { user: safeUser(user) };
  };

  // Login user
  const login = ({ email, password }) => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!user) {
      return { error: "Incorrect email or password." };
    }

    const clean = safeUser(user);
    setCurrentUser(clean);

    return { user: clean };
  };

  // Logout user
  const logout = () => setCurrentUser(null);

  // Add product to cart
  const addToCart = (product, amount = 1) => {
    const p = products.find((x) => x.id === product.id);

    if (!p || p.quantity <= 0) {
      return alert("This product is out of stock.");
    }

    setCart((prev) => {
      const old = prev.find((x) => x.id === p.id);
      const next = (old?.cartQuantity || 0) + Number(amount);

      if (next > p.quantity) {
        alert("You cannot add more than the available stock.");
        return prev;
      }

      return old
        ? prev.map((x) =>
            x.id === p.id ? { ...p, cartQuantity: next } : x
          )
        : [...prev, { ...p, cartQuantity: Number(amount) }];
    });
  };

  // Remove product from cart
  const removeFromCart = (id) =>
    setCart((p) => p.filter((x) => x.id !== id));

  // Change cart quantity
  const changeQuantity = (id, amount) =>
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;

          const p = products.find((x) => x.id === id);
          if (!p) return null;

          return {
            ...p,
            cartQuantity: Math.max(
              1,
              Math.min(p.quantity, item.cartQuantity + amount)
            ),
          };
        })
        .filter(Boolean)
    );

  // Clear shopping cart
  const clearCart = () => setCart([]);

  // Toggle favorite product
  const toggleFavorite = (product) => {
    setFavorites((p) =>
      p.some((x) => x.id === product.id)
        ? p.filter((x) => x.id !== product.id)
        : [...p, product]
    );
  };

  // Add a new product
  const addProduct = (data) => {
    const item = {
      ...data,
      id: Date.now(),
      price: Number(data.price),
      quantity: Number(data.quantity),
      farmerId: currentUser?.id,
      farmer: currentUser?.fullName,
      createdAt: new Date().toISOString(),
    };

    setProducts((p) => [...p, item]);

    return item;
  };

  // Update an existing product
  const updateProduct = (id, data) => {
    const normalized = {
      ...data,
      ...(data.price !== undefined
        ? { price: Number(data.price) }
        : {}),
      ...(data.quantity !== undefined
        ? { quantity: Number(data.quantity) }
        : {}),
    };

    setProducts((p) =>
      p.map((x) =>
        x.id === id ? { ...x, ...normalized } : x
      )
    );

    setCart((p) =>
      p
        .map((x) =>
          x.id === id
            ? {
                ...x,
                ...normalized,
                cartQuantity: Math.min(
                  x.cartQuantity,
                  normalized.quantity ?? x.quantity
                ),
              }
            : x
        )
        .filter((x) => x.quantity > 0)
    );

    setFavorites((p) =>
      p.map((x) =>
        x.id === id ? { ...x, ...normalized } : x
      )
    );
  };

  // Delete a product
  const deleteProduct = (id) => {
    setProducts((p) => p.filter((x) => x.id !== id));
    setCart((p) => p.filter((x) => x.id !== id));
    setFavorites((p) => p.filter((x) => x.id !== id));
  };

  // Add a new category
  const addCategory = (name) => {
    const n = name.trim();

    if (
      n &&
      !categories.some((x) => x.toLowerCase() === n.toLowerCase())
    ) {
      setCategories((p) => [...p, n]);
    }
  };

  // Update a category
  const updateCategory = (oldName, newName) => {
    const n = newName.trim();

    if (!n) return;

    setCategories((p) =>
      p.map((x) => (x === oldName ? n : x))
    );

    setProducts((p) =>
      p.map((x) =>
        x.category === oldName ? { ...x, category: n } : x
      )
    );
  };

  // Delete a category
  const deleteCategory = (name) => {
    setCategories((p) => {
      const rest = p.filter((x) => x !== name);

      return rest.includes("Other") ? rest : [...rest, "Other"];
    });

    setProducts((p) =>
      p.map((x) =>
        x.category === name ? { ...x, category: "Other" } : x
      )
    );
  };

  // Create an order from checkout
  const placeOrder = ({ customer, paymentMethod }) => {
    if (!cart.length) return null;

    for (const item of cart) {
      const p = products.find((x) => x.id === item.id);

      if (!p || p.quantity < item.cartQuantity) {
        alert(
          `${item.name} is no longer available in the requested quantity.`
        );
        return null;
      }
    }

    const items = cart.map((i) => ({
      ...products.find((p) => p.id === i.id),
      cartQuantity: i.cartQuantity,
    }));

    const order = {
      id: Date.now(),
      items,
      customer,
      paymentMethod,
      total: items.reduce(
        (s, i) => s + i.price * i.cartQuantity,
        0
      ),
      status: "Pending",
      createdAt: new Date().toISOString(),
      buyerId: currentUser?.id,
      buyerEmail: currentUser?.email,
      farmerIds: [
        ...new Set(items.map((i) => i.farmerId).filter(Boolean)),
      ],
    };

    setProducts((p) =>
      p.map((x) => {
        const bought = items.find((i) => i.id === x.id);

        return bought
          ? {
              ...x,
              quantity: Math.max(
                0,
                x.quantity - bought.cartQuantity
              ),
            }
          : x;
      })
    );

    setOrders((p) => [order, ...p]);
    setCart([]);

    return order;
  };

  // Update order status
  const updateOrderStatus = (id, status) => {
    const allowed = {
      Pending: ["Confirmed"],
      Confirmed: ["Shipped"],
      Shipped: ["Delivered"],
      Delivered: [],
    };

    setOrders((p) =>
      p.map((o) => {
        if (o.id !== id || !allowed[o.status]?.includes(status)) {
          return o;
        }

        return { ...o, status };
      })
    );
  };

  // Share data and functions
  return (
    <MyContext.Provider
      value={{
        products,
        cart,
        favorites,
        orders,
        categories,
        users,
        currentUser,
        cartTotal,
        register,
        login,
        logout,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        toggleFavorite,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}


