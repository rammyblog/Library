/* eslint-disable arrow-parens */
const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadService');

const parser = xml2js.Parser({ explicitArray: false });
function bookService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://www.goodreads.com/book/show/${id}.json?key=rMpkMFbXRLYMzetv40eog`
        )
        .then(res => {
          parser.parseString(res.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch(error => {
          reject(error);
          debug(error);
        });
    });
  }
  return { getBookById };
}
module.exports = bookService();
