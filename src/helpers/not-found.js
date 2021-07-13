const notFound = (req, res) => res.status.json({
  code: 2,
  msg: 'Not Found',
});

modules.export = notFound;

