const STATUS = {
  SUCCESS: 'success',
  CREATED: 'created',
  BAD_REQUEST: 'bad request',
  NOT_FOUND: 'not found',
  INTERNAL_ERROR: 'internal error',
  BAD_GATEWAY: 'bad gateway'
};

const CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  BAD_GATEWAY: 502
};

module.exports = {
  STATUS,
  CODE
}