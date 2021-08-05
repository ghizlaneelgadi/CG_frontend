import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const API_Cert = "http://localhost:8080/api/certifications";
const API_Users_List = "http://localhost:8080/api/userslist";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');    
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getCertifsDashboard(){
    return axios.get(API_Cert, { headers: authHeader() });
  }

  getUsersList(){
    return axios.get(API_Users_List, { headers: authHeader() })
  }


  updateUser(user, username){
    return axios.put(API_Users_List + '/' +username, user);
  }

  deleteUser(id){
    return axios.delete('http://localhost:8080/api/userslist/delete/' + id, { headers: authHeader() })
  }
}

export default new UserService();

