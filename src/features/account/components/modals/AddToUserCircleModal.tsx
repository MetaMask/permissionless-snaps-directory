import { Center, Link, Text, VStack } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { isAddress } from 'viem';

import { AvatarBlueIcon, RequestSignModal } from '../../../../components';
import {
  useDispatch,
  useSelector,
  useVerifiableCredential,
} from '../../../../hooks';
import { useSignErrorHandler } from '../../../../hooks/useSignErrorHandler';
import useToastMsg from '../../../../hooks/useToastMsg';
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

  const [isLoading, setIsLoading] = useState(false);
  const { issuerAddress, signMessage, signError, accountVCBuilder } =
    useVerifiableCredential();

  useSignErrorHandler(signError);

  const { showSuccessMsg } = useToastMsg();

  const shortSubAddress = useMemo(
    () => trimAddress(subjectAddress),
    [subjectAddress],
  );

  const onSignButtonClick = useCallback(() => {
    if (!issuerAddress) {
      return;
    }
    if (!isAddress(subjectAddress)) {
      return;
    }
    setIsLoading(true);

    const VC = accountVCBuilder.buildAccountTrust(
      issuerAddress,
      subjectAddress,
    );

    signMessage(VC)
      .then((signature) => {
        if (signature) {
          showSuccessMsg({
            title: t`Added to your trust circle`,
            description: t`${shortSubAddress} has been added to your trust circle`,
          });

          dispatch(addUserToUserCircle(subjectAddress));
          dispatch(setAddToUserModalOpen(false));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issuerAddress, subjectAddress]);

  return (
    <RequestSignModal
      isOpen={addToUserModalOpen}
      mode="positive"
      onClose={() => dispatch(setAddToUserModalOpen(false))}
      headerIcon={<AvatarBlueIcon />}
      buttonText={t`Sign to add`}
      isLoading={isLoading}
      onSignButtonClick={onSignButtonClick}
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
