import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('all');
  const [offer, setOffer] = useState(false);
  const [sort, setSort] = useState('createdAt_desc');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    
    urlParams.set('searchTerm', searchTerm);
    urlParams.set('type', type);
    urlParams.set('offer', offer);
    urlParams.set('sort', sort);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Sync URL params with form state
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');

    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
    if (typeFromUrl) setType(typeFromUrl);
    if (offerFromUrl) setOffer(offerFromUrl === 'true');
    if (sortFromUrl) setSort(sortFromUrl);
  }, [location.search]);

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          {/* Search Term Input */}
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Equipment Type Selection */}
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                checked={type === 'all'}
                onChange={() => setType('all')}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                checked={type === 'rent'}
                onChange={() => setType('rent')}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                checked={type === 'sale'}
                onChange={() => setType('sale')}
              />
              <span>Sale</span>
            </div>
          </div>

          {/* Offer Checkbox */}
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='offer'
              className='w-5'
              checked={offer}
              onChange={(e) => setOffer(e.target.checked)}
            />
            <span>Offer</span>
          </div>

          {/* Equipment Category */}
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <select 
              className='border rounded-lg p-3 w-full'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Tractor">Tractor</option>
              <option value="Harvester">Harvester</option>
              <option value="Plow">Plow</option>
              <option value="Seeder">Seeder</option>
              <option value="Irrigation System">Irrigation System</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select 
              id='sort_order' 
              className='border rounded-lg p-3'
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value='rentalPrice_desc'>Price high to low</option>
              <option value='rentalPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>

          <button className='bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
      </div>
    </div>
  );
}