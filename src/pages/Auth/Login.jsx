
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../utils/MyContext";

export default function Login() {

  // Get the login function from the global context
  const { login } = useContext(MyContext);

  // Initialize navigation
  const nav = useNavigate();

  // Store email and password form data
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // Store login error messages
  const [error, setError] = useState("");

  // Handle form submission
  const submit = (e) => {
    e.preventDefault();

    // Call login function with form data
    const result = login(form);

    // Check if login failed
    if (result.error) {
      setError(result.error);
    } else {

      // Redirect user based on their role
      nav(
        result.user.role === "Farmer"
          ? "/farmer/dashboard"
          : result.user.role === "Admin"
          ? "/admin/dashboard"
          : "/marketplace"
      );
    }
  };

  return (
    // Main container
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">

      {/* Login form */}
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm"
      >

        {/* Page title */}
        <h1 className="text-3xl font-bold text-green-900">
          Welcome back
        </h1>

        {/* Page description */}
        <p className="text-gray-500 mt-2 mb-7">
          Login to your AgriTech account.
        </p>

        {/* Display error message if login fails */}
        {error && (
          <p className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Email input */}
        <label className="block text-sm font-semibold mb-2">
          Email
        </label>

        <input
          required
          type="email"
          className="w-full border rounded-xl p-3 mb-5"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password input */}
        <label className="block text-sm font-semibold mb-2">
          Password
        </label>

        <input
          required
          type="password"
          className="w-full border rounded-xl p-3 mb-6"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Login button */}
        <button className="w-full bg-green-700 text-white rounded-xl py-3 font-semibold">
          Login
        </button>

        {/* Link to registration page */}
        <p className="text-center text-gray-500 mt-5">
          No account?{" "}
          <Link
            className="text-green-700 font-semibold"
            to="/register"
          >
            Create one
          </Link>
        </p>

        {/* Demo admin credentials */}
        <p className="text-xs text-gray-400 mt-5">
          Demo admin: admin@agritech.com / Admin123!
        </p>

      </form>
    </div>
  );
}
