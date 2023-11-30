const Product = require("../model/productM");

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, select, numericValues } = req.query;
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = { $regex: company, $options: "i" };
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  if (numericValues) {
    const operator = {
      "<": "$lt",
      ">": "$gt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };
    const regX = /\b(>|<|<=|>=|=)\b/g;
    let filters = numericValues.replace(
      regX,
      (match) => `-${operator[match]}-`
    );

    console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObj);
  if (sort) {
    const mySort = sort.split(",").join(" ");
    result = result.sort(mySort);
  }
  if (select) {
    const mySelect = select.split(",").join(" ");
    result = result.select(mySelect);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbhits: products.length });
};

module.exports = {
  getAllProducts,
};
