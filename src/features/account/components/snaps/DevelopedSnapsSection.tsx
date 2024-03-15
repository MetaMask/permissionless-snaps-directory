import { Box, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { Address } from '@wagmi/core';
import type { FunctionComponent } from 'react';

import { useSelector } from '../../../../hooks';
import { getSnapsByFilter } from '../../../snaps';
import { SnapCard } from '../../../snaps/components';

export type DevelopedSnapsSectionProps = {
  author?: Address | undefined;
};

export const DevelopedSnapsSection: FunctionComponent<
  DevelopedSnapsSectionProps
> = ({ author }) => {
  const snaps = useSelector(
    getSnapsByFilter({
      author,
    }),
  );

  if (snaps && snaps.length !== 0) {
    return (
      <>
        <Divider mt="3rem" mb="2rem" />
        <Heading as="h2" fontSize="2xl">
          {t`Developed by this user`}
        </Heading>
        <Box data-testid="my-snaps-section">
          <SimpleGrid columns={[1, null, 2, 3]} spacing={4} marginX="-0.5rem">
            {snaps.map((snap, index) => (
              <SnapCard key={`${snap.id}-${index}`} image={true} {...snap} />
            ))}
          </SimpleGrid>
        </Box>
      </>
    );
  }
  return null;
};
