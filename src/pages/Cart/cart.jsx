
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {X, Trash2, ShoppingBag, Plus, Minus,Trash} from "lucide-react";
import { MyContext } from "../../utils/MyContext";

function Cart({ isOpen, onClose }) {
  const { cart, removeFromCart, changeQuantity, cartTotal} = useContext(MyContext);

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(isOpen);
  const [animation, setAnimation] = useState("translate-x-full");

  // فتح وإغلاق 
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimation("translate-x-0");
    } else {
      setAnimation("translate-x-full");

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // حساب عدد المنتجات
  const cartCount = cart.reduce(
    (total, item) => total + Number(item.cartQuantity),
    0
  );

  // إفراغ السلة
  const clearCart = () => {
    cart.forEach((item) => removeFromCart(item.id));
  };

  // الانتقال إلى Checkout
  const goToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0 z-[100] flex justify-end bg-black/50"
          onClick={onClose}
        >
          {/* Sidebar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full sm:w-[450px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${animation}`}
          >

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-green-900">
                Shopping Cart
                <span className="text-green-600 ml-2">
                  ({cartCount})
                </span>
              </h2>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 transition"
                aria-label="Close cart"
              >
                <X size={25} />
              </button>
            </div>

            {/* Empty Cart */}
            {cart.length === 0 ? (

              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
                <ShoppingBag
                  size={55}
                  className="text-green-600"
                />

                <h3 className="text-xl font-bold text-gray-800">
                  Your cart is empty
                </h3>

                <p className="text-gray-500">
                  Discover fresh products from our farmers.
                </p>

                <Link
                  to="/marketplace"
                  onClick={onClose}
                  className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition"
                >
                  Continue Shopping
                </Link>
              </div>

            ) : (

              <>
                {/* Products */}
                <div className="flex-1 overflow-y-auto px-5 py-3">

                  <div className="space-y-3">

                    {cart.map((item) => (

                      <div
                        key={item.id}
                        className="flex gap-3 items-center p-3 rounded-xl border border-gray-100 bg-gray-50"
                      >

                        {/* Product Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shrink-0"
                        />

                        {/* Product Information */}
                        <div className="flex-1 min-w-0">

                          <h3 className="font-bold text-gray-800 text-sm truncate">
                            {item.name}
                          </h3>

                          <p className="text-gray-500 text-xs mt-1">
                            {item.farmer}
                          </p>

                          <p className="text-green-700 font-bold text-sm mt-1">
                            {item.price} MAD / {item.unit}
                          </p>

                          {/* Quantity */}
                          <div className="flex items-center gap-3 mt-2">

                            <button
                              type="button"
                              onClick={() =>
                                changeQuantity(item.id, -1)
                              }
                              className="w-7 h-7 flex items-center justify-center border rounded-lg hover:bg-green-100 transition"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="font-bold text-sm">
                              {item.cartQuantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                changeQuantity(item.id, 1)
                              }
                              disabled={
                                item.cartQuantity >= item.quantity
                              }
                              className="w-7 h-7 flex items-center justify-center border rounded-lg hover:bg-green-100 transition disabled:opacity-40"
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                        </div>

                        {/* Remove Product */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                          aria-label="Remove product"
                        >
                          <Trash2 size={19} />
                        </button>

                      </div>

                    ))}

                  </div>
                </div>

                <div className="border-t border-gray-100 bg-white px-6 py-5 shrink-0">

                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-semibold ml-auto mb-4"
                  >
                    <Trash size={16} />
                    Clear Cart
                  </button>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center mb-3 text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      {cartTotal} MAD
                    </span>
                  </div>


                  {/* Total */}
                  <div className="flex justify-between items-center border-t pt-4 mb-5">
                    <span className="font-bold text-lg">
                      Total
                    </span>

                    <span className="font-extrabold text-xl text-green-700">
                      {cartTotal} MAD
                    </span>
                  </div>

                  {/* Checkout */}
                  <button
                    onClick={goToCheckout}
                    className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping */}
                  <button
                    onClick={onClose}
                    className="w-full mt-3 py-3 rounded-xl border border-gray-200 text-green-700 font-semibold hover:bg-gray-50 transition"
                  >
                    Continue Shopping
                  </button>

                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}

export default Cart;

