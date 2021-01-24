const db = require('./connect');

class requests {
  constructor(collection) {
    this.collection = db.collection(collection);
    this.skip = 0;
    this.offset = 0;
    this.limit = 0;
    this.fields = {};
    this.include = [];
    this.where = [];
  }

  async getCollection({ skip, offset, limit, fields, where, include } = {}) {
    this.skip = skip || 0;
    this.limit = limit || 0;
    this.offset = offset || 0;
    this.fields = fields || {};
    this.where = where || [];
    this.include = include || [];

    try {
      let resp = [];
      let response = await this.collection.get();

      response.forEach(doc => {
        resp.push({ id: doc.id, ...doc.data() })
      })

      console.log(resp)
      return resp;
    } catch (error) {
      console.log(error)
    }
  }

  async addDocument(data) {
    try {
      let res = await this.collection.add({
        ...data
      });

      return ({ ...data, id: res.id });
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = requests;