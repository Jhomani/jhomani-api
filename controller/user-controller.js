const requests = require('../database/requets');
const { registerSchema, loginSchema, patchSchema, schema } = require('../model/user');
const users = new requests('users', schema);
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const secret = require('../secret');

const singleGet = async (req, res) => {
  // try {
  //   if (!req.params.id) throw new Error('id is required');

  //   let doc = await products.getSingleDoc(req.params.id);

  //   return res.json(doc);
  // } catch (err) {
  //   let msg = err.message;

  //   return res.status(400).json({ msg });
  // }

}

const countMethod = async (req, res) => {
  // let filter = req.query.filter && JSON.parse(req.query.filter)

  // const size = await products.countDocuments(filter);

  // return res.json({ count: size });
}

const getMeUser = async (req, res) => {
  // let filter = req.query.filter && JSON.parse(req.query.filter)

  // const arrRes = await products.getCollection(filter);

  // return res.json(arrRes);
}

const getMethod = async (req, res) => {
  // let filter = req.query.filter && JSON.parse(req.query.filter)

  // const arrRes = await products.getCollection(filter);

  // return res.json(arrRes);
}

const logoutMethod = async (req, res) => {
  // let filter = req.query.filter && JSON.parse(req.query.filter)

  // const arrRes = await products.getCollection(filter);

  // return res.json(arrRes);
}

const loginMethod = async (req, res) => {
  try {
    const { password, email } = await loginSchema.validateAsync(req.body);

    const hash = await bcrypt.hash(password, 12);
    let obj = await users.addDocument({ ...other, password: hash });
    console.log(obj);

    return res.json(obj);
  } catch (err) {
    let msg = err.details ? err.details[0].message : err.msg

    if (err.details) return res.status(422).json({ msg });
    else return res.status(500).json({ msg });
  }
}

const registerMethod = async (req, res) => {
  try {
    const { password, ...other } = await registerSchema.validateAsync(req.body);

    const hash = await bcrypt.hash(password, 12);
    let obj = await users.addDocument({ ...other, password: hash });
    console.log(obj);

    return res.json(obj);
  } catch (err) {
    let msg = err.details ? err.details[0].message : err.msg

    if (err.details) return res.status(422).json({ msg });
    else return res.status(500).json({ msg });
  }
}

const patchMethod = async (req, res) => {
  // try {
  //   if (req.params.id) throw new Error('id is required');

  //   const value = await patchSchema.validateAsync(req.body);
  //   await products.setDocument(req.params.id, value);

  //   return res.json({ msg: 'success updated' });
  // } catch (err) {
  //   let msg = err.details ? err.details[0].message : err.message;

  //   if (err.details) return res.status(422).json({ msg });
  //   else return res.status(400).json({ msg });
  // }
}

const deleteMethod = async (req, res) => {
  // try {
  //   if (!req.params.id) throw new Error('id is required');

  //   await products.deleteDocument(req.params.id);

  //   return res.json({ msg: 'success deleted' });
  // } catch (err) {
  //   let msg = err.message;

  //   return res.status(400).json({ msg });
  // }
}

module.exports = {
  registerMethod,
  getMethod,
  getMeUser,
  patchMethod,
  deleteMethod,
  countMethod,
  singleGet,
  loginMethod,
  logoutMethod,
};