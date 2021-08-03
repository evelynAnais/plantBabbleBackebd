const service = require('./users.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties('first_name', 'last_name', 'username', 'password');

const VALID_PROPERTIES = [
  'first_name',
  'last_name',
  'username',
  'password'
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function userExists(req, res, next) {
  const user = await service.read(req.params.userId);
  if (user) {
    res.locals.post = post;
    return next();
  }
  next({ status: 404, message: `User cannot be found.` });
}

function read(req, res) {
  res.json({ data: res.locals.user })
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(userExists), read],
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
}