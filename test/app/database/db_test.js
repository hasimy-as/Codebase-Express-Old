const mongoConnect = require('../../../app/database/db');

describe('Database test', () => {
  it('should able to create connection', () => {
    mongoConnect();
  })
})