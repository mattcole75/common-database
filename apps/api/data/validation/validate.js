// Description: a function to enable the system to check and test JSON requests
// Developer: Matt Cole
// Date created: 2022-01-07
// Date updated: 2022-01-07
// Change history:
//  1. Added this descriptive header

const validate = (object, schema) => Object
  .keys(schema)
  .filter(key => !schema[key](object[key]))
  .map(key => new Error(`${key} is invalid.`));

module.exports = validate;