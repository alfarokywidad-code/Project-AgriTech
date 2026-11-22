
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/MyContext";

const blank = {
    name: "",
    price: "",
    quantity: "",
    category: "Vegetables",
    region: "Fes",
    unit: "kg",
    description: "",
    image: "",
};

export default function FarmerDashboard() {
    const {
        products,
        orders,
        currentUser,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
    } = useContext(MyContext);

    const mine = products.filter(
        (p) => p.farmerId === currentUser.id
    );

    const myOrders = orders.filter((o) =>
        o.items.some((i) => i.farmerId === currentUser.id)
    );

    const sales = myOrders.reduce(
        (sum, o) =>
            sum +
            o.items
                .filter((i) => i.farmerId === currentUser.id)
                .reduce(
                    (sub, i) =>
                        sub + Number(i.price) * Number(i.cartQuantity),
                    0
                ),
        0
    );

    const [form, setForm] = useState(blank);
    const [editing, setEditing] = useState(null);

    const save = (e) => {
        e.preventDefault();

        editing
            ? updateProduct(editing, form)
            : addProduct(form);

        setForm(blank);
        setEditing(null);
    };

    const edit = (p) => {
        setEditing(p.id);

        setForm({
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            category: p.category,
            region: p.region || currentUser.city,
            unit: p.unit || "kg",
            description: p.description || "",
            image: p.image || blank.image,
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-5 py-12">
            <h1 className="text-3xl font-extrabold text-green-900">
                Farmer Dashboard
            </h1>

            <p className="text-gray-500 mt-2 mb-8">
                Welcome, {currentUser.fullName}
            </p>

            <div className="grid sm:grid-cols-4 gap-4 mb-6">
                {[
                    ["My products", mine.length],
                    ["Sales", `${sales.toFixed(2)} MAD`],
                    ["Orders received", myOrders.length],
                    ["Low stock", mine.filter((p) => p.quantity <= 10).length],
                ].map(([k, v]) => (
                    <div
                        className="bg-white rounded-2xl p-6 border"
                        key={k}
                    >
                        <p className="text-gray-500">{k}</p>
                        <p className="text-2xl font-bold text-green-800 mt-2">
                            {v}
                        </p>
                    </div>
                ))}
            </div>

            <Link
                to="/weather"
                className="inline-flex bg-green-50 text-green-800 rounded-xl px-4 py-3 mb-8 font-semibold"
            >
                Check the weather forecast for your farm
            </Link>

            <div className="grid lg:grid-cols-2 gap-8">
                <section className="bg-white border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-5">
                        {editing ? "Edit product" : "Add a product"}
                    </h2>

                    <form
                        onSubmit={save}
                        className="grid sm:grid-cols-2 gap-3"
                    >
                        {[
                            ["Product name", "name"],
                            ["Price (MAD)", "price"],
                            ["Stock quantity", "quantity"],
                            ["Region", "region"],
                            ["Unit", "unit"],
                        ].map(([label, key]) => (
                            <label
                                key={key}
                                className="text-sm font-medium"
                            >
                                {label}

                                <input
                                    required
                                    type={
                                        key === "price" || key === "quantity"
                                            ? "number"
                                            : "text"
                                    }
                                    min={
                                        key === "price"
                                            ? "0.01"
                                            : key === "quantity"
                                                ? "0"
                                                : undefined
                                    }
                                    className="w-full border rounded-lg p-2 mt-1"
                                    value={form[key]}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [key]: e.target.value,
                                        })
                                    }
                                />
                            </label>
                        ))}

                        <label className="text-sm font-medium">
                            Category

                            <select
                                className="w-full border rounded-lg p-2 mt-1"
                                value={form.category}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        category: e.target.value,
                                    })
                                }
                            >
                                {categories.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </label>

                        <label className="text-sm font-medium sm:col-span-2">
                            Image URL

                            <input
                                className="w-full border rounded-lg p-2 mt-1"
                                value={form.image}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        image: e.target.value,
                                    })
                                }
                            />
                        </label>

                        <label className="text-sm font-medium sm:col-span-2">
                            Description

                            <textarea
                                className="w-full border rounded-lg p-2 mt-1"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </label>

                        <button className="bg-green-700 text-white rounded-lg p-3">
                            {editing ? "Save changes" : "Add product"}
                        </button>

                        {editing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditing(null);
                                    setForm(blank);
                                }}
                                className="border rounded-lg p-3"
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">
                        My products
                    </h2>

                    <div className="space-y-3">
                        {mine.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white border rounded-xl p-4 flex gap-3 items-center"
                            >
                                <img
                                    src={p.image}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />

                                <div className="flex-1">
                                    <b>{p.name}</b>

                                    <p className="text-sm text-gray-500">
                                        {p.price} MAD · Stock: {p.quantity} · {p.region}
                                    </p>

                                    {p.quantity <= 10 && (
                                        <span className="text-xs text-red-600">
                                            Low stock alert
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={() => edit(p)}
                                    className="text-green-700"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteProduct(p.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                        {!mine.length && (
                            <p className="text-gray-500">
                                You have not added any products yet.
                            </p>
                        )}
                    </div>
                </section>
            </div>

            <section className="mt-12">
                <h2 className="text-xl font-bold mb-4">
                    Orders received
                </h2>

                <div className="space-y-3">
                    {myOrders.map((o) => (
                        <div
                            key={o.id}
                            className="bg-white border rounded-xl p-5"
                        >
                            <div className="flex flex-wrap justify-between gap-3">
                                <b>Order #{o.id}</b>

                                <span className="text-green-700 font-semibold">
                                    {o.status}
                                </span>
                            </div>

                            <p className="text-sm text-gray-500 mt-2">
                                {o.items
                                    .filter((i) => i.farmerId === currentUser.id)
                                    .map((i) => `${i.name} × ${i.cartQuantity}`)
                                    .join(", ")}
                            </p>

                            <p className="text-sm mt-1">
                                Customer: {o.customer?.fullName} ·{" "}
                                {o.customer?.phone}
                            </p>

                            <div className="flex gap-2 mt-4">
                                {o.status === "Pending" && (
                                    <button
                                        onClick={() =>
                                            updateOrderStatus(o.id, "Confirmed")
                                        }
                                        className="bg-green-700 text-white rounded-lg px-4 py-2"
                                    >
                                        Confirm
                                    </button>
                                )}

                                {o.status === "Confirmed" && (
                                    <button
                                        onClick={() =>
                                            updateOrderStatus(o.id, "Shipped")
                                        }
                                        className="bg-green-700 text-white rounded-lg px-4 py-2"
                                    >
                                        Mark shipped
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {!myOrders.length && (
                        <p className="text-gray-500">
                            No orders received yet.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
