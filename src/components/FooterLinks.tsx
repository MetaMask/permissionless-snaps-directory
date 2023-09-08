import { Box, Flex, Heading, Link, List, ListItem } from '@chakra-ui/react';
import { defineMessage } from '@lingui/macro';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

export const FOOTER_LINKS = [
  {
    title: defineMessage`About`,
    links: [
      {
        title: defineMessage`Website`,
        url: 'https://metamask.io/snaps',
      },
      {
        title: defineMessage`Developer Docs`,
        url: 'https://docs.metamask.io/snaps/',
      },
    ],
  },
  {
    title: defineMessage`Get in touch`,
    links: [
      {
        title: defineMessage`Contact Us`,
        url: 'https://support.metamask.io/hc/en-us/articles/360058969391-How-to-contact-MetaMask-Support',
      },
      {
        title: defineMessage`Feedback`,
        url: 'https://survey.usabilla.com/live/s/64f99fe2b12d6940df7c0357?utm_source=snapsdirectory&utm_medium=landing-page&utm_campaign=2023_Sep_snaps-launch_awareness_content',
      },
      {
        title: defineMessage`Support`,
        url: 'https://support.metamask.io/',
      },
    ],
  },
];

export const FooterLinks: FunctionComponent = () => (
  <Flex
    width={['100%', '336px']}
    maxWidth="100%"
    gap={['12', '24']}
    marginBottom="12"
  >
    {FOOTER_LINKS.map(({ title, links }) => (
      <Box key={`footer-${title}`}>
        <Heading
          as="h3"
          fontSize="sm"
          fontFamily="custom"
          fontWeight="500"
          textTransform="uppercase"
        >
          <Trans id={title.id} />
        </Heading>
        <List>
          {links.map(({ title: linkTitle, url }) => (
            <ListItem
              key={`footer-link-${title}-${url}`}
              marginTop="6"
              fontSize="sm"
            >
              <Link
                href={url}
                _hover={{ textDecoration: 'none' }}
                isExternal={true}
                color="gray.muted"
              >
                <Trans id={linkTitle.id} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    ))}
  </Flex>
);