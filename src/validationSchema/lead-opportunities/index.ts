import * as yup from 'yup';

export const leadOpportunityValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  url: yup.string().required(),
  online_community_id: yup.string().nullable(),
});
