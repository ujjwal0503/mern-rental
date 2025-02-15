export default function CreateListing() {
    return (
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          List Agricultural Equipment
        </h1>
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Equipment Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="5"
              required
            />
            <textarea
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="border p-3 rounded-lg"
              id="location"
              required
            />
            
            {/* Category Dropdown */}
            <select className="border p-3 rounded-lg" id="category" required>
              <option value="">Select Equipment Category</option>
              <option value="Tractor">Tractor</option>
              <option value="Harvester">Harvester</option>
              <option value="Plow">Plow</option>
              <option value="Seeder">Seeder</option>
              <option value="Irrigation System">Irrigation System</option>
              <option value="Other">Other</option>
            </select>
  
            {/* Checkboxes */}
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" id="available" className="w-5" />
                <span>Available for Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5" />
                <span>For Sale</span>
              </div>
            </div>
  
            {/* Condition Dropdown */}
            <select className="border p-3 rounded-lg" id="condition" required>
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Needs Repair">Needs Repair</option>
            </select>
  
            {/* Pricing Inputs */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="rentalPrice"
                  min="1"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Rental Price</p>
                  <span className="text-xs">(₹ / day)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="depositAmount"
                  min="0"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Deposit Amount</p>
                  <span className="text-xs">(₹ refundable)</span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Image Upload Section */}
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                Upload
              </button>
            </div>
            <button className="p-3 bg-green-500 text-white rounded-lg uppercase hover:opacity-75 disabled:opacity-55">
              Create Listing
            </button>
          </div>
        </form>
      </main>
    );
  }
  