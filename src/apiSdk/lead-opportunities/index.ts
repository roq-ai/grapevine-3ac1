import axios from 'axios';
import queryString from 'query-string';
import { LeadOpportunityInterface, LeadOpportunityGetQueryInterface } from 'interfaces/lead-opportunity';
import { GetQueryInterface } from '../../interfaces';

export const getLeadOpportunities = async (query?: LeadOpportunityGetQueryInterface) => {
  const response = await axios.get(`/api/lead-opportunities${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLeadOpportunity = async (leadOpportunity: LeadOpportunityInterface) => {
  const response = await axios.post('/api/lead-opportunities', leadOpportunity);
  return response.data;
};

export const updateLeadOpportunityById = async (id: string, leadOpportunity: LeadOpportunityInterface) => {
  const response = await axios.put(`/api/lead-opportunities/${id}`, leadOpportunity);
  return response.data;
};

export const getLeadOpportunityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/lead-opportunities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLeadOpportunityById = async (id: string) => {
  const response = await axios.delete(`/api/lead-opportunities/${id}`);
  return response.data;
};
