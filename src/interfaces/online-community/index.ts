import { LeadOpportunityInterface } from 'interfaces/lead-opportunity';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface OnlineCommunityInterface {
  id?: string;
  name: string;
  url: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  lead_opportunity?: LeadOpportunityInterface[];
  organization?: OrganizationInterface;
  _count?: {
    lead_opportunity?: number;
  };
}

export interface OnlineCommunityGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  url?: string;
  organization_id?: string;
}
