// Redis monitoring utilities for Vercel KV
import { redis } from '../db/redis';
import * as Sentry from '@sentry/nextjs';

export interface RedisMetrics {
  connectionStatus: 'connected' | 'disconnected' | 'error';
  responseTime: number;
  memoryUsage?: number;
  keyCount?: number;
  errorRate: number;
  lastCheck: Date;
}

export interface RedisAlert {
  type: 'memory' | 'connection' | 'performance' | 'rate_limit';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  value?: number;
  threshold?: number;
  timestamp: Date;
}

// Redis health check with performance metrics
export async function checkRedisHealth(): Promise<RedisMetrics> {
  const startTime = Date.now();
  let connectionStatus: RedisMetrics['connectionStatus'] = 'disconnected';
  let keyCount: number | undefined;
  let errorRate = 0;

  try {
    // Test basic connectivity with a simple ping
    const pingResult = await redis.ping();

    if (pingResult === 'PONG') {
      connectionStatus = 'connected';

      // Get basic info about the database
      try {
        // Count keys (sample operation)
        const keys = await redis.keys('*');
        keyCount = keys.length;
      } catch (error) {
        console.warn('Could not retrieve key count:', error);
        errorRate += 0.1;
      }
    }
  } catch (error) {
    connectionStatus = 'error';
    errorRate = 1.0;

    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        component: 'redis-monitoring',
        operation: 'health-check',
      },
    });
  }

  const responseTime = Date.now() - startTime;

  return {
    connectionStatus,
    responseTime,
    keyCount,
    errorRate,
    lastCheck: new Date(),
  };
}

// Monitor Redis operation performance
export async function monitorRedisOperation<T>(
  operation: () => Promise<T>,
  operationName: string,
): Promise<T> {
  const startTime = Date.now();

  try {
    const result = await operation();
    const duration = Date.now() - startTime;

    // Log slow operations
    if (duration > 100) {
      console.warn(`Slow Redis operation: ${operationName} took ${duration}ms`);

      Sentry.addBreadcrumb({
        message: `Slow Redis operation: ${operationName}`,
        level: 'warning',
        data: {
          duration,
          operation: operationName,
        },
      });
    }

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;

    Sentry.captureException(error, {
      tags: {
        component: 'redis-monitoring',
        operation: operationName,
      },
      extra: {
        duration,
      },
    });

    throw error;
  }
}

// Check for alerts based on metrics
export function checkRedisAlerts(metrics: RedisMetrics): RedisAlert[] {
  const alerts: RedisAlert[] = [];

  // Connection alerts
  if (metrics.connectionStatus === 'error') {
    alerts.push({
      type: 'connection',
      severity: 'critical',
      message: 'Redis connection failed',
      timestamp: new Date(),
    });
  } else if (metrics.connectionStatus === 'disconnected') {
    alerts.push({
      type: 'connection',
      severity: 'high',
      message: 'Redis is disconnected',
      timestamp: new Date(),
    });
  }

  // Performance alerts
  if (metrics.responseTime > 1000) {
    alerts.push({
      type: 'performance',
      severity: 'high',
      message: 'Redis response time is very slow',
      value: metrics.responseTime,
      threshold: 1000,
      timestamp: new Date(),
    });
  } else if (metrics.responseTime > 500) {
    alerts.push({
      type: 'performance',
      severity: 'medium',
      message: 'Redis response time is slow',
      value: metrics.responseTime,
      threshold: 500,
      timestamp: new Date(),
    });
  } else if (metrics.responseTime > 100) {
    alerts.push({
      type: 'performance',
      severity: 'low',
      message: 'Redis response time is elevated',
      value: metrics.responseTime,
      threshold: 100,
      timestamp: new Date(),
    });
  }

  // Error rate alerts
  if (metrics.errorRate > 0.1) {
    alerts.push({
      type: 'connection',
      severity: metrics.errorRate > 0.5 ? 'critical' : 'high',
      message: `High Redis error rate: ${(metrics.errorRate * 100).toFixed(1)}%`,
      value: metrics.errorRate,
      threshold: 0.1,
      timestamp: new Date(),
    });
  }

  return alerts;
}

// Send alerts to appropriate channels
export async function sendRedisAlerts(alerts: RedisAlert[]): Promise<void> {
  for (const alert of alerts) {
    // Log to console for development
    console.warn(
      `Redis Alert [${alert.severity.toUpperCase()}]:`,
      alert.message,
    );

    // Send to Sentry based on severity
    if (alert.severity === 'critical' || alert.severity === 'high') {
      Sentry.captureMessage(`Redis Alert: ${alert.message}`, {
        level: alert.severity === 'critical' ? 'error' : 'warning',
        tags: {
          component: 'redis-monitoring',
          alert_type: alert.type,
          severity: alert.severity,
        },
        extra: {
          value: alert.value,
          threshold: alert.threshold,
        },
      });
    }
  }
}

// Main monitoring function
export async function monitorRedis(): Promise<void> {
  try {
    const metrics = await checkRedisHealth();
    const alerts = checkRedisAlerts(metrics);

    if (alerts.length > 0) {
      await sendRedisAlerts(alerts);
    }

    // Log metrics for debugging
    console.log('Redis Metrics:', {
      status: metrics.connectionStatus,
      responseTime: `${metrics.responseTime}ms`,
      keyCount: metrics.keyCount,
      errorRate: `${(metrics.errorRate * 100).toFixed(1)}%`,
    });
  } catch (error) {
    console.error('Redis monitoring failed:', error);
    Sentry.captureException(error, {
      tags: {
        component: 'redis-monitoring',
        operation: 'monitor',
      },
    });
  }
}
