import { Center, Link, Text, VStack, useToast } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useSignMessage } from 'wagmi';

import { AvatarBlueIcon, RequestSignModal } from '../../../../components';
import { useDispatch, useSelector } from '../../../../hooks';
import type { ApplicationState } from '../../../../store';
import { generateAccountTrustMsg, trimAddress } from '../../../../utils';
import { addUserToUserCircle, setAddToUserModalOpen } from '../../store';

type AddToUserCircleModalProps = {
  subjectAddress: string;
};

export const AddToUserCircleModal: FunctionComponent<
  AddToUserCircleModalProps
> = ({ subjectAddress }) => {
  const { addToUserModalOpen } = useSelector(
    (state: ApplicationState) => state.accountProfile,
  );
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { signMessage, data: signMessageData } = useSignMessage();
  const client = usePublicClient();
  const toast = useToast({ position: 'top' });
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const shortSubAddress = trimAddress(subjectAddress);

  useEffect(() => {
    if (signMessageData && signMessageData.length > 0) {
      if (!address) {
        return;
      }

      client
        .verifyMessage({
          address,
          message,
          signature: signMessageData,
        })
        .then((res) => {
          if (res) {
            setIsLoading(false);
            dispatch(setAddToUserModalOpen(false));
            dispatch(addUserToUserCircle(subjectAddress));
            toast({
              title: t`Added to your trust circle`,
              description: t`${shortSubAddress} has been added to your trust circle`,
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          } else {
            toast({
              title: t`Invalid Signature`,
              description: t`Your signature is invalid`,
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          toast({
            title: t`Failed to verify signature`,
            description: error,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signMessageData]);

  const handleSignMessage = () => {
    if (!address) {
      return;
    }
    setIsLoading(true);
    const tcMsg = generateAccountTrustMsg(address, subjectAddress, true);
    signMessage({
      message: tcMsg,
    });

    setMessage(tcMsg);
  };

  return (
    <RequestSignModal
      isOpen={addToUserModalOpen}
      mode="positive"
      onClose={() => dispatch(setAddToUserModalOpen(false))}
      headerIcon={<AvatarBlueIcon />}
      buttonText={t`Sign to add`}
      isLoading={isLoading}
      onSignButtonClick={() => {
        handleSignMessage();
      }}
    >
      <Center>
        <VStack textAlign="center">
          <Text fontSize="md" fontWeight="bold">
            <Trans>
              Add{' '}
              <Text variant="blue" as="span">
                {shortSubAddress}
              </Text>{' '}
              to your trust circle
            </Trans>
          </Text>

          <Text fontSize="sm" noOfLines={2}>
            Lorem ipsum dolor description of what it means to add a user to your
            trust circle.{' '}
            <Link>
              <Trans>Learn more</Trans>
            </Link>
          </Text>
        </VStack>
      </Center>
    </RequestSignModal>
  );
};
