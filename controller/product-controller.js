const requests = require('../database/requets');
const { postSchema, patchSchema, schema } = require('../model/product');
const products = new requests('products', schema);

const singleGet = async (req, res) => {
  try {
    if (!req.params.id) throw new Error('id is required');

    let doc = await products.getSingleDoc(req.params.id);

    return res.json(doc);
  } catch (err) {
    let msg = err.message;

    return res.status(400).json({ msg });
  }

}

const countMethod = async (req, res) => {
  let filter = req.query.filter && JSON.parse(req.query.filter)

  const size = await products.countDocuments(filter);

  return res.json({ count: size });
}

const getMethod = async (req, res) => {
  let filter = req.query.filter && JSON.parse(req.query.filter)

  const arrRes = await products.getCollection(filter);

  return res.json(arrRes);
}

const postMethod = async (req, res) => {
  try {
    const value = await postSchema.validateAsync(req.body);
    let obj = await products.addDocument(value);

    return res.json(obj);
  } catch (err) {
    let msg = err.details ? err.details[0].message : err.msg

    if (err.details) return res.status(422).json({ msg });
    else return res.status(500).json({ msg });
  }
}

const patchMethod = async (req, res) => {
  try {
    if (req.params.id) throw new Error('id is required');

    const value = await patchSchema.validateAsync(req.body);
    await products.setDocument(req.params.id, value);

    return res.json({ msg: 'success updated' });
  } catch (err) {
    let msg = err.details ? err.details[0].message : err.message;

    if (err.details) return res.status(422).json({ msg });
    else return res.status(400).json({ msg });
  }
}

const deleteMethod = async (req, res) => {
  try {
    if (!req.params.id) throw new Error('id is required');

    await products.deleteDocument(req.params.id);

    return res.json({ msg: 'success deleted' });
  } catch (err) {
    let msg = err.message;

    return res.status(400).json({ msg });
  }
}

module.exports = {
  postMethod,
  getMethod,
  patchMethod,
  deleteMethod,
  countMethod,
  singleGet,
};