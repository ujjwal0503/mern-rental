import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Listing.Controller.js
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Build search filters
    const searchFilters = {};

    // Add text search if searchTerm exists
    if (req.query.searchTerm) {
      searchFilters.$or = [
        { name: { $regex: req.query.searchTerm, $options: 'i' } },
        { description: { $regex: req.query.searchTerm, $options: 'i' } },
        { location: { $regex: req.query.searchTerm, $options: 'i' } }
      ];
    }

    // Add type filter
    if (req.query.type && req.query.type !== 'all') {
      searchFilters.type = req.query.type;
    }

    // Add category filter
    if (req.query.category && req.query.category !== '') {
      searchFilters.category = req.query.category;
    }

    // Add condition filter
    if (req.query.condition && req.query.condition !== '') {
      searchFilters.condition = req.query.condition;
    }

    // Add offer filter
    if (req.query.offer === 'true') {
      searchFilters.offer = true;  // Only show listings where offer is true
    }

    // Determine sort options
    let sortOptions = {};
    if (req.query.sort) {
      const sortField = req.query.sort === 'createdAt' ? 'createdAt' : 'rentalPrice';
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      sortOptions[sortField] = sortOrder;
    } else {
      sortOptions = { createdAt: -1 };
    }

    // Execute query
    const listings = await Listing.find(searchFilters)
      .sort(sortOptions)
      .limit(limit)
      .skip(startIndex);


    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};