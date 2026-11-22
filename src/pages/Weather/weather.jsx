import { useEffect, useState } from "react";
import { CloudSun, Wind, Droplets, Thermometer, MapPin, Search } from "lucide-react";

// !Convert weather codes into descriptions
function getWeatherDescription(code) {
    if (code === 0) return "Clear sky";
    if ([1, 2, 3].includes(code)) return "Partly cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if ([61, 63, 65, 66, 67].includes(code)) return "Rainy";
    if ([71, 73, 75, 77].includes(code)) return "Snowy";
    if ([80, 81, 82].includes(code)) return "Rain showers";
    if ([85, 86].includes(code)) return "Snow showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";

    return "Unknown";
}

function Weather() {
    const [search, setSearch] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    const [weather, setWeather] = useState(null);

    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    const [error, setError] = useState("");
    const [searchError, setSearchError] = useState("");

    // !Search Moroccan cities
    useEffect(() => {
        if (search.trim().length < 2) {
            setCities([]);
            setSearchError("");
            setSearching(false);
            return;
        }
        //! لإلغاء الطلب السابق عند تغيير البحث
        const controller = new AbortController();

        const searchCities = async () => {
            setSearching(true);
            setSearchError("");

            try {
                const params = new URLSearchParams({
                    name: search.trim(),
                    count: "100",
                    language: "en",
                    countryCode: "MA",
                    format: "json"
                });

                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?${params}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("City search request failed");
                }

                const data = await response.json();

                // !Keep only Moroccan locations
                const results = (data.results || []).filter(
                    (city) => city.country_code === "MA"
                );

                setCities(results);

            } catch (err) {
                if (err.name !== "AbortError") {
                    setSearchError(
                        "Unable to search cities. Check your internet connection."
                    );

                    setCities([]);

                    console.error("City search error:", err);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setSearching(false);
                }
            }
        };

        const timeout = setTimeout(searchCities, 300);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [search]);

    // !Fetch weather for selected city
    useEffect(() => {
        if (!selectedCity) return;

        const controller = new AbortController();

        const fetchWeather = async () => {
            setLoading(true);
            setError("");
            setWeather(null);

            try {
                const params = new URLSearchParams({
                    latitude: selectedCity.latitude,
                    longitude: selectedCity.longitude,
                    current:
                        "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
                    daily:
                        "temperature_2m_max,temperature_2m_min,weather_code",
                    forecast_days: "5",
                    timezone: "Africa/Casablanca"
                });

                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?${params}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Weather request failed");
                }

                const data = await response.json();

                setWeather(data);

            } catch (err) {
                if (err.name !== "AbortError") {
                    setError("Unable to load weather information.");
                    console.error("Weather error:", err);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchWeather();

        return () => controller.abort();
    }, [selectedCity]);

    const current = weather?.current;
    const daily = weather?.daily;

    // !Current weather details
    const details = current
        ? [
            {
                name: "Temperature",
                value: `${current.temperature_2m} °C`,
                icon: Thermometer
            },
            {
                name: "Humidity",
                value: `${current.relative_humidity_2m}%`,
                icon: Droplets
            },
            {
                name: "Wind Speed",
                value: `${current.wind_speed_10m} km/h`,
                icon: Wind
            }
        ]
        : [];

    return (
        <div className="max-w-7xl mx-auto px-6 py-14">

            {/* Main weather section */}
            <div className="bg-[#174D32] rounded-3xl p-10 md:p-14 text-white">

                <p className="text-green-200">
                    Weather Information
                </p>

                <h1 className="text-4xl font-extrabold mt-3">
                    Farm Weather
                </h1>

                {/* City search */}
                <div className="mt-8 max-w-md">

                    <label className="flex items-center gap-2 text-green-100 mb-2">
                        <MapPin size={18} />
                        Search for your Moroccan city
                    </label>

                    <div className="relative">

                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setSelectedCity(null);
                                setWeather(null);
                                setError("");
                                setSearchError("");
                            }}
                            placeholder="Enter city name..."
                            className="w-full bg-white text-gray-800 pl-12 pr-4 py-3 rounded-xl outline-none"
                        />

                    </div>

                    {/* Search results */}
                    {search.trim().length >= 2 && (
                        <div className="bg-white text-gray-800 rounded-xl mt-2 overflow-hidden shadow-lg max-h-60 overflow-y-auto">

                            {searching && (
                                <p className="p-4 text-gray-500">
                                    Searching...
                                </p>
                            )}

                            {searchError && (
                                <p className="p-4 text-red-500">
                                    {searchError}
                                </p>
                            )}

                            {!searching &&
                                !searchError &&
                                cities.length === 0 && (
                                    <p className="p-4 text-gray-500">
                                        No Moroccan city found.
                                    </p>
                                )}

                            {!searching &&
                                cities.map((city) => (
                                    <button
                                        key={city.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedCity(city);
                                            setSearch(city.name);
                                            setCities([]);
                                            setSearchError("");
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-green-50 transition border-b border-gray-100"
                                    >
                                        <span className="font-semibold">
                                            {city.name}
                                        </span>

                                        <span className="block text-sm text-gray-500">
                                            {city.admin1 || city.country || "Morocco"}, Morocco
                                        </span>
                                    </button>
                                ))}

                        </div>
                    )}

                </div>

                {/* Current weather */}
                {current && selectedCity && (
                    <div className="flex items-center gap-5 mt-10">

                        <CloudSun
                            size={75}
                            className="text-yellow-300"
                        />

                        <div>

                            <h2 className="text-6xl font-bold">
                                {current.temperature_2m}°
                            </h2>

                            <p className="text-green-100 mt-2">
                                {getWeatherDescription(current.weather_code)}
                            </p>

                            <p className="text-green-100">
                                Current weather in {selectedCity.name}
                            </p>

                        </div>

                    </div>
                )}

                {!selectedCity && (
                    <p className="text-green-100 mt-8">
                        Choose a city to see its weather information.
                    </p>
                )}

            </div>

            {/* Loading state */}
            {loading && (
                <p className="text-center py-12 text-gray-600">
                    Loading weather...
                </p>
            )}

            {/* Error state */}
            {error && (
                <p className="text-center py-12 text-red-500">
                    {error}
                </p>
            )}

            {/* Weather details */}
            {current && (
                <>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        {details.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.name}
                                    className="bg-white p-8 rounded-2xl shadow-sm"
                                >

                                    <Icon
                                        className="text-green-700"
                                        size={30}
                                    />

                                    <p className="text-gray-500 mt-5">
                                        {item.name}
                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">
                                        {item.value}
                                    </h2>

                                </div>
                            );
                        })}

                    </div>

                    {/* Five-day forecast */}
                    <div className="mt-12">

                        <h2 className="text-2xl font-bold text-green-900 mb-6">
                            5-Day Weather Forecast
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

                            {daily.time.map((date, index) => (
                                <div
                                    key={date}
                                    className="bg-white p-6 rounded-2xl shadow-sm text-center"
                                >

                                    <p className="text-gray-500 font-medium">
                                        {new Date(`${date}T12:00:00`).toLocaleDateString(
                                            "en-US",
                                            { weekday: "short" }
                                        )}
                                    </p>

                                    <CloudSun
                                        size={35}
                                        className="text-yellow-500 mx-auto my-4"
                                    />

                                    <p className="text-sm text-gray-500">
                                        {getWeatherDescription(
                                            daily.weather_code[index]
                                        )}
                                    </p>

                                    <div className="flex justify-center gap-3 mt-3">

                                        <span className="font-bold text-green-800">
                                            {daily.temperature_2m_max[index]}°
                                        </span>

                                        <span className="text-gray-400">
                                            {daily.temperature_2m_min[index]}°
                                        </span>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </>
            )}

        </div>
    );
}

export default Weather;

