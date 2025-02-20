import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare, FaMapMarkerAlt, FaTractor, FaTools, FaMoneyBillWave } from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false); 
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
        console.log(data);
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <div className="max-w-6xl mx-auto relative group">
            <Swiper 
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              className="swiper-improved"
            >
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[600px] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.01]"
                    style={{
                      background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%), url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev !w-12 !h-12 !bg-white !rounded-full !text-green-600 !opacity-0 group-hover:!opacity-90 transition-opacity duration-300 hover:!bg-green-50"></div>
            <div className="swiper-button-next !w-12 !h-12 !bg-white !rounded-full !text-green-600 !opacity-0 group-hover:!opacity-90 transition-opacity duration-300 hover:!bg-green-50"></div>
          </div>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors duration-300">
            <FaShare
              className="text-slate-500"
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
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 shadow-md transition-opacity duration-300">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ₹{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.rentalPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / day"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.location}
            </p>
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <p className="bg-red-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    {listing.type === "rent" ? "For Rent" : "For Sale"}
                  </p>
                </div>

                {listing.discountPrice &&
                  listing.discountPrice < listing.rentalPrice && (
                    <div className="flex flex-col gap-2">
                      <p className="bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                        Special Offer!
                      </p>
                      <div className="text-sm">
                        <p className="text-gray-500 line-through">
                          Regular price: ₹
                          {listing.rentalPrice.toLocaleString("en-US")}
                          {listing.type === "rent" ? "/day" : ""}
                        </p>
                        <p className="text-green-700 font-semibold">
                          Discounted price: ₹
                          {listing.discountPrice.toLocaleString("en-US")}
                          {listing.type === "rent" ? "/day" : ""}
                        </p>
                        <p className="text-green-700">
                          Save ₹
                          {(
                            listing.rentalPrice - listing.discountPrice
                          ).toLocaleString("en-US")}
                          {listing.type === "rent" ? "/day" : ""}
                        </p>
                      </div>
                    </div>
                  )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaTractor className="text-lg" />
                {listing.category}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaTools className="text-lg" />
                {listing.condition}
              </li>
              {listing.type === "rent" && (
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaMoneyBillWave className="text-lg" />₹
                  {listing.depositAmount} refundable deposit
                </li>
              )}
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
}