import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent } from 'react';

import { ReportSnapModal } from './modals/ReportSnapModal';
import { ReportButton } from '../../../components';
import { useDispatch, useVerifiableCredential } from '../../../hooks';
import { useSignErrorHandler } from '../../../hooks/useSignErrorHandler';
import useToastMsg from '../../../hooks/useToastMsg';
import {
  createSnapAssertion,
  fetchSnapAssertionsForSnapId,
} from '../assertions/api';

type ReportSnapProps = {
  address: Hex;
  snapChecksum: string;
  snapName: string;
};

export const ReportSnap: FunctionComponent<ReportSnapProps> = ({
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
  const options = [t`Scam`, t`Vulnerable`];

  const onSign = async (selected: string[]) => {
    const VC = snapVCBuilder.buildDisputedPayload(
      address,
      snapChecksum,
      selected,
    );

    const signature = await signMessage(VC);
    if (signature) {
      const assertion = snapVCBuilder.getSignedAssertion(VC, signature);
      dispatch(createSnapAssertion(assertion))
        .then(async (action) => {
          if (action.type.endsWith('fulfilled')) {
            dispatch(fetchSnapAssertionsForSnapId(snapChecksum)).catch(
              (error) => console.log(error),
            );
            showSuccessMsg({
              title: t`Success`,
              description: t`${snapName} has been reported.`,
            });
          } else {
            showErrorMsg({
              title: t`Error`,
              description: t`Failed to create report for ${snapName}.`,
            });
          }
        })
        .catch(() => {
          showErrorMsg({
            title: t`Error`,
            description: t`Failed to create report for ${snapName}.`,
          });
        });
    }
    setShowModal(false);
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
