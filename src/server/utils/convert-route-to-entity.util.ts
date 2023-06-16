const mapping: Record<string, string> = {
  'lead-opportunities': 'lead_opportunity',
  'online-communities': 'online_community',
  organizations: 'organization',
  'organization-members': 'organization_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
