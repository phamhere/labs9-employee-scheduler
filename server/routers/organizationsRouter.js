const express = require('express')
const router = express.Router()
const {
  getOrgs,
  addOrg,
  updateOrg,
  deleteOrg
} = require('../../database/helpers')

router.get('/', (req, res) => {
  getOrgs()
    .then(orgs => res.status(200).json(orgs))
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  getOrgs(id)
    .then(org => {
      if (!org) {
        return res.status(404).json({ message: 'Nonexistent organization' })
      } else {
        return res.status(200).json(org)
      }
    })
    .catch(err => res.status(500).json(err))
})

router.post('/', async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: 'Missing required field "name"' })
  }

  try {
    const success = await addOrg(req.body)
    res.status(201).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  if (!Object.keys(req.body)) {
    res.status(400).json({ error: 'No fields provided to update' })
  }

  try {
    const success = await updateOrg(id, req.body)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const success = await deleteOrg(id)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
