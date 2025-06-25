const catchAsyncError = (fun) => (req, res, next) => {
    Promise.resolve(fun(req, res, next)).catch(next);
  };
  // Catch async Error
  module.exports = catchAsyncError;