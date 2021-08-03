const service = require('./posts.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties('title', 'content');

const VALID_PROPERTIES = [
  'title',
  'content',
  'image',
  'user_id'
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

async function postExists(req, res, next) {
  const post = await service.read(req.params.postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  next({ status: 404, message: `Post cannot be found.` });
}

async function list(req, res) {
  res.json({ data: await service.list() });
}

function read(req, res) {
  res.json({ data: res.locals.post })
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(postExists), read],
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
}