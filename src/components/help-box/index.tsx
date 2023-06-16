import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Marketing Manager'];
  const roles = ['Marketing Manager'];
  const applicationName = `grapevine`;
  const tenantName = `Organization`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Marketing Manager creates an Organization

As a Marketing Manager,
I want to create an Organization,
So that I can manage and monitor online communities relevant to my business.

Title: Marketing Manager adds online communities to monitor

As a Marketing Manager,
I want to add online communities to my Organization,
So that the AI can monitor them for potential leads and opportunities.

Title: Marketing Manager views potential leads and opportunities

As a Marketing Manager,
I want to view potential leads and opportunities found by the AI,
So that I can take appropriate actions to drive brand awareness and trust.

Title: Marketing Manager updates online communities to monitor

As a Marketing Manager,
I want to update the list of online communities monitored by the AI,
So that I can ensure the AI is focusing on the most relevant communities for my business.

Title: Marketing Manager removes online communities from monitoring

As a Marketing Manager,
I want to remove online communities from my Organization,
So that the AI stops monitoring them for potential leads and opportunities.

Title: Marketing Manager invites team members to the Organization

As a Marketing Manager,
I want to invite team members to my Organization,
So that they can also view potential leads and opportunities and take actions to drive brand awareness and trust.

Title: Team Member views potential leads and opportunities

As a Team Member,
I want to view potential leads and opportunities found by the AI,
So that I can take appropriate actions to drive brand awareness and trust.

Title: Marketing Manager removes team members from the Organization

As a Marketing Manager,
I want to remove team members from my Organization,
So that they no longer have access to the potential leads and opportunities found by the AI.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
