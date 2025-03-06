import axios from 'axios';
import { env } from './env';

export const Axios = axios.create({
  baseURL:
    env.BACKEND_BASE_URL|| 'http://localhost:8000',
    withCredentials: true,
});