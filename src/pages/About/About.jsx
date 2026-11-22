import { Leaf, Users, Target, Globe } from "lucide-react";

function About() {

  const features = [
    {
      icon: Leaf,
      title: "Fresh Agriculture",
      text: "We promote fresh and quality agricultural products."
    },
    {
      icon: Users,
      title: "Supporting Farmers",
      text: "We help farmers reach more customers."
    },
    {
      icon: Target,
      title: "Our Mission",
      text: "Making agricultural trade easier and smarter."
    },
    {
      icon: Globe,
      title: "Sustainable Future",
      text: "Building a better future through digital agriculture."
    }
  ];

  return (
    <div>

      <section className="bg-[#EAF5EC] py-20 text-center px-6">

        <p className="text-green-700 font-semibold">About AgriTech</p>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
          Growing Together
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-8">
          AgriTech is an agricultural management and marketplace platform
          connecting farmers with buyers through technology.
        </p>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000"
            alt="Agricultural field"
            className="w-full h-96 object-cover rounded-3xl"
          />

          <div>
            <p className="text-green-700 font-semibold">Who We Are</p>
            <h2 className="text-3xl font-extrabold mt-3">
              Technology Meets Agriculture
            </h2>
            <p className="text-gray-500 leading-8 mt-5">
              Our platform gives farmers a simple way to manage their
              products and gives buyers an easy way to discover fresh
              agricultural products.
            </p>
          </div>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="bg-white border p-7 rounded-2xl shadow-sm">
                <Icon className="text-green-700" size={30}/>
                <h3 className="font-bold text-lg mt-5">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-7 mt-3">{item.text}</p>
              </div>
            );
          })}

        </div>

      </section>

    </div>
  );
}

export default About;
