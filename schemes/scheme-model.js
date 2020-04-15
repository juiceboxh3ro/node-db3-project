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
    SELECT sch.scheme_name, st.step_number, st.instructions
    FROM schemes AS sch
    JOIN steps AS st ON st.scheme_id = {id}
    WHERE sch.id = {id}
  */

  return db('schemes')
  .join('steps', 'steps.scheme_id', 'schemes.id')
  .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
  .where('schemes.id', id)
  .orderBy('steps.step_number')
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