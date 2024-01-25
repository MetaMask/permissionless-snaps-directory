import { Center, Link, Text, VStack } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import { useEffect, useMemo } from 'react';

import { AvatarBlueIcon, RequestSignModal } from '../../../../components';
import { useDispatch, useSelector } from '../../../../hooks';
import useToastMsg from '../../../../hooks/useToastMsg';
import {
  SignatureErrorTypes,
  useTypedSignTrustCredential,
} from '../../../../hooks/useTypedSignTrustCredential';
import type { ApplicationState } from '../../../../store';
import { trimAddress } from '../../../../utils';
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

  const {
    isLoading,
    isVerified,
    payload,
    submitTypedSignRequest,
    signatureError,
  } = useTypedSignTrustCredential();

  const { showErrorMsg, showSuccessMsg } = useToastMsg();

  const shortSubAddress = useMemo(
    () => trimAddress(subjectAddress),
    [subjectAddress],
  );

  useEffect(() => {
    if (signatureError) {
      if (signatureError.type === SignatureErrorTypes.Error) {
        showErrorMsg({
          title: t`Failed to verify signature`,
          description: signatureError.message,
        });
      } else {
        showErrorMsg({
          title: t`Invalid Signature`,
          description: t`Your signature is invalid`,
        });
      }
    }
  }, [signatureError, showErrorMsg]);

  useEffect(() => {
    // confirm signature has been verified
    if (isVerified) {
      console.log(`TrustCredential payload is`, payload);
      showSuccessMsg({
        title: t`Added to your trust circle`,
        description: t`${shortSubAddress} has been added to your trust circle`,
      });
      dispatch(addUserToUserCircle(subjectAddress));
      dispatch(setAddToUserModalOpen(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerified]);

  return (
    <RequestSignModal
      isOpen={addToUserModalOpen}
      mode="positive"
      onClose={() => dispatch(setAddToUserModalOpen(false))}
      headerIcon={<AvatarBlueIcon />}
      buttonText={t`Sign to add`}
      isLoading={isLoading}
      onSignButtonClick={() => {
        submitTypedSignRequest(subjectAddress, true);
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
