const sinon = require('sinon');
const winston = require('winston');

const logger = require('../../../app/lib/logger');

describe('Logger test', () => {
  beforeEach(() => {
    sinon.stub(winston, 'createLogger').resolves({
      info: sinon.stub(),
    });
  });

  afterEach(() => {
    winston.createLogger.restore();
  });

  it('should send log', () => {
    logger.log('', { err: 'test' }, '');
  });
});

