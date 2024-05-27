import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  type ModalProps,
  Flex,
  Box,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import { formatDistanceToNow } from 'date-fns';
import { useCallback, type FunctionComponent } from 'react';
import type { Address } from 'wagmi';
import { mainnet, useEnsName } from 'wagmi';

import { JazzIcon } from '.';
import { EntityName } from './EntityName';
import { getSnapByChecksum } from '../features';
import { Value } from '../features/account/assertions/enums';
import { useSelector } from '../hooks';
import { trimAddress } from '../utils';

export type IssuersListModalProps = ModalProps & {
  subject: string;
  isSnap: boolean;
  assertionType: Value;
  reason?: string;
  issuers: { address: string; issuanceDate: Date }[];
};

/**
 * Render a simple modal with header, body.
 *
 * @param props - The component props.
 * @param props.isOpen - Whether the modal is open.
 * @param props.onClose - A function to close the modal.
 * @param props.subject - The unique id of subject (a snap checksum or a user address).
 * @param props.isSnap - The flag to show if subject is either a Snap or a User.
 * @param props.assertionType - The type of the assertion (Endorsement or Dispute).
 * @param props.id - The unique identifier of the subject.
 * @param props.reason - The reason of the assertion.
 * @param props.issuers - The list of issuers.
 * @returns A React component.
 */
export const IssuersListModal: FunctionComponent<IssuersListModalProps> = ({
  isOpen,
  onClose,
  subject,
  isSnap,
  assertionType,
  reason,
  issuers,
  ...props
}) => {
  const snap = useSelector(getSnapByChecksum(subject));

  const { data } = useEnsName({
    address: subject as Address,
    chainId: mainnet.id,
    enabled: !isSnap,
  });

  const displaySubject = useCallback(() => {
    if (isSnap) {
      return snap?.name ?? t`Unknown`;
    } else if (data) {
      return data;
    }

    return trimAddress(subject);
  }, [isSnap, data, subject, snap?.name]);

  return (
    <Modal
      variant="minimal"
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <ModalOverlay />
      <ModalContent bg="background.alternative">
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" textAlign="left">
            <Text fontSize={16} fontWeight={700}>
              {assertionType === Value.Endorsement ? 'Endorsements' : 'Reports'}
            </Text>
            <Text as="span" fontSize={14}>
              <Trans>
                Explore all the users who{' '}
                {assertionType === Value.Endorsement ? 'endorsed' : 'reported'}{' '}
                <Text color="info.default" as="span">
                  {displaySubject()}
                </Text>
                {reason && (
                  <>
                    <Text as="span"> for </Text>
                    <Text as="span" fontWeight="500">
                      {reason}
                    </Text>
                  </>
                )}{' '}
                in chronological order.
              </Trans>
            </Text>
            <Box
              background="background.default"
              mt="1rem"
              padding="0.5rem"
              gap={'1rem'}
              borderRadius="1rem"
              width={'100%'}
              maxHeight="13.25rem"
              overflowY="auto"
            >
              <VStack
                alignItems="flex-start"
                mr="1.5rem"
                fontWeight={500}
                fontSize={14}
              >
                {issuers.map((issuer, index) => (
                  <HStack
                    width={'100%'}
                    justifyContent={'space-between'}
                    key={`${issuer.address}-${index}`}
                  >
                    <HStack>
                      <VStack mt="1.5">
                        <JazzIcon address={issuer.address} size={16} />
                      </VStack>
                      <EntityName
                        subject={issuer.address}
                        isSnap={false}
                        noMargin={true}
                      />
                    </HStack>
                    <Box alignContent={'flex-end'}>
                      <Text color={'icon.muted'} fontWeight={400}>
                        {formatDistanceToNow(issuer.issuanceDate, {
                          addSuffix: true,
                        })}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
