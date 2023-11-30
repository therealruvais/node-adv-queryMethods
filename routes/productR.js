const express = require("express");
const router = express.Router();

const {
  getAllProducts,
} = require("../controller/productC");

router.route("/").get(getAllProducts);


module.exports = router;
