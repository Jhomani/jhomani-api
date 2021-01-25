const db = require('./connect');
const { schema } = require('../model/product');
const { report } = require('../router/produts');

class requests {
  constructor(collection) {
    this.nameCollection = collection;
    this.collection = db.collection(collection);
    this.skip = 0;
    this.limit = 0;
    this.fields = {};
    this.orderBy = '';
    this.include = [];
    this.where = {};
  }

  resetValues() {
    this.skip = 0;
    this.limit = 0;
    this.fields = {};
    this.orderBy = '';
    this.include = [];
    this.where = {};

    this.collection = db.collection(this.nameCollection);
  }

  setWhere() {
    for (let ele in this.where) {
      this.collection = this.collection.where(ele, '==', this.where[ele]);
    }
  }

  setFilds() {
    let selected = [];
    let unSelected = [];

    for (let ele in this.fields) {
      if (this.fields[ele]) selected.push(ele);
      else unSelected.push(ele);
    }

    if (selected.length !== 0)
      this.collection = this.collection.select(...selected);
    else {
      for (let field in schema) {
        let add = true;

        unSelected.forEach(elem => {
          if (field == elem) add = false;
        })

        if (add) selected.push(field);
      }

      this.collection = this.collection.select(...selected);
    }
  }

  setPrimitiveData() {
    if (this.skip) this.collection = this.collection.offset(this.skip);
    if (this.limit) this.collection = this.collection.limit(this.limit);
    if (this.orderBy) this.collection = this.collection.orderBy(
      this.orderBy.split(' ')[0], this.orderBy.split(' ')[1]
    );
  }

  async getCollection(filter = {}) {
    let { orderBy, skip, limit, fields, where, include } = filter;

    this.skip = skip || 0;
    this.limit = limit || 0;
    this.fields = fields || {};
    this.where = where || {};
    this.include = include || [];
    this.orderBy = orderBy;

    try {
      let resp = [];
      this.setWhere();
      this.setPrimitiveData();
      this.setFilds();

      let response = await this.collection.get();
      this.resetValues();

      response.forEach(doc => {
        resp.push({ id: doc.id, ...doc.data() })
      })

      return resp;
    } catch (error) {
      console.log(error.message)

      throw new Error('No documents');
    }
  }

  async getSingleDoc(id) {
    try {
      let resp = await this.collection.doc(id).get();

      if (!resp.exists) throw new Error();
      else return ({ id: resp.id, ...resp.data() });
    } catch (error) {
      console.log(error.message)

      throw new Error('No found document');
    }
  }

  async countDocuments(filter) {
    let { where } = filter;
    this.where = where || {};

    try {
      this.setWhere();

      let size = (await this.collection.get()).size;
      this.resetValues();

      return size;
    } catch (error) {
      console.log(error.message)

      throw new Error('No documents');
    }
  }

  async addDocument(value) {
    try {
      let res = await this.collection.add({
        ...value
      });

      return ({ ...value, id: res.id });
    } catch (error) {
      console.log(error.message)

      throw new Error('No document to update');
    }
  }

  async setDocument(id, value) {
    try {
      await this.collection.doc(id).update({
        ...value
      });
    } catch (error) {
      console.log(error.message)

      throw new Error('No document to update');
    }
  }

  async deleteDocument(id) {
    try {
      const resp = await this.collection.doc(id).get();

      if (!resp.exists) throw new Error();
      else await this.collection.doc(id).delete();
    } catch (error) {
      console.log(error.message)

      throw new Error('No document to delete');
    }
  }
}

module.exports = requests;