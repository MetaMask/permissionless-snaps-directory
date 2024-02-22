import { Box } from '@chakra-ui/react';

export const AccountProfileBanner = () => (
  <Box
    as="section"
    id="heading"
    bgPosition="center"
    bgRepeat="no-repeat"
    bgSize="cover"
    height="250"
    position="absolute"
    width="100%"
    bg={
      'linear-gradient(93deg, rgba(221, 221, 221, 0.50) 0%, rgba(242, 242, 242, 0.50) 26.04%, rgba(220, 220, 220, 0.50) 55.79%, rgba(175, 175, 175, 0.50) 100%);'
    }
    data-testid="account-profile-banner"
  />
);
