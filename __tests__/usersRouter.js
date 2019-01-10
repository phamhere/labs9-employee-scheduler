const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { populateOrg, insertOrg } = require('../database/utils/generateData')

const request = supertest(server)

const generateOrg = async () => {
  const org = populateOrg()
  await insertOrg(org, knex)
  return org
}

const deleteOrg = async org => {
  await knex('organizations').delete({ id: org.organization.id })
}

describe('user endpoint', () => {
  it('returns all users GET /', async () => {
    // console.log('running')
    const expected = await knex('users')

    const response = await request.get('/users')
    // console.log(expected)

    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(expected.length)
  })

  it('returns all users for an org', async () => {
    console.log('running')
    const org = await generateOrg()
    const { id } = org.organization
    const expected = await knex('users').where({
      organization_id: id
    })

    const response = await request.get(`/users/${id}`)

    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(expected.length)

    await deleteOrg(org)
  })

  it('edits a user\'s name', async () => {
    const org = await generateOrg()
    const { users } = org
    const target = users[0]
    const changes = { first_name: 'Henry' }
    const response = await request.put(`/users/${target.id}`).send(changes)
    const updatedUser = await knex('users')
      .where({ id: target.id })
      .first()
    expect(response.status).toBe(200)
    expect(response.body).toEqual(1)
    expect(updatedUser).toEqual({ ...target, ...changes })
    await deleteOrg(org)
  })
})
