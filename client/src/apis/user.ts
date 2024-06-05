import axios from 'axios';
import { IuserLogin, IuserRegister } from '../types/user'


class UserApi {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.API_URL || 'http://localhost:3002/api';
  }

  async login({email, password}: IuserLogin) {
    try {
      const response = await axios.get(`${this.apiUrl}/user/login`, {
        params: {
          email, password 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register({name, email, password}: IuserRegister) {
    try {
      const response = await axios.get(`${this.apiUrl}/user/register`, {
        params: {
          name, email, password
        }
      });
      return response.data;
    } catch(error) {
      throw error;
    }
  }
}

export default UserApi;