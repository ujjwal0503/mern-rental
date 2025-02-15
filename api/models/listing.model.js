import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rentalPricePerDay: {
      type: Number,
      required: true,
    },
    depositAmount: {
      type: Number,
      required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Tractor', 'Harvester', 'Plow', 'Seeder', 'Irrigation System', 'Other'], // Predefined categories
    },
    condition: {
        type: String,
        required: true,
        enum: ['New', 'Good', 'Average', 'Needs Repair'], // Equipment condition
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;