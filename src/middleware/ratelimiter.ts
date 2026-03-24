import { Request, Response, NextFunction } from 'express';

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

interface RateLimiterOptions {
  capacity: number; // max tokens
  refillRate: number; // tokens per second
  windowMs?: number; // optional, for sliding window, but for token bucket, not needed
}

class TokenBucketRateLimiter {
  private buckets: Map<string, TokenBucket> = new Map();
  private capacity: number;
  private refillRate: number;

  constructor(options: RateLimiterOptions) {
    this.capacity = options.capacity;
    this.refillRate = options.refillRate;
  }

  private getBucket(key: string): TokenBucket {
    let bucket = this.buckets.get(key);
    if (bucket) {
      // Clean up inactive buckets (older than 1 hour)
      const now = Date.now();
      if (now - bucket.lastRefill > 3600000) { // 1 hour in ms
        this.buckets.delete(key);
        bucket = undefined;
      }
    }
    if (!bucket) {
      bucket = {
        tokens: this.capacity,
        lastRefill: Date.now(),
      };
      this.buckets.set(key, bucket);
    }
    return bucket;
  }

  private refill(bucket: TokenBucket): void {
    const now = Date.now();
    const timePassed = (now - bucket.lastRefill) / 1000; // seconds
    const tokensToAdd = Math.floor(timePassed * this.refillRate);
    if (tokensToAdd > 0) {
      bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
      bucket.lastRefill = now;
    }
  }

  consume(key: string): boolean {
    const bucket = this.getBucket(key);
    this.refill(bucket);
    if (bucket.tokens > 0) {
      bucket.tokens -= 1;
      return true;
    }
    return false;
  }
}

// Create an instance for auth routes, e.g., 10 requests per minute
const authRateLimiter = new TokenBucketRateLimiter({
  capacity: 10, // 10 tokens
  refillRate: 10 / 60, // 10 per minute, so ~0.166 per second
});

// Middleware function
export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction): void {
  const key = req.ip || 'unknown'; // Use IP as key, or req.user.id if authenticated
  if (authRateLimiter.consume(key)) {
    next();
  } else {
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  }
}