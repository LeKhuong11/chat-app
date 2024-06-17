import axios from 'axios';
import { UserLogin, UserRegister } from '../types/user'


class UserApi {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.API_URL || 'http://localhost:3002/api';
  }

  public async login({email, password}: UserLogin) {
    console.log(process.env.API_URL);
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

  public async register({name, email, password}: UserRegister) {
    try {
      const response = await axios.post(`${this.apiUrl}/user/register`, {
        params: {
          name, email, password
        }
      });
      return response.data;
    } catch(error) {
      console.log(`error: ${error}`);
      
      throw error;
    }
  }
}

export default UserApi;