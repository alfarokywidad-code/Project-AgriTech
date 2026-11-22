import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../utils/MyContext";

export default function Register() {

  // Get the register function from the global context
  const { register } = useContext(MyContext);

  // Initialize navigation
  const nav = useNavigate();

  // Store registration form data
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Buyer",
    city: "Al Hoceima"
  });

  // Store registration error messages
  const [error, setError] = useState("");

  // Handle form submission
  const submit = (e) => {
    e.preventDefault();

    // Call register function with form data
    const r = register(form);

    // Check if registration failed
    if (r.error) {
      setError(r.error);
    } else {

      // Redirect user based on their account role
      nav(
        r.user.role === "Farmer"
          ? "/farmer/dashboard"
          : "/marketplace"
      );
    }
  };

  return (
    // Main container
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">

      {/* Registration form */}
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm"
      >

        {/* Page title */}
        <h1 className="text-3xl font-bold text-green-900">
          Create account
        </h1>

        {/* Page description */}
        <p className="text-gray-500 mt-2 mb-7">
          Join the AgriTech community.
        </p>

        {/* Display error message if registration fails */}
        {error && (
          <p className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Registration input fields */}
        {[
          ["Full name", "fullName", "text"],
          ["Email", "email", "email"],
          ["Password", "password", "password"],
          ["Your city", "city", "text"]
        ].map(([label, key, type]) => (

          // Generate input fields dynamically
          <label
            key={key}
            className="block text-sm font-semibold mb-2"
          >
            {label}

            <input
              required
              type={type}
              minLength={key === "password" ? 6 : undefined}
              className="w-full border rounded-xl p-3 mt-2 mb-4"
              value={form[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]: e.target.value
                })
              }
            />
          </label>
        ))}

        {/* Account type selection */}
        <label className="block text-sm font-semibold mb-2">
          Account type
        </label>

        <select
          className="w-full border rounded-xl p-3 mb-6"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value
            })
          }
        >
          <option>Buyer</option>
          <option>Farmer</option>
        </select>

        {/* Create account button */}
        <button className="w-full bg-green-700 text-white rounded-xl py-3 font-semibold">
          Create account
        </button>

        {/* Link to login page */}
        <p className="text-center text-gray-500 mt-5">
          Already registered?{" "}
          <Link
            className="text-green-700 font-semibold"
            to="/login"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}
