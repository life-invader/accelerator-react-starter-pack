import axios from 'axios';

const BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const TIMEOUT = 5000;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});
