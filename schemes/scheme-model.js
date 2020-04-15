const db = require('../data/db-config')

module.exports = {
  find, findById, findSteps, add, update, remove
}

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes as s').where({ id }).first()
}

function findSteps(id) {
  /*
    SELECT sch.id, sch.scheme_name, st.step_number, st.instructions
    FROM schemes AS sch
    JOIN steps AS st ON sch.id = st.scheme_id
    ORDER BY sch.id, st.step_number
  */

  return db('schemes').where({ id }).first()
  .then(() => db('steps').where({ scheme_id: id }))
}

function add(scheme) {
  return db('schemes').insert(scheme, 'id')
  .then(([id]) => {
    return findById(id);
  })
}

function update(changes, id) {
  return db('schemes').where({ id })
  .update(changes)
  .then(() => {
    return findById(id)
  })
}

function remove(id) {
  return db('schemes').where({ id }).del()
}