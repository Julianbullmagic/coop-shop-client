const Listing = require('../models/listing');

exports.createListing = async (req, res, next) => {
  console.log("creating listing")
  console.log("req.body.listing",req.body)

  try {
    const listing = await Listing.create(req.body);
    console.log("listing",listing)

    res.status(200).json(listing);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.editListing = async (req, res, next) => {
  console.log("editing listing",req.body)

  try {
    const listing = await Listing.edit(req.body);
    console.log("listing",listing)

    res.status(200).json(listing);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteListing = async (req, res, next) => {
  console.log("deleteing listing",req.params.listingid)

  try {
   await Listing.delete(req.params.listingid);

    res.status(200)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchListingsForShop = async (req, res, next) => {
  console.log("req.body",req.params)
  try {
    const [listings] = await Listing.fetchListingsForShop(req.params.storeid);
    res.status(200).json(listings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllListings = async (req, res, next) => {
  try {
    const [allGroceries] = await Listing.fetchAll();
    res.status(200).json(allGroceries);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRandomTenListings = async (req, res, next) => {
  try {
    const [allGroceries] = await Listing.fetchRandomTen()
    res.status(200).json(allGroceries);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.search = async (req, res, next) => {
  console.log("searching stores")

  try {
    const [listings] = await Listing.search(req.params.search);

    res.status(200).json(listings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.searchbystore = async (req, res, next) => {
  console.log("searching stores")

  try {
    const [listings] = await Listing.searchbystore(req.params.storeid,req.params.search);

    res.status(200).json(listings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}



exports.searchbycategory = async (req, res, next) => {
  console.log("searching listings by category")

  try {
    const [listings] = await Listing.searchbycategory(req.params.search,req.params.category);

    res.status(200).json(listings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.searchbystorecategory = async (req, res, next) => {
  console.log("searching listings by category")

  try {
    const [listings] = await Listing.searchbystorecategory(req.params.storeid,req.params.search,req.params.category);

    res.status(200).json(listings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}


exports.getcategoriesforshop = async (req, res, next) => {
  console.log("searching stores for categories")

  try {
    const [categories] = await Listing.getCategoriesForShop(req.params.storeid)
    console.log("categories",categories)
    res.status(200).json(categories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getcategories = async (req, res, next) => {
  console.log("getting categories")

  try {
    const [categories] = await Listing.getCategories()
    console.log("categories",categories)
    res.status(200).json(categories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}


exports.randomtenlistingsfromshop = async (req, res, next) => {
  console.log("random ten listings from shop",req.params.id)
  try {
    const [tenListings] = await Listing.fetchRandomTenFromShop(req.params.id)
    res.status(200).json(tenListings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getlistingsfromshopbycategory = async (req, res, next) => {
  console.log("random ten listings from shop by category",req.params.storeid,req.params.category)
  try {
    const [tenListings] = await Listing.fetchRandomTenFromShopByCategory(req.params.storeid,req.params.category)
    res.status(200).json(tenListings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getlistingsbycategory= async (req, res, next) => {
  console.log("random ten listings by category",req.params.category)
  try {
    const [tenListings] = await Listing.fetchRandomTenByCategory(req.params.category)
    res.status(200).json(tenListings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.fetchlisting = async (req, res, next) => {
  console.log("listing",req.params.id)
  try {
    const [listing] = await Listing.fetchListing(req.params.id)
    res.status(200).json(listing);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postListing = async (req, res, next) => {
  try {
    const postResponse = await Listing.post(req.body.item);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addListing = async (req, res, next) => {
  try {
    const postResponse = await Listing.post(req.body.item);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putListing = async (req, res, next) => {
  try {
    const putResponse = await Listing.update(req.body.id, req.body.item);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteListing = async (req, res, next) => {
  try {
    const deleteResponse = await Listing.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
