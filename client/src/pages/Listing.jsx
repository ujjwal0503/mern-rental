import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare, FaMapMarkerAlt, FaTractor, FaTools, FaMoneyBillWave, FaRegClock, FaCheckCircle } from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [seller, setSeller] = useState(null);
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        fetchSeller(data.userRef);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const fetchSeller = async (userRef) => {
    try {
      const res = await fetch(`/api/user/${userRef}`);
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setSeller(data);
    } catch (error) {
      console.log('Error fetching seller:', error);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen pb-8">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
           <div className="max-w-4xl mx-auto my-6 px-4">
            <div className="relative rounded-xl overflow-hidden">
              <Swiper
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                className="h-[400px]"
              >
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <img
                      src={url}
                      alt="Listing"
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
                <div className="swiper-button-prev !w-10 !h-10 !bg-white/80 !rounded-full !text-gray-800"></div>
                <div className="swiper-button-next !w-10 !h-10 !bg-white/80 !rounded-full !text-gray-800"></div>
              </Swiper>
            </div>
          </div>

          {/* Share Button */}
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-300">
            <FaShare
              className="text-green-600"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-green-600 text-white p-2 shadow-md transition-opacity duration-300">
              Link copied!
            </p>
          )}

          <div className="max-w-4xl mx-auto p-3 my-7">
            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              {/* Title and Price Section */}
              <div className="border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {listing.name}
                </h1>
                <p className="text-2xl text-green-600 font-semibold">
                  ₹{" "}
                  {listing.offer
                    ? listing.discountPrice.toLocaleString("en-US")
                    : listing.rentalPrice.toLocaleString("en-US")}
                  {listing.type === "rent" && " / day"}
                </p>
              </div>

              {/* Seller Information Card */}
              {seller && (
                <div className="flex items-center gap-4 my-6 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="relative">
                    <img
                      src={seller.avatar || '/default-user.png'}
                      alt="Seller"
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <FaCheckCircle className="absolute bottom-0 right-0 text-green-600 text-lg bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-medium">LISTED BY</p>
                    <p className="text-lg font-semibold text-gray-800">{seller.username}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaRegClock className="text-green-600" />
                      <span>Joined {new Date(seller.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <FaMapMarkerAlt className="text-green-600 text-lg" />
                <p className="text-lg">{listing.location}</p>
              </div>

              {/* Type and Offer Tags */}
              <div className="flex gap-4 mb-6">
                <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-medium text-sm">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </span>
                {listing.offer && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium text-sm">
                    Special Offer!
                  </span>
                )}
              </div>

              {/* Offer Details */}
              {listing.offer && (
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Regular price</p>
                      <p className="text-lg line-through">
                        ₹{listing.rentalPrice.toLocaleString("en-US")}
                        {listing.type === "rent" ? "/day" : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-green-600">Special price</p>
                      <p className="text-lg font-bold text-green-600">
                        ₹{listing.discountPrice.toLocaleString("en-US")}
                        {listing.type === "rent" ? "/day" : ""}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-green-600 font-medium">
                        Save ₹{(listing.rentalPrice - listing.discountPrice).toLocaleString("en-US")}
                        {listing.type === "rent" ? "/day" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{listing.description}</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <FaTractor className="text-xl text-green-600" />
                  <span className="font-medium text-gray-700">{listing.category}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <FaTools className="text-xl text-green-600" />
                  <span className="font-medium text-gray-700">{listing.condition}</span>
                </div>
                {listing.type === "rent" && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <FaMoneyBillWave className="text-xl text-green-600" />
                    <span className="font-medium text-gray-700">
                      ₹{listing.depositAmount} deposit
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="w-full bg-green-600 text-white rounded-xl py-4 font-semibold text-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
                >
                  Contact Owner
                </button>
              )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}