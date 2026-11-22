import { useContext } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, ArrowLeft } from "lucide-react";
import { MyContext } from "../../utils/MyContext";

function MyOrders() {
  const { orders } = useContext(MyContext);

  const statuses = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered"
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Confirmed":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">

      <Link
        to="/marketplace"
        className="flex items-center gap-2 text-green-700 mb-8"
      >
        <ArrowLeft size={18} />
        Back to Marketplace
      </Link>

      <h1 className="text-4xl font-extrabold text-green-900">
        My Orders
      </h1>

      <p className="text-gray-500 mt-3 mb-10">
        Track your purchases and delivery status.
      </p>

      {orders.length === 0 ? (
        <div className="bg-white p-16 text-center rounded-2xl shadow-sm">

          <ShoppingBag
            size={55}
            className="mx-auto text-gray-300 mb-5"
          />

          <h2 className="text-xl font-bold">
            No orders yet
          </h2>

          <p className="text-gray-500 mt-3">
            Your orders will appear here after checkout.
          </p>

          <Link
            to="/marketplace"
            className="inline-block mt-6 bg-green-700 text-white px-7 py-3 rounded-xl hover:bg-green-800"
          >
            Explore Marketplace
          </Link>

        </div>
      ) : (
        <div className="space-y-7">

          {orders.map((order) => {
            const currentStep = statuses.indexOf(order.status);

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
              >

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

                  <div>
                    <p className="text-sm text-gray-400">
                      Order Number
                    </p>

                    <h2 className="text-xl font-bold text-gray-900">
                      #{order.id}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>

                    <span className="font-bold text-green-800">
                      {Number(order.total).toFixed(2)} MAD
                    </span>
                  </div>

                </div>

                {/* Order items */}
                <div className="space-y-4 border-t border-gray-100 pt-6">

                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.cartQuantity}
                        </p>
                      </div>

                      <p className="font-semibold text-gray-800">
                        {(Number(item.price) * Number(item.cartQuantity)).toFixed(2)} MAD
                      </p>

                    </div>
                  ))}

                </div>

                {/* Order progress */}
                <div className="border-t border-gray-100 mt-7 pt-7">

                  <h3 className="font-bold text-gray-800 mb-6">
                    Order Progress
                  </h3>

                  <div className="grid grid-cols-4 gap-2">

                    {statuses.map((status, index) => {
                      const completed = currentStep >= index;

                      return (
                        <div key={status} className="text-center">

                          <div
                            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                              completed
                                ? "bg-green-700 text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {completed ? "✓" : index + 1}
                          </div>

                          <p className={`text-xs sm:text-sm mt-2 ${
                            completed
                              ? "text-green-800 font-bold"
                              : "text-gray-400"
                          }`}>
                            {status}
                          </p>

                        </div>
                      );
                    })}

                  </div>

                </div>

                {/* Delivery information */}
                <div className="bg-gray-50 rounded-xl p-5 mt-7">

                  <div className="flex items-center gap-2 mb-3">
                    <Package size={18} className="text-green-700" />
                    <h3 className="font-bold text-gray-800">
                      Delivery Information
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600">
                    Name: {order.customer?.fullName}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Phone: {order.customer?.phone}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Address: {order.customer?.address}, {order.customer?.city}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Payment: {order.paymentMethod}
                  </p>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default MyOrders;
