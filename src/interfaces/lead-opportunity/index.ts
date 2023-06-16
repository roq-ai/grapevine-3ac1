import { OnlineCommunityInterface } from 'interfaces/online-community';
import { GetQueryInterface } from 'interfaces';

export interface LeadOpportunityInterface {
  id?: string;
  title: string;
  description?: string;
  url: string;
  online_community_id?: string;
  created_at?: any;
  updated_at?: any;

  online_community?: OnlineCommunityInterface;
  _count?: {};
}

export interface LeadOpportunityGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  url?: string;
  online_community_id?: string;
}
