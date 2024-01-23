import { Center, Link, Text, VStack, useToast } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useSignMessage } from 'wagmi';

import {
  MultipleCheckboxOptions,
  QuestionRedIcon,
  RequestSignModal,
} from '../../../../components';
import {
  useDispatch,
  useSelector,
  useShortEthAddress,
} from '../../../../hooks';
import type { ApplicationState } from '../../../../store';
// import { generateReportUserTrustMsg } from '../../../../utils/signMessage';
import { addReportUser, setReportUserModalOpen } from '../../store';

type ReportUserModalProps = {
  subjectAddress: string;
};

export const ReportUserModal: FunctionComponent<ReportUserModalProps> = ({
  subjectAddress,
}) => {
  const { reportUserModalOpen } = useSelector(
    (state: ApplicationState) => state.accountProfile,
  );
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { signMessage, data: signMessageData } = useSignMessage();

  const shortSubAddress = useShortEthAddress(subjectAddress);

  const client = usePublicClient();
  const toast = useToast({ position: 'top' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([] as string[]);

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
            dispatch(setReportUserModalOpen(false));
            dispatch(
              addReportUser({ account: subjectAddress, reasons: options }),
            );
            toast({
              title: t`Report User`,
              description: t`${shortSubAddress} has been added to your report user list`,
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
    // const ruMsg = generateReportUserTrustMsg(
    //   address,
    //   subjectAddress,
    //   options,
    //   true,
    // );
    const ruMsg = '{}';
    signMessage({
      message: ruMsg,
    });

    setMessage(ruMsg);
  };

  return (
    <RequestSignModal
      isOpen={reportUserModalOpen}
      mode="negative"
      onClose={() => dispatch(setReportUserModalOpen(false))}
      headerIcon={<QuestionRedIcon />}
      buttonText={t`Sign to report`}
      isLoading={isLoading}
      buttonDisabled={options.length === 0}
      onSignButtonClick={() => {
        handleSignMessage();
      }}
    >
      <Center>
        <VStack textAlign="center">
          <Text fontSize="md" fontWeight="bold">
            <Trans>
              Report for{' '}
              <Text variant="blue" as="span">
                {shortSubAddress}
              </Text>{' '}
              as a malicious actor
            </Trans>
          </Text>

          <Text fontSize="sm" noOfLines={2} as="span">
            <Trans>
              This action will flag the user as a malicious in your community.
            </Trans>
            <Link>
              <Trans>Learn more</Trans>
            </Link>
          </Text>
          <MultipleCheckboxOptions
            options={[
              'Phisher or scammer',
              'Spreads progaganda',
              'Pretends to be someone else',
              'lorem',
              'other',
            ]}
            onChange={(values) => {
              setOptions(
                options.filter((_, index) => values[index] === true) ?? [],
              );
            }}
          />
        </VStack>
      </Center>
    </RequestSignModal>
  );
};
