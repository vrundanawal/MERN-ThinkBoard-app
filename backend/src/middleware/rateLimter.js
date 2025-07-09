import rateLimit from '../config/upstash.js';
const ratelimiter = async (req, res, next) => {
  try {
    // Check if the request is allowed by the rate limiter
    const { success } = await rateLimit.limit('my-limit-key');
    if (!success) {
      // If the request is not allowed, send a 429 Too Many Requests response
      return res.status(429).json({
        message: 'Too many requests. Please try again later.',
      });
    }
    // If the request is allowed, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    res.status(500).json({ message: 'Internal server error' });
    next(error);
  }
};
export default ratelimiter;
