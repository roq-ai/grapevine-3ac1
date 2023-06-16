import axios from 'axios';
import queryString from 'query-string';
import { OnlineCommunityInterface, OnlineCommunityGetQueryInterface } from 'interfaces/online-community';
import { GetQueryInterface } from '../../interfaces';

export const getOnlineCommunities = async (query?: OnlineCommunityGetQueryInterface) => {
  const response = await axios.get(`/api/online-communities${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOnlineCommunity = async (onlineCommunity: OnlineCommunityInterface) => {
  const response = await axios.post('/api/online-communities', onlineCommunity);
  return response.data;
};

export const updateOnlineCommunityById = async (id: string, onlineCommunity: OnlineCommunityInterface) => {
  const response = await axios.put(`/api/online-communities/${id}`, onlineCommunity);
  return response.data;
};

export const getOnlineCommunityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/online-communities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOnlineCommunityById = async (id: string) => {
  const response = await axios.delete(`/api/online-communities/${id}`);
  return response.data;
};
