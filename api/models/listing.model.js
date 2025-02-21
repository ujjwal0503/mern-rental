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
    location: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: true,
    },
    rentalPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
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