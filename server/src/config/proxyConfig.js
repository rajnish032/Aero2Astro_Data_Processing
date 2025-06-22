// Environment-based proxy configuration
export const proxyConfig = {
  brightData: {
    host: process.env.BRIGHT_DATA_HOST || 'brd.superproxy.io',
    ports: [33335, 22225,], // Multiple ports to try
    username: process.env.BRIGHT_DATA_USERNAME,
    password: process.env.BRIGHT_DATA_PASSWORD,
    country: 'in',
    session: () => Math.floor(Math.random() * 1000000),
    get auth() {
      return {
        username: `${this.username}-session-${this.session()}`,
        password: this.password
      };
    }
  },
  
  //Request settings
  defaults: {
    timeout: 30000, // 30 seconds
    retries: 3,
    retryDelay: 2000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Referer': 'https://www.google.com/',
      'DNT': '1'
    }
  }
};