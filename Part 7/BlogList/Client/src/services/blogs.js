import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getAllUsers = () => {
  const request = axios.get('/api/users');
  return request.then((response) => response.data);
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateLike = async (id) => {
  const blogToChange = await axios.get(`${baseUrl}/${id}`);
  const changedBlog = {
    ...blogToChange.data,
    likes: blogToChange.data.likes + 1,
  };
  const response = await axios.put(`${baseUrl}/${id}`, changedBlog);
  return response.data;
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const blogService = {
  getAll,
  getAllUsers,
  getById,
  setToken,
  create,
  updateLike,
  remove,
};
export default blogService;
