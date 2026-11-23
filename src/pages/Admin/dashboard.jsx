import { useContext, useState } from "react";
import { MyContext } from "../../utils/MyContext";

export default function AdminDashboard() {
  const {users, products, orders, categories, addCategory, updateCategory, deleteCategory, currentUser} = useContext(MyContext);

  const [name, setName] = useState("");
  const [editing, setEditing] = useState("");

  const farmers = users.filter((u) => u.role === "Farmer");
  const buyers = users.filter((u) => u.role === "Buyer");

  return (
    <div className="max-w-7xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-extrabold text-green-900">
        Admin Dashboard
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Platform overview · {currentUser.fullName}
      </p>

      <div className="grid sm:grid-cols-4 gap-4 mb-10">
        {[
          ["Farmers", farmers.length],
          ["Buyers", buyers.length],
          ["Products", products.length],
          ["Orders", orders.length],
        ].map(([k, v]) => (
          <div className="bg-white rounded-2xl p-6 border" key={k}>
            <p className="text-gray-500">{k}</p>
            <p className="text-3xl font-bold text-green-800 mt-2">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="bg-white border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Manage categories</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (editing) {
                updateCategory(editing, name);
              } else {
                addCategory(name);
              }

              setEditing("");
              setName("");
            }}
            className="flex gap-2 mb-5"
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="border rounded-lg px-3 py-2 flex-1"
            />

            <button className="bg-green-700 text-white rounded-lg px-4">
              {editing ? "Update" : "Add"}
            </button>
          </form>

          <div className="space-y-2">
            {categories.map((c) => (
              <div
                key={c}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{c}</span>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditing(c);
                      setName(c);
                    }}
                    className="text-green-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCategory(c)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Registered farmers</h2>

          {farmers.map((f) => (
            <div key={f.id} className="border-b py-3">
              <b>{f.fullName}</b>
              <p className="text-sm text-gray-500">
                {f.email} · {f.city}
              </p>
            </div>
          ))}

          {!farmers.length && (
            <p className="text-gray-500">No farmers registered.</p>
          )}
        </section>
      </div>

      <section className="mt-10 bg-white border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">All products</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="p-3">Product</th>
                <th>Farmer</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr className="border-b" key={p.id}>
                  <td className="p-3">{p.name}</td>
                  <td>{p.farmer}</td>
                  <td>{p.category}</td>
                  <td>{p.price} MAD</td>
                  <td>
                    {p.quantity === 0 ? "Out of stock" : p.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 bg-white border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">All orders</h2>

        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b py-3 flex flex-wrap justify-between gap-2"
          >
            <span>
              #{o.id} · {o.customer?.fullName} · {o.total} MAD
            </span>

            <b className="text-green-700">{o.status}</b>
          </div>
        ))}

        {!orders.length && (
          <p className="text-gray-500">No orders yet.</p>
        )}
      </section>
    </div>
  );
}