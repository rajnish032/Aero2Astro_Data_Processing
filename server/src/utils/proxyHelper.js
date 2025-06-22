import axios from 'axios';
import https from 'https';
import { proxyConfig } from '../config/proxyConfig.js';

export const fetchWithProxy = async (url, options = {}) => {
  const { 
    retries = proxyConfig.defaults.retries,
    retryDelay = proxyConfig.defaults.retryDelay,
    timeout = proxyConfig.defaults.timeout,
    headers = {},
    ...requestOptions
  } = options;

  let lastError = null;
  let lastPortIndex = 0;

  for (let attempt = 1; attempt <= retries; attempt++) {
    // Rotate ports on each attempt
    const port = proxyConfig.brightData.ports[lastPortIndex];
    lastPortIndex = (lastPortIndex + 1) % proxyConfig.brightData.ports.length;

    try {
      const response = await axios.get(url, {
        proxy: {
          host: proxyConfig.brightData.host,
          port: port,
          auth: proxyConfig.brightData.auth
        },
        headers: {
          ...proxyConfig.defaults.headers,
          ...headers
        },
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false,
          keepAlive: true
        }),
        timeout,
        ...requestOptions
      });

      return response.data;
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed for ${url} (port ${port}):`, error.message);

      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }
  }

  const error = new Error(`Proxy request failed after ${retries} attempts: ${lastError?.message}`);
  error.code = lastError?.code;
  error.url = url;
  throw error;
};

