import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#123B29] text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Leaf className="text-green-400" />
            AgriTech
          </div>

          <p className="text-green-100/70 mt-5 leading-7 max-w-sm">
            Connecting farmers and buyers to create a smarter,
            fresher and more sustainable agricultural future.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-5">Quick Links</h3>
          <div className="flex flex-col gap-3 text-green-100/70">
            <Link to="/">Home</Link>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/about">About Us</Link>
            <Link to="/weather">Weather</Link>
            <Link to="/dashboard">Farmer Dashboard</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-5">Contact Us</h3>

          <p className="text-green-100/70 mb-4">
            Have questions? Contact our team.
          </p>

          <p className="flex items-center gap-2 text-green-100/70">
           
            contact@agritech.com
          </p>

          <div className="flex gap-4 mt-6">
   
          </div>
        </div>

      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-green-100/60">
        © 2026 AgriTech. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
