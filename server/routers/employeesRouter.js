const express = require('express')
const router = express.Router()
const { getEmployees } = require('../../database/helpers')

// what are the relevant routes here?
// get all employees (includes time off info, etc)

router.get('/:id', (req, res) => {
  const { id } = req.params
  // id is org id
  getEmployees(id)
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
})

module.exports = router
