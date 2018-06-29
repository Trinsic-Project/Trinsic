function secureAsAdmin(req, res) {
  const isUser = req.hasOwnProperty('user');
  const isAdmin = isUser ? req.user.dataValues.isAdmin : false;
  if (!isAdmin) return res.status(403).send('FORBIDDEN');
}

module.exports = {
  secureAsAdmin
}
