import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { MdAgriculture } from 'react-icons/md';
import { FaTractor, FaSearch } from 'react-icons/fa';

export default function Home() {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [rentalListings, setRentalListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const res = await fetch('/api/listing/get?featured=true&limit=4');
        const data = await res.json();
        setFeaturedListings(data);
        fetchRentalListings();
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchRentalListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentalListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchFeaturedListings();
  }, []);
  
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section with Lighter Gradient */}
      <div className='relative bg-gradient-to-br from-green-50 via-green-100 to-slate-100 py-24'>
        <div className='relative flex flex-col gap-8 px-4 max-w-6xl mx-auto text-center'>
          <div className='flex justify-center mb-4 animate-bounce'>
            <FaTractor className='text-7xl text-green-600 drop-shadow-lg' />
          </div>
          
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 drop-shadow-sm'>
            Rent or Buy 
            <span className='text-green-600'> Farm Equipment</span>
            <br className='hidden sm:block'/> With 
            <span className='text-green-500'> Farm</span>
            <span className='text-slate-800'>Tech</span>
          </h1>
          
          <div className='text-slate-600 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed'>
            Find top-quality agricultural equipment for rent or sale, designed to meet 
            the needs of modern farmers and agribusinesses.
            <br className='hidden sm:block'/>
            Get the right tools to enhance productivity and efficiency in your farming operations.
          </div>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-4'>
            <Link
              to={'/search'}
              className='bg-green-600 text-white px-8 py-4 rounded-full 
                hover:bg-green-700 transition-all duration-300 
                font-semibold text-lg inline-flex items-center gap-2
                hover:scale-105 transform hover:shadow-lg'
            >
              <FaSearch className='text-xl' />
              Explore Equipment
            </Link>
            <Link
              to={'/about'}
              className='bg-white/70 backdrop-blur-sm text-green-700 px-8 py-4 
                rounded-full hover:bg-white/90 transition-all duration-300 
                font-semibold text-lg inline-flex items-center gap-2
                hover:scale-105 transform border border-green-100'
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Swiper Section */}
      <div className='max-w-6xl mx-auto my-20 px-4'>
        <Swiper
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className='h-[550px] rounded-2xl overflow-hidden shadow-xl'
        >
          {featuredListings?.length > 0 &&
            featuredListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <Link to={`/listing/${listing._id}`}>
                  <div className='relative w-full h-full group'>
                    <img
                      src={listing.imageUrls[0]}
                      alt={listing.name}
                      className='w-full h-full object-cover transform 
                        group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                      from-black/90 via-black/60 to-transparent p-8 text-white'>
                      <h3 className='text-3xl font-bold mb-3'>{listing.name}</h3>
                      <p className='text-lg line-clamp-2 text-gray-200 mb-4'>
                        {listing.description}
                      </p>
                      <div className='flex items-center gap-4'>
                        <span className='bg-green-600 px-4 py-2 rounded-full 
                          text-sm font-semibold'>
                          {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </span>
                        <span className='text-green-400 font-bold text-xl'>
                          ₹{listing.rentalPrice.toLocaleString('en-IN')}
                          {listing.type === 'rent' && '/day'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Listing Sections with Improved Spacing */}
      <div className='max-w-6xl mx-auto p-4 flex flex-col gap-24 mb-20'>
        {/* Featured Equipment Section */}
        {featuredListings?.length > 0 && (
          <div>
            <div className='flex items-center justify-between mb-10'>
              <div className='flex items-center gap-3'>
                <MdAgriculture className='text-4xl text-green-600' />
                <h2 className='text-3xl font-bold text-slate-800'>
                  Featured Equipment
                </h2>
              </div>
              <Link 
                className='text-green-600 hover:text-green-700 font-semibold 
                  text-lg flex items-center gap-2 group'
                to={'/search?featured=true'}
              >
                View All
                <span className='text-xl transform group-hover:translate-x-1 
                  transition-transform duration-200'>→</span>
              </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {featuredListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Rental Equipment Section */}
        {rentalListings?.length > 0 && (
          <div>
            <div className='flex items-center justify-between mb-10'>
              <div className='flex items-center gap-3'>
                <FaTractor className='text-4xl text-green-600' />
                <h2 className='text-3xl font-bold text-slate-800'>
                  Available for Rent
                </h2>
              </div>
              <Link 
                className='text-green-600 hover:text-green-700 font-semibold 
                  text-lg flex items-center gap-2 group'
                to={'/search?type=rent'}
              >
                View All
                <span className='text-xl transform group-hover:translate-x-1 
                  transition-transform duration-200'>→</span>
              </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {rentalListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale Equipment Section */}
        {saleListings?.length > 0 && (
          <div>
            <div className='flex items-center justify-between mb-10'>
              <div className='flex items-center gap-3'>
                <FaTractor className='text-4xl text-green-600' />
                <h2 className='text-3xl font-bold text-slate-800'>
                  Available for Sale
                </h2>
              </div>
              <Link 
                className='text-green-600 hover:text-green-700 font-semibold 
                  text-lg flex items-center gap-2 group'
                to={'/search?type=sale'}
              >
                View All
                <span className='text-xl transform group-hover:translate-x-1 
                  transition-transform duration-200'>→</span>
              </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}