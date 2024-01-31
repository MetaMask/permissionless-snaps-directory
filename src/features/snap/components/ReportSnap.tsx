import { t } from '@lingui/macro';
import { useState, type FunctionComponent } from 'react';
import { useAccount } from 'wagmi';

import { ReportSnapModal } from './modals/ReportSnapModal';
import { ReportButton } from '../../../components';
import { useVerifiableCredential } from '../../../hooks';
import { useSignErrorHandler } from '../../../hooks/useSignErrorHandler';
import useToastMsg from '../../../hooks/useToastMsg';

type ReportSnapProps = {
  snapId: string;
  snapName: string;
};

export const ReportSnap: FunctionComponent<ReportSnapProps> = ({
  snapId,
  snapName,
}) => {
  const [showModal, setShowModal] = useState(false);

  const { address } = useAccount();
  const { showSuccessMsg } = useToastMsg();

  const { signMessage, signError, snapVCBuilder } = useVerifiableCredential();

  useSignErrorHandler(signError);

  // TODO: hardcode options for now, change to dynamic if needed,
  // TODO may need to consider change options to key value pair to support i18n, key to stored in DB, value is localized string shown in UI.
  const options = [t`Scam`, t`Vulnerable`];

  const onSign = async (selected: string[]) => {
    if (address) {
      const VC = snapVCBuilder.buildDisputedPayload(address, snapId, selected);

      const signature = await signMessage(VC);
      if (signature) {
        const assertion = snapVCBuilder.getSignedAssertion(VC, signature);
        console.log('Snap Report assertion', assertion);
        showSuccessMsg({
          title: t`Success`,
          description: t`${snapName} has been reported.`,
        });
      }
      setShowModal(false);
    }
  };

  return (
    <>
      <ReportButton
        onClick={() => setShowModal(true)}
        reported={false}
        size="lg"
      />
      {showModal && (
        <ReportSnapModal
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
