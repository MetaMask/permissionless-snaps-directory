import { Container, Divider, VStack, Box, Link } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { graphql, Link as GatsbyLink, withPrefix } from 'gatsby';
import type { FunctionComponent } from 'react';

import banner from '../../assets/images/seo/home.png';
import {
  AccountProfileBanner,
  AccountProfileTabs,
  AccountInfo,
} from '../../features/account';
import { type Fields, parseAddress } from '../../utils';
import NotFound from '../404';

type AccountPageProps = {
  params: {
    address: Hex;
  };
};

const AccountPage: FunctionComponent<AccountPageProps> = ({ params }) => {
  const address = parseAddress(params.address);
  if (!address) {
    return <NotFound />;
  }

  return (
    <Box position="relative">
      <AccountProfileBanner />
      <Container maxWidth="container.xl" paddingTop="0" position="relative">
        <VStack mt="175" spacing={['10', null, '20']}>
          <AccountInfo address={address} />
          <Box position={['static', null, 'absolute']} right="5" top="100">
            <Link
              as={GatsbyLink}
              variant="landing"
              to={`/account/${address}/edit`}
            >
              <Trans>Edit Profile</Trans>
            </Link>
          </Box>
          <Divider />
          <AccountProfileTabs />
        </VStack>
      </Container>
    </Box>
  );
};

type HeadProps = {
  data: {
    site: {
      siteMetadata: Fields<
        Queries.SiteSiteMetadata,
        'title' | 'description' | 'author' | 'siteUrl'
      >;
    };
  };
};

export const Head: FunctionComponent<HeadProps> = ({ data }) => {
  const name = t`Account Profile`;
  const title = t`MetaMask Snaps Directory - Account Profile`;
  const description = t`Discover the MetaMask Snaps Directory Account Profile page.`;

  const image = `${data.site.siteMetadata.siteUrl}${withPrefix(banner)}`;

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={name} />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.site.siteMetadata.author} />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`;

export default AccountPage;
