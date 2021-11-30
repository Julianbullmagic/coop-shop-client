const Store = require('../models/store');

exports.createStore = async (req, res, next) => {
  console.log("creating store")
  console.log("req.body.store",req.body)

  try {
    const store = await Store.create(req.body);
    console.log("store",store)

    res.status(200).json(store);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editStore = async (req, res, next) => {
  console.log("edit store",req.body)
  try {
    const store = await Store.edit(req.body);
    console.log("store",store)

    res.status(200).json(store);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.deleteStore = async (req, res, next) => {
  console.log("deleting store",req.params)

  try {
    await Store.delete(req.params.storeid);

    res.status(200)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};




exports.deleteListingsForStore = async (req, res, next) => {
  console.log("deleteListingsForStore",req.params)

  try {
    await Store.deleteListingsForStore(req.params.storeid);

    res.status(200)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

exports.deleteListing = async (req, res, next) => {
  console.log("deleting listing",req.params)

  try {
    await Store.deleteListing(req.params.listingid);

    res.status(200)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};


exports.fetchUserStore = async (req, res, next) => {
  console.log("fetching user store",req.params.userid)

  try {
    const store = await Store.fetchUserStore(req.params.userid)
    console.log("store",store)

    res.status(200).json(store);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};




exports.getAllStores = async (req, res, next) => {
  console.log("getting all stores")

  try {
    const [allStores] = await Store.fetchAll();
    console.log("stores",allStores)

    res.status(200).json(allStores);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRandomTenStores = async (req, res, next) => {
  console.log("getting ten stores")

  try {
    const [tenStores] = await Store.fetchRandomTen();
    console.log("stores",tenStores)

    res.status(200).json(tenStores);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.search = async (req, res, next) => {
  console.log("searching stores")

  try {
    const [stores] = await Store.search(req.params.search);
    console.log("stores",stores)

    res.status(200).json(stores);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
exports.searchbycategory = async (req, res, next) => {
  console.log("searching stores by category")

  try {
    const [stores] = await Store.searchbycategory(req.params.search,req.params.category);
    console.log("stores",stores)

    res.status(200).json(stores);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getstoresbycategory= async (req, res, next) => {
  console.log("random ten Stores by category",req.params.category)
  try {
    const [tenStores] = await Store.fetchRandomTenByCategory(req.params.category)
    res.status(200).json(tenStores);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchStore = async (req, res, next) => {
  console.log("fetching store")

  try {
    const [store] = await Store.fetchStore(req.params.id);
    console.log("store",store)

    res.status(200).json(store);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
