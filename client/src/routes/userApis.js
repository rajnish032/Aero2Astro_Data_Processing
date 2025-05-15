import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });
cookies.get(userauth);