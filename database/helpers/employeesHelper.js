const db = require('../dbConfig')

const getEmployees = async orgId => {
  // For the get employees route, we need to return all users for a given org
  // in addition, these employees also need to have the following info:
  // availabilies and time off requests

  // as there are three taables that we need to query and then crunch that data for
  // this gets a bit complicated. In order to manage the complexity a little bit,
  // I divided the query up into three, that then get compiled together.

  // First, grab all the employees for a given org
  const employees = await db('users as u').where({ 'u.organization_id': orgId })

  // Second, grab the availabilites for each employee and crunch the data together
  // into an object of key value pairs where each key is a user id and the value
  // is an array of the availabilies for that user
  const availabilities = await db('users as u')
    .where({ 'u.organization_id': orgId })
    .join('availabilities as a', { 'u.id': 'a.user_id' })
    .select(
      'u.id as user_id',
      'a.id as availability_id',
      'a.day',
      'a.start_time',
      'a.end_time'
    )
    .reduce((acc, current) => {
      const { user_id, availability_id, day, start_time, end_time } = current
      const newItem = { id: availability_id, day, start_time, end_time }

      if (acc[user_id]) {
        acc[user_id].push(newItem)
      } else {
        acc[user_id] = [newItem]
      }

      return acc
    }, {})

  // Third, grab the time off requests for each employee. The data is crunched in
  // the same way: key value pairs where each key is a user id and the value
  // is an array of the time off requests for that user
  const timeOffRequests = await db('users as u')
    .where({ 'u.organization_id': orgId })
    .join('time_off_requests as tor', { 'u.id': 'tor.user_id' })
    .select(
      'u.id as user_id',
      'tor.id as time_off_request_id',
      'tor.date',
      'tor.reason',
      'tor.status'
    )
    .reduce((acc, current) => {
      const { user_id, time_off_request_id, date, reason, status } = current
      const newItem = { id: time_off_request_id, date, reason, status }

      if (acc[user_id]) {
        acc[user_id].push(newItem)
      } else {
        acc[user_id] = [newItem]
      }

      return acc
    }, {})

  // Fourth, map over the employees and add the availabilies and time off requests
  const combined = employees.map(employee => {
    const { id } = employee

    return {
      ...employee,
      availabilities: availabilities[id] ? [...availabilities[id]] : [],
      time_off_requests: timeOffRequests[id] ? [...timeOffRequests[id]] : []
    }
  })

  return combined
}

module.exports = {
  getEmployees
}
