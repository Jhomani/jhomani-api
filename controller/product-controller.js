const requests = require('../database/requets');
const products = new requests('products');

const singleGet = (rep, res) => {

}

const countMethod = (rep, res) => {

}

const getMethod = async (req, res) => {
  const arrRes = await products.getCollection();

  res.json(arrRes);
}

const postMethod = (req, res) => {


}

const patchMethod = (req, res) => {

}

const deleteMethod = (req, res) => {

}

module.exports = {
  postMethod,
  getMethod,
  patchMethod,
  deleteMethod,
  countMethod,
  singleGet,
};