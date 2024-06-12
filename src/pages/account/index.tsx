import { Box, Container, HStack, VStack } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import Jazzicon from '@metamask/jazzicon';
import type { Hex } from '@metamask/utils';
import { graphql, withPrefix } from 'gatsby';
import { type FunctionComponent, useEffect } from 'react';
import { useAccount } from 'wagmi';

import banner from '../../assets/images/seo/home.png';
import { fetchAuditors } from '../../features';
import {
  AccountInfo,
  AccountReport,
  DevelopedSnapsSection,
} from '../../features/account';
import {
  fetchAccountAssertionsForAccountId,
  fetchAssertionsByIssuer,
} from '../../features/account/assertions/api';
import { ActivitySection } from '../../features/account/components/activity/ActivitySection';
import { TechnicalExpertiseSection } from '../../features/account/components/technical-expertise/TechnicalExpertiseSection';
import { fetchTrustScoreForAccountId } from '../../features/account/trust-score/api';
import { useDispatch, useVerifiableCredential } from '../../hooks';
import { type Fields, parseAddress } from '../../utils';
import NotFound from '../404';

type AccountPageProps = {
  location: {
    search: Record<string, string> | URLSearchParams | undefined;
  };
};

const AccountPage: FunctionComponent<AccountPageProps> = ({ location }) => {
  const { address: connectedAddress, isConnected } = useAccount();
  const params = new URLSearchParams(location.search);
  const address = parseAddress(params.get('address') as Hex);
  const { accountVCBuilder } = useVerifiableCredential();
  const dispatch = useDispatch();
  useEffect(() => {
    if (address) {
      dispatch(fetchAccountAssertionsForAccountId(address)).catch((error) =>
        console.log(error),
      );
      dispatch(fetchTrustScoreForAccountId(address)).catch((error) =>
        console.log(error),
      );
      dispatch(fetchAssertionsByIssuer(address)).catch((error) =>
        console.log(error),
      );
      dispatch(fetchAuditors()).catch((error) => console.log(error));
    }
  }, [dispatch, accountVCBuilder, address]);

  const isMyAccount = address === connectedAddress;
  if (!address) {
    return <NotFound />;
  }

  const addr = address.trim().slice(2, 10);
  const seed = parseInt(addr, 16);

  const jazziconElement = Jazzicon(10, seed);
  const colorRects = jazziconElement.querySelectorAll('rect');
  const colorList: string[] = [];
  colorRects.forEach((rect) => {
    colorList.push(rect.getAttribute('fill')?.toString() as string);
  });
  const gradientBackground = `linear-gradient(to right, ${colorList[0]}, ${colorList[1]}, ${colorList[2]})`;

  return (
    <>
      <Box
        data-testid="background"
        sx={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: gradientBackground,
          filter: 'blur(96px) saturate(1.2)',
          opacity: '0.10',
        }}
      />
      <Box position="relative" data-testid="account-info" mt="4rem">
        <Container maxWidth="container.xl" paddingTop="0" position="relative">
          <VStack spacing="8">
            <AccountInfo address={address} />
            <HStack>
              {isConnected && !isMyAccount && (
                <AccountReport
                  address={address}
                  connectedAddress={connectedAddress as Hex}
                />
              )}
            </HStack>
          </VStack>
          <DevelopedSnapsSection author={address} />
          <TechnicalExpertiseSection
            address={address}
            connectedAddress={connectedAddress}
          />
          <ActivitySection address={address} />
        </Container>
      </Box>
    </>
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
