
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  CheckCircle2,
  MapPin,
  Phone,
  ArrowLeft,
  Package
} from "lucide-react";
import { MyContext } from "../../utils/MyContext";

function Checkout() {
  const { cart, cartTotal, placeOrder, currentUser } = useContext(MyContext);

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    phone: "",
    address: "",
    city: currentUser?.city || "",
    notes: ""
  });

  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const order = placeOrder({
      customer: { ...formData, email: currentUser?.email },
      paymentMethod: "Cash on Delivery"
    });

    if (order) {
      setConfirmedOrder(order);
    } else {
      setError("Unable to place your order. Please check product availability.");
    }
  };

  // Successful order screen
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white w-full max-w-xl rounded-3xl shadow-lg p-8 text-center">

          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-5 rounded-full">
              <CheckCircle2 size={65} className="text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-green-800 mb-3">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 mb-8">
            Thank you for shopping with AgriTech.
            Your order is waiting for farmer confirmation.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 mb-8">

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Order Number</span>
              <span className="font-bold text-gray-800">
                #{confirmedOrder.id}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Order Status</span>
              <span className="font-bold text-yellow-600">
                {confirmedOrder.status}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Payment</span>
              <span className="font-semibold text-gray-800">
                Cash on Delivery
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-green-700">
                {Number(confirmedOrder.total).toFixed(2)} MAD
              </span>
            </div>

          </div>

          <Link
            to="/my-orders"
            className="block w-full bg-green-800 text-white py-4 rounded-xl font-semibold hover:bg-green-900 transition"
          >
            Track My Order
          </Link>

          <Link
            to="/marketplace"
            className="block mt-4 text-green-700 font-medium hover:underline"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm max-w-md w-full">

          <ShoppingBag size={65} className="mx-auto text-gray-300 mb-5" />

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mb-6">
            Add products before proceeding to checkout.
          </p>

          <Link
            to="/marketplace"
            className="inline-block bg-green-800 text-white px-8 py-3 rounded-xl hover:bg-green-900 transition"
          >
            Explore Products
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-green-800 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Marketplace
        </Link>

        <h1 className="text-4xl font-bold text-green-900 mb-3">
          Checkout
        </h1>

        <p className="text-gray-500 mb-10">
          Complete your delivery information to place your order.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">

            {/* Shipping information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">

              <div className="flex items-center gap-3 mb-7">
                <div className="bg-green-100 p-3 rounded-xl">
                  <MapPin className="text-green-800" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Shipping Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Enter your delivery details
                  </p>
                </div>
              </div>

              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, building, apartment..."
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Special delivery instructions..."
                    rows="3"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 resize-none"
                  />
                </div>

              </div>

              {/* Payment method */}
              <div className="mt-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-5">
                  Payment Method
                </h2>

                <div className="flex items-center gap-4 border-2 border-green-700 bg-green-50 rounded-xl p-5">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="accent-green-700 w-5 h-5"
                  />

                  <div>
                    <p className="font-bold text-gray-800">
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-gray-500">
                      Pay when your order arrives.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 h-fit lg:sticky lg:top-8">

              <div className="flex items-center gap-3 mb-7">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Package className="text-green-800" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-5 mb-7">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.cartQuantity}
                      </p>
                      <p className="text-sm text-green-700">
                        {item.price} MAD / {item.unit}
                      </p>
                    </div>

                    <p className="font-bold text-gray-800">
                      {(Number(item.price) * Number(item.cartQuantity)).toFixed(2)} MAD
                    </p>

                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{Number(cartTotal).toFixed(2)} MAD</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-700 font-semibold">Free</span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-800">
                    Total
                  </span>
                  <span className="text-xl font-bold text-green-800">
                    {Number(cartTotal).toFixed(2)} MAD
                  </span>
                </div>

              </div>

              {error && (
                <p className="mt-5 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full mt-7 bg-green-800 text-white py-4 rounded-xl font-bold hover:bg-green-900 transition shadow-md"
              >
                Confirm Order
              </button>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;

