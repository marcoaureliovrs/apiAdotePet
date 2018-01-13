import Memcached from 'memcached-promisify';
import config from './config';

module.exports = new Memcached(config.hostMemcached, {
    retries: 10,
    retry: 10000,
    remove: true
});

