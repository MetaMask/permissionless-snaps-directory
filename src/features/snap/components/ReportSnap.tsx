import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent } from 'react';

import { ReportSnapModal } from './modals/ReportSnapModal';
import { ReportButton } from '../../../components';
import {
  useDispatch,
  useSelector,
  useVerifiableCredential,
} from '../../../hooks';
import { useSignErrorHandler } from '../../../hooks/useSignErrorHandler';
import useToastMsg from '../../../hooks/useToastMsg';
import {
  createSnapAssertion,
  fetchSnapAssertionsForSnapId,
} from '../assertions/api';
import {
  getCurrentSnapStatusForIssuer,
  isSnapReportedByIssuer,
} from '../assertions/store';
import { SnapCurrentStatus } from '../assertions/types';

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
  const { signMessage, signError, snapVCBuilder } = useVerifiableCredential();

  const issuer = snapVCBuilder.getIssuerDid(address);

  const latestSnapStatus = useSelector(
    getCurrentSnapStatusForIssuer(snapChecksum, issuer),
  );

  const isSnapReported = useSelector(
    isSnapReportedByIssuer(snapChecksum, issuer),
  );

  const [showModal, setShowModal] = useState(false);
  const [reported, setReported] = useState(isSnapReported);

  const dispatch = useDispatch();

  const { showSuccessMsg, showErrorMsg } = useToastMsg();

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
            setReported(true);
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
        reported={reported}
        isDisabled={reported || latestSnapStatus === SnapCurrentStatus.Disputed}
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
