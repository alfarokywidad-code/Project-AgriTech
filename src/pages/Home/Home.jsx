import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Users, TrendingUp, Sprout } from "lucide-react";



function Home() {



  return (
    <div>

      {/* Hero */}
      <section className="bg-[#F0F7F0]">

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">

          <div>

            <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Sprout size={17} />
              Smart Agriculture Platform
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mt-7">
              Fresh From
              <span className="text-green-700"> Farms </span>
              To Your Table.
            </h1>

            <p className="text-gray-600 text-lg leading-8 mt-6 max-w-lg">
              Discover fresh agricultural products, connect directly
              with farmers and enjoy a smarter marketplace.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/marketplace"
                className="bg-green-700 text-white px-7 py-4 rounded-xl flex items-center gap-2 hover:bg-green-800 transition shadow-lg shadow-green-900/10"
              >
                Explore Marketplace
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/about"
                className="border border-green-700 text-green-800 px-7 py-4 rounded-xl hover:bg-green-100 transition"
              >
                Learn More
              </Link>

            </div>

            <div className="grid grid-cols-3 gap-5 mt-14">

              <div>
                <Leaf className="text-green-700 mb-2" />
                <h3 className="font-extrabold text-2xl">500+</h3>
                <p className="text-gray-500 text-sm">Products</p>
              </div>

              <div>
                <Users className="text-green-700 mb-2" />
                <h3 className="font-extrabold text-2xl">200+</h3>
                <p className="text-gray-500 text-sm">Farmers</p>
              </div>

              <div>
                <TrendingUp className="text-green-700 mb-2" />
                <h3 className="font-extrabold text-2xl">95%</h3>
                <p className="text-gray-500 text-sm">Satisfaction</p>
              </div>

            </div>

          </div>

          <div className="relative">

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000"
              alt="Fresh vegetables"
              className="w-full h-[420px] md:h-[520px] object-cover rounded-[32px] shadow-2xl"
            />

            <div className="absolute bottom-6 left-6 bg-white p-5 rounded-2xl shadow-xl">
              <p className="text-gray-500 text-sm">Fresh Products</p>
              <p className="text-green-800 font-bold text-xl">
                Direct from farmers
              </p>
            </div>

          </div>

        </div>

      </section>

      

      {/* Why AgriTech */}
      <section className="bg-[#F0F7F0] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-green-700 font-semibold">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
              Better Agriculture, Better Future
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                icon: "🌱",
                title: "Fresh Products",
                desc: "Discover quality agricultural products directly from farms."
              },
              {
                icon: "🤝",
                title: "Direct Connection",
                desc: "Connect farmers and buyers in one simple platform."
              },
              {
                icon: "📈",
                title: "Smart Management",
                desc: "Help farmers manage their products and sales easily."
              }
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-2xl text-center shadow-sm">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="font-bold text-xl mt-5">{item.title}</h3>
                <p className="text-gray-500 leading-7 mt-3">{item.desc}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
