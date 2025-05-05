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
    <div className='min-h-screen bg-white'>
      {/* Hero Section with Clean Design */}
      <div className='relative bg-white py-24 border-b border-gray-100'>
        <div className='relative flex flex-col gap-8 px-4 max-w-6xl mx-auto text-center'>
          <div className='flex justify-center mb-4'>
            <FaTractor className='text-6xl text-green-600' />
          </div>
          
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900'>
            Rent or Buy 
            <span className='text-green-600'> Farm Equipment</span>
            <br className='hidden sm:block'/> With 
            <span className='text-green-600'> Farm</span>
            <span className='text-gray-900'>Tech</span>
          </h1>
          
          <div className='text-gray-500 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed'>
            Find top-quality agricultural equipment for rent or sale, designed to meet 
            the needs of modern farmers and agribusinesses.
            <br className='hidden sm:block'/>
            Get the right tools to enhance productivity and efficiency in your farming operations.
          </div>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-4'>
            <Link
              to={'/search'}
              className='bg-green-600 text-white px-8 py-4 rounded-lg 
                hover:bg-green-700 transition-all duration-300 
                font-semibold text-lg inline-flex items-center gap-2
                shadow-md'
            >
              <FaSearch className='text-xl' />
              Explore Equipment
            </Link>
            <Link
              to={'/about'}
              className='bg-white text-green-700 px-8 py-4 
                rounded-lg hover:bg-gray-50 transition-all duration-300 
                font-semibold text-lg inline-flex items-center gap-2
                border border-gray-200 shadow-sm'
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Slider Section */}
      <div className='max-w-6xl mx-auto my-16 px-4'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Featured Equipment</h2>
          <div className='h-1 w-20 bg-green-600'></div>
        </div>
        
        <Swiper
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className='h-[500px] rounded-lg overflow-hidden shadow-lg'
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
                      from-black/80 via-black/50 to-transparent p-8 text-white'>
                      <h3 className='text-3xl font-bold mb-2'>{listing.name}</h3>
                      <p className='text-lg line-clamp-2 text-gray-200 mb-3'>
                        {listing.description}
                      </p>
                      <div className='flex items-center gap-4'>
                        <span className='bg-green-600 px-4 py-2 rounded-md 
                          text-sm font-semibold'>
                          {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </span>
                        <span className='text-white font-bold text-xl'>
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

      {/* Listing Sections with Premium Design */}
      <div className='max-w-6xl mx-auto px-4 flex flex-col gap-20 mb-20'>
        {/* Featured Equipment Section */}
        {featuredListings?.length > 0 && (
          <div>
            <div className='flex items-center justify-between mb-8 border-b border-gray-100 pb-4'>
              <div className='flex items-center gap-3'>
                <MdAgriculture className='text-3xl text-green-600' />
                <h2 className='text-2xl font-bold text-gray-900'>
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
                <div key={listing._id} className="flex justify-center">
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rental Equipment Section */}
        {rentalListings?.length > 0 && (
          <div>
            <div className='flex items-center justify-between mb-8 border-b border-gray-100 pb-4'>
              <div className='flex items-center gap-3'>
                <FaTractor className='text-3xl text-green-600' />
                <h2 className='text-2xl font-bold text-gray-900'>
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
                <div key={listing._id} className="flex justify-center">
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sale Equipment Section */}
        {saleListings?.length > 0 && (
          <div>
            <div className='flex items-center justify-between mb-8 border-b border-gray-100 pb-4'>
              <div className='flex items-center gap-3'>
                <FaTractor className='text-3xl text-green-600' />
                <h2 className='text-2xl font-bold text-gray-900'>
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
                <div key={listing._id} className="flex justify-center">
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Premium Footer Banner */}
      <div className='bg-gray-50 py-16 border-t border-gray-100'>
        <div className='max-w-6xl mx-auto px-4 flex flex-col items-center text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>Ready to Upgrade Your Farming Equipment?</h2>
          <p className='text-gray-500 mb-8 max-w-2xl'>
            Browse our extensive catalog of premium farming equipment. 
            Whether you're looking to rent or buy, we have options to suit every need and budget.
          </p>
          <Link
            to={'/search'}
            className='bg-green-600 text-white px-8 py-4 rounded-lg 
              hover:bg-green-700 transition-all duration-300 
              font-semibold text-lg inline-flex items-center gap-2
              shadow-md'
          >
            <FaSearch className='text-xl' />
            Start Searching
          </Link>
        </div>
      </div>
    </div>
    
  );
}