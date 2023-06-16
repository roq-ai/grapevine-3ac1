import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createLeadOpportunity } from 'apiSdk/lead-opportunities';
import { Error } from 'components/error';
import { leadOpportunityValidationSchema } from 'validationSchema/lead-opportunities';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OnlineCommunityInterface } from 'interfaces/online-community';
import { getOnlineCommunities } from 'apiSdk/online-communities';
import { LeadOpportunityInterface } from 'interfaces/lead-opportunity';

function LeadOpportunityCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LeadOpportunityInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLeadOpportunity(values);
      resetForm();
      router.push('/lead-opportunities');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LeadOpportunityInterface>({
    initialValues: {
      title: '',
      description: '',
      url: '',
      online_community_id: (router.query.online_community_id as string) ?? null,
    },
    validationSchema: leadOpportunityValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Lead Opportunity
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
            {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
          </FormControl>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <FormControl id="url" mb="4" isInvalid={!!formik.errors?.url}>
            <FormLabel>Url</FormLabel>
            <Input type="text" name="url" value={formik.values?.url} onChange={formik.handleChange} />
            {formik.errors.url && <FormErrorMessage>{formik.errors?.url}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OnlineCommunityInterface>
            formik={formik}
            name={'online_community_id'}
            label={'Select Online Community'}
            placeholder={'Select Online Community'}
            fetcher={getOnlineCommunities}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'lead_opportunity',
  operation: AccessOperationEnum.CREATE,
})(LeadOpportunityCreatePage);
