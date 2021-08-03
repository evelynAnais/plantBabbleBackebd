const service = require('./users.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

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

module.exports = {
  read: [asyncErrorBoundary(userExists), read],

}