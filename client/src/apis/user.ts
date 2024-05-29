import axios from 'axios';
import { IuserLogin } from '../types/user'

const apiUrl = process.env.API_URL || 'http://localhost:3002';

export async function login({email, password}: IuserLogin) {
  try {
    const response = await axios.get(`${apiUrl}/api/user/login`, {
      params: {
        email, password 
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// export async function getUser(id) {
//   return await resolve(axios.get(`http://some-api.com/users/${id}`).then(res => res.data));
// }