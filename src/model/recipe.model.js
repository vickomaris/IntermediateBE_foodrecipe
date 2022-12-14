/* eslint-disable camelcase */

const db = require('../config/db')

const recipeModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tb_recipes ORDER BY title ASC', (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // lihat data by id
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_recipes WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // lihat data by title
  selectDetailTitle: (title) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM tb_recipes WHERE title LIKE '%${title}%'`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // update
  update: (id, title, ingredients, photo, video, created_at) => new Promise((resolve, reject) => {
    db.query(`UPDATE tb_recipes SET 
    title = COALESCE ($1, title), 
    ingredients = COALESCE ($2, ingredients), 
    photo = COALESCE ($3, photo), 
    video = COALESCE ($4, video), 
    created_at = COALESCE ($5, created_at) WHERE id = $6`,
    [title, ingredients, photo, video, created_at, id], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),

  // router insert
  // store: (title, ingredients, photo, video, created_at) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`INSERT INTO tb_recipes(title, ingredients, photo, video, created_at) VALUES ( '${title}', '${ingredients}', '${photo}', '${video}', '${created_at}')`,
  //       (err, res) => {
  //         if (err) {
  //           reject(err)
  //         }
  //         resolve(res)
  //       })
  //   })
  // },

  // insert food photo
  store: ({ title, ingredients, photo, video, created_at }) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO tb_recipes ( title, ingredients, photo, video, created_at) VALUES  ('${title}', '${ingredients}', '${photo}', '${video}', '${created_at}')`,
        (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  },

  // delete by id
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM tb_recipes WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
}

module.exports = recipeModel
