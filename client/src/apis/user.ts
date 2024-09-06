import axios from 'axios';
import { UserLogin, UserRegister } from '../types/user';

class UserApi {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL;
  }

  public async login({email, password}: UserLogin) {
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
        name,
        email,
        password
      });

      return response.data;
    } catch(error) {
      throw error;
    }
  }

  public async findUser(text: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/user/find`, {
        params: {
          keyword: text
        }
      });
      
      return response.data;
    } catch(error) {
      console.log(`error: ${error}`);
      
      throw error;
    }
  }

  public async getUserById(userId: String) {
    try {
      const response = await axios.get(`${this.apiUrl}/user/get/${userId}`);

      return response.data;
    } catch(error) {
      throw error;
    }
  }
}

export default UserApi;