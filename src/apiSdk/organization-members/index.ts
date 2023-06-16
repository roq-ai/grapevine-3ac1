import axios from 'axios';
import queryString from 'query-string';
import { OrganizationMemberInterface, OrganizationMemberGetQueryInterface } from 'interfaces/organization-member';
import { GetQueryInterface } from '../../interfaces';

export const getOrganizationMembers = async (query?: OrganizationMemberGetQueryInterface) => {
  const response = await axios.get(`/api/organization-members${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOrganizationMember = async (organizationMember: OrganizationMemberInterface) => {
  const response = await axios.post('/api/organization-members', organizationMember);
  return response.data;
};

export const updateOrganizationMemberById = async (id: string, organizationMember: OrganizationMemberInterface) => {
  const response = await axios.put(`/api/organization-members/${id}`, organizationMember);
  return response.data;
};

export const getOrganizationMemberById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/organization-members/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOrganizationMemberById = async (id: string) => {
  const response = await axios.delete(`/api/organization-members/${id}`);
  return response.data;
};
