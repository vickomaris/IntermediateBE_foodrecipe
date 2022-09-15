const recipeModel = require('../model/recipe.model')

const recipeController = {
  list: (req, res) => {
    recipeModel.selectAll()
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        res.json(err)
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    recipeModel.selectDetail(id).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  detailTitle: (req, res) => {
    const title = req.params.title
    recipeModel.selectDetailTitle(title).then((result) => {
      res.json(result.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
    const { id, photo, title, ingredients, video } = req.body
    recipeModel.store(id, photo, title, ingredients, video).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
  },
  update: (req, res) => {
    const { photo, title, ingredients, video } = req.body
    const id = req.params.id
    recipeModel.update(id, photo, title, ingredients, video).then((result) => {
      res.json(result)
    }).catch((err) => {
      res.json(err)
    })
  },
  destroy: (req, res) => {
    const { id } = req.params
    recipeModel
      .destroy(id)
      .then((result) => {
        res.json({
          message: 'berhasil dihapus',
          data: result
        })
      }).catch((err) => {
        res.json(err)
      })
  }
}

module.exports = recipeController