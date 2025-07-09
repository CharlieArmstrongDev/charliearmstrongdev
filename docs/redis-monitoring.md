# Redis (Vercel KV) Monitoring Documentation

This document covers the Redis monitoring implementation for the charliearmstrongdev project.

## Overview

The Redis monitoring system provides real-time health checks, performance metrics, and automated alerting for the Vercel KV (Upstash Redis) database.

## Features

### ✅ Real-time Monitoring Dashboard

- Live connection status monitoring
- Response time tracking
- Database key count
- Error rate monitoring
- Visual health indicators

### ✅ Automated Health Checks

- Connection validation
- Performance thresholds
- Error detection and reporting
- Integration with tRPC infrastructure

### ✅ Sentry Integration

- Automatic alert creation for critical issues
- Performance degradation tracking
- Error context and debugging information

## Architecture

### Components

1. **Monitoring Library** (`apps/web/lib/monitoring/redis.ts`)
   - Core health check functions
   - Metrics collection
   - Alert generation and routing

2. **Dashboard Component** (`apps/web/components/monitoring/RedisMonitoringDashboard.tsx`)
   - Real-time metrics display
   - Visual status indicators
   - Refresh functionality

3. **Monitoring Page** (`apps/web/app/monitoring/redis/page.tsx`)
   - Full dashboard interface
   - Documentation and help text
   - Alert threshold information

4. **tRPC Integration** (`apps/web/lib/trpc/server.ts`)
   - `monitoring.redis` endpoint
   - Health check route integration

5. **Standalone Script** (`scripts/redis-monitor.ts`)
   - Automated monitoring
   - CI/CD integration support

## Monitoring Metrics

### Connection Status

- **Connected**: Redis is reachable and responding
- **Disconnected**: Redis is unreachable
- **Error**: Connection failed with errors

### Performance Metrics

- **Response Time**: Time taken for operations (target: <50ms)
- **Key Count**: Total keys in the database
- **Error Rate**: Percentage of failed operations

### Alert Thresholds

| Metric        | Good      | Warning      | Critical |
| ------------- | --------- | ------------ | -------- |
| Response Time | <50ms     | 50-100ms     | >100ms   |
| Error Rate    | <1%       | 1-10%        | >10%     |
| Connection    | Connected | Intermittent | Failed   |

## Usage

### Accessing the Dashboard

Visit the monitoring dashboard at:

```
http://localhost:3000/monitoring/redis
```

### Manual Health Check

```bash
# Run standalone monitoring script
pnpm monitor:redis

# Test via tRPC endpoint (HTTP GET)
curl http://localhost:3000/api/trpc/monitoring.redis

# Test via tRPC endpoint (formatted)
curl -s http://localhost:3000/api/trpc/monitoring.redis | jq .
```

### tRPC API Integration ✅

The Redis monitoring system is fully integrated with the tRPC API infrastructure:

**Endpoint:** `/api/trpc/monitoring.redis`
**Method:** GET (query procedure)
**Authentication:** Public (no authentication required)

**Response Format:**
```json
{
  "result": {
    "data": {
      "connectionStatus": "connected",
      "responseTime": 45,
      "keyCount": 13,
      "errorRate": 0,
      "lastCheck": "2025-07-09T16:47:59.022Z"
    }
  }
}
```

**Integration with Main Health Check:**
The Redis monitoring is also integrated into the main health check endpoint at `/api/trpc/health`, providing comprehensive system status.

### Integration in Code

```typescript
import {
  checkRedisHealth,
  monitorRedisOperation,
} from "../lib/monitoring/redis";

// Basic health check
const metrics = await checkRedisHealth();

// Monitor specific operations
const result = await monitorRedisOperation(
  () => redis.get("some-key"),
  "get-operation",
);
```

## Alert Configuration

### Sentry Integration

Critical and high-severity alerts are automatically sent to Sentry with:

- Alert type and severity
- Metric values and thresholds
- Timestamp and context information

### Custom Alert Handling

```typescript
import { checkRedisAlerts, sendRedisAlerts } from "../lib/monitoring/redis";

const metrics = await checkRedisHealth();
const alerts = checkRedisAlerts(metrics);

if (alerts.length > 0) {
  await sendRedisAlerts(alerts);
}
```

## Troubleshooting

### Common Issues

1. **Dashboard Not Loading**
   - Verify tRPC endpoints are working
   - Check Redis connection configuration
   - Ensure monitoring router is properly registered

2. **High Response Times**
   - Check Redis instance performance
   - Verify network connectivity
   - Review query complexity

3. **Connection Failures**
   - Validate environment variables
   - Check Vercel KV instance status
   - Verify authentication tokens

### Debugging

Enable detailed logging:

```typescript
// In monitoring functions
console.log("Redis Metrics:", metrics);
```

Check server logs for monitoring activity:

```bash
# Look for Redis monitoring messages
grep -i "redis" logs/server.log
```

## Configuration

### Environment Variables

Required variables for monitoring:

```bash
KV_URL=your_redis_url
KV_REST_API_URL=your_rest_api_url
KV_REST_API_TOKEN=your_api_token
KV_REST_API_READ_ONLY_TOKEN=your_readonly_token
```

### Monitoring Script Commands

Available npm/pnpm scripts:

```bash
# Run monitoring checks
pnpm monitor:redis

# Combined with other health checks
pnpm health:all
```

## Production Deployment

### Vercel Deployment

The monitoring system is automatically deployed with the application. Ensure:

1. Environment variables are configured in Vercel
2. Sentry integration is properly set up
3. Monitoring endpoints are accessible

### Performance Considerations

- Monitoring checks are lightweight (<10ms overhead)
- Dashboard updates use efficient tRPC subscriptions
- Alerts are rate-limited to prevent spam

## Future Enhancements

### Planned Features

- [ ] Historical metrics storage
- [ ] Trend analysis and reporting
- [ ] Advanced alerting with multiple channels
- [ ] Performance optimization recommendations
- [ ] Integration with external monitoring services

### Contributing

When adding new monitoring features:

1. Update the `RedisMetrics` interface
2. Add corresponding UI components
3. Update alert thresholds as needed
4. Add tests for new functionality
5. Update documentation

## Related Documentation

- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Upstash Redis Documentation](https://docs.upstash.com/redis)
- [Sentry Integration Guide](./sentry.md)
- [tRPC Setup Documentation](./trpc.md)
