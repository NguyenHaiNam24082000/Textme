const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log(err,"hello");
    res.status(202).json({
      status: "error",
      error: JSON.parse(err.message),
    });
    next(err);
  });
};

module.exports = catchAsync;
