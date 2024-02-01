import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent } from 'react';

import { EndorseSnapModal } from './modals/EndorseSnapModal';
import { EndorseButton } from '../../../components';
import { useVerifiableCredential } from '../../../hooks';
import { useSignErrorHandler } from '../../../hooks/useSignErrorHandler';
import useToastMsg from '../../../hooks/useToastMsg';

type EndorseSnapProps = {
  address: Hex;
  snapId: string;
  snapName: string;
};

export const EndorseSnap: FunctionComponent<EndorseSnapProps> = ({
  address,
  snapId,
  snapName,
}) => {
  const [showModal, setShowModal] = useState(false);

  const { showSuccessMsg } = useToastMsg();

  const { signMessage, signError, snapVCBuilder } = useVerifiableCredential();

  useSignErrorHandler(signError);

  // TODO: hardcode options for now, change to dynamic if needed,
  // TODO may need to consider change options to key value pair to support i18n, key to stored in DB, value is localized string shown in UI.
  const options = [t`Good user experience`, t`Useful`, t`Seems secure`];

  const onSign = async (selected: string[]) => {
    const VC = snapVCBuilder.buildEndorsedPayload(address, snapId, selected);

    const signature = await signMessage(VC);
    if (signature) {
      const assertion = snapVCBuilder.getSignedAssertion(VC, signature);
      console.log('Snap Endorse assertion', assertion);
      showSuccessMsg({
        title: t`Success`,
        description: t`${snapName} has been endorsed.`,
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
