// catches and handles errors in asynchronous functions
const catchAsyncError = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
};

export default catchAsyncError;
