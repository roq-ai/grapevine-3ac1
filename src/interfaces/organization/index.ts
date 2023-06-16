import { OnlineCommunityInterface } from 'interfaces/online-community';
import { OrganizationMemberInterface } from 'interfaces/organization-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  online_community?: OnlineCommunityInterface[];
  organization_member?: OrganizationMemberInterface[];
  user?: UserInterface;
  _count?: {
    online_community?: number;
    organization_member?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
