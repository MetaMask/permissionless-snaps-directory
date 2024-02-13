import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent } from 'react';

import { EndorseSnapModal } from './modals/EndorseSnapModal';
import { EndorseButton } from '../../../components';
import { useDispatch, useVerifiableCredential } from '../../../hooks';
import { useSignErrorHandler } from '../../../hooks/useSignErrorHandler';
import useToastMsg from '../../../hooks/useToastMsg';
import {
  createSnapAssertion,
  fetchSnapAssertionsForSnapId,
} from '../assertions/api';

type EndorseSnapProps = {
  address: Hex;
  snapChecksum: string;
  snapName: string;
};

export const EndorseSnap: FunctionComponent<EndorseSnapProps> = ({
  address,
  snapChecksum,
  snapName,
}) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const { showSuccessMsg, showErrorMsg } = useToastMsg();

  const { signMessage, signError, snapVCBuilder } = useVerifiableCredential();

  useSignErrorHandler(signError);

  // TODO: hardcode options for now, change to dynamic if needed,
  // TODO may need to consider change options to key value pair to support i18n, key to stored in DB, value is localized string shown in UI.
  const options = [t`Good user experience`, t`Useful`, t`Seems secure`];

  const onSign = async (selected: string[]) => {
    const verifiableCredential = snapVCBuilder.buildEndorsedPayload(
      address,
      snapChecksum,
      selected,
    );

    const signature = await signMessage(verifiableCredential);
    if (signature) {
      const assertion = snapVCBuilder.getSignedAssertion(
        verifiableCredential,
        signature,
      );
      dispatch(createSnapAssertion(assertion))
        .then((action) => {
          if (action.type.endsWith('fulfilled')) {
            dispatch(fetchSnapAssertionsForSnapId(snapChecksum)).catch(
              (error) => console.log(error),
            );
            showSuccessMsg({
              title: t`Success`,
              description: t`${snapName} has been endorsed.`,
            });
          } else {
            showErrorMsg({
              title: t`Error`,
              description: t`Failed to create endorsement for ${snapName}.`,
            });
          }
        })
        .catch(() => {
          showErrorMsg({
            title: t`Error`,
            description: t`Failed to create endorsement for ${snapName}.`,
          });
        });
    }
    setShowModal(false);
  };

  return (
    <>
      <EndorseButton
        onClick={() => setShowModal(true)}
        endorsed={false}
        size="lg"
      />
      {showModal && (
        <EndorseSnapModal
          snapName={snapName}
          options={options}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSign={onSign}
        />
      )}
    </>
  );
};
