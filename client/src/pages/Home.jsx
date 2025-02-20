import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [featuredEquipments, setFeaturedEquipments] = useState([]);
  const [rentalEquipments, setRentalEquipments] = useState([]);
  const [saleEquipments, setSaleEquipments] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(featuredEquipments);

  useEffect(() => {
    const fetchFeaturedEquipments = async () => {
      try {
        const res = await fetch('/api/equipment/get?featured=true&limit=4');
        const data = await res.json();
        setFeaturedEquipments(data);
        fetchRentalEquipments();
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchRentalEquipments = async () => {
      try {
        const res = await fetch('/api/equipment/get?type=rent&limit=4');
        const data = await res.json();
        setRentalEquipments(data);
        fetchSaleEquipments();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleEquipments = async () => {
      try {
        const res = await fetch('/api/equipment/get?type=sale&limit=4');
        const data = await res.json();
        setSaleEquipments(data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchFeaturedEquipments();
  }, []);
  
  return (
    <div>
      {/* Top Section */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-gray-600 font-bold text-3xl lg:text-6xl'>
          Rent or Buy <span className='text-green-700'>Farm Equipments</span>
          <br /> With Ease with <span className='text-green-500'>Farm</span>
          <span className='text-slate-700'>Tech</span>
        </h1>
        <div className='text-gray-500 text-xs sm:text-sm'>
        Find top-quality agricultural equipment for rent or sale, designed to meet the needs of farmers and agribusinesses.
        <br/>
        Get the right tools to enhance productivity and efficiency in your farming operations.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-green-500 font-bold hover:underline'
        >
          Get Started...
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {featuredEquipments?.length > 0 &&
          featuredEquipments.map((equipment) => (
            <SwiperSlide key={equipment._id}>
              <div
                style={{
                  background: `url(${equipment.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Equipment Listings */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {featuredEquipments?.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Featured Equipment</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?featured=true'}>See More</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {featuredEquipments.map((equipment) => (
                <EquipmentItem equipment={equipment} key={equipment._id} />
              ))}
            </div>
          </div>
        )}

        {rentalEquipments?.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Available for Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>See More</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentalEquipments.map((equipment) => (
                <EquipmentItem equipment={equipment} key={equipment._id} />
              ))}
            </div>
          </div>
        )}

        {saleEquipments?.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Available for Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>See More</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleEquipments.map((equipment) => (
                <EquipmentItem equipment={equipment} key={equipment._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}