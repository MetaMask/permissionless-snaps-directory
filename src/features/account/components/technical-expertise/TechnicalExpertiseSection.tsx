import { Box, Divider, Heading, HStack } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { Address } from '@wagmi/core';
import type { FunctionComponent } from 'react';

import { TechnicalExpertiseItem } from './TechnicalExpertiseItem';
import { useSelector } from '../../../../hooks';
import { AccountTEEndorsement } from '../../AccountTEEndorsement';
import { getTechnicalEndorsementsForAccountId } from '../../assertions/store';

export type TechnicalExpertiseSectionProps = {
  address: Address;
  connectedAddress: Address | undefined;
};

export const TechnicalExpertiseSection: FunctionComponent<
  TechnicalExpertiseSectionProps
> = ({ address, connectedAddress }) => {
  const endorsements = useSelector(
    getTechnicalEndorsementsForAccountId(address),
  );

  const hasEndorsement = endorsements?.some(
    (endorsementType) => endorsementType.endorsements.length > 0,
  );

  const isMyAccount = address === connectedAddress;

  return (
    <>
      <Divider mt="3rem" mb="2rem" />
      <HStack
        mb={4}
        width={'100%'}
        justifyContent={'space-between'}
        alignContent={'center'}
      >
        <Heading as="h2" fontSize="2xl">
          {t`Technical Expertise`}
        </Heading>
        {connectedAddress && !isMyAccount && (
          <AccountTEEndorsement
            address={address}
            connectedAddress={connectedAddress}
          />
        )}
      </HStack>
      {hasEndorsement && (
        <Box data-testid="activity-section">
          {endorsements?.map((endorsementType, index) => (
            <TechnicalExpertiseItem
              key={`${endorsementType.type}-${index}`}
              endorsements={endorsementType.endorsements}
              type={endorsementType.type}
              myAddress={connectedAddress}
            />
          ))}
        </Box>
      )}
    </>
  );
};
