import axios from 'axios';

const baseURL = 'https://nebraska-landlord-courtcases.herokuapp.com'

const instance = axios.create({
    baseURL,
    timeout: 30000,
  });

export default instance;