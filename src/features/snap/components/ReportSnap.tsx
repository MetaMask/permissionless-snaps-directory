import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent, useEffect } from 'react';
import { useAccount } from 'wagmi';

import { ReportSnapModal } from './modals/ReportSnapModal';
import { writeSnapAssertion } from '../../../ceramic/snap-assertion';
import { ReportButton } from '../../../components';
import { useSelector, useVerifiableCredential } from '../../../hooks';
import { useSignErrorHandler } from '../../../hooks/useSignErrorHandler';
import type { Assertion } from '../../../utils';
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
  const { connector } = useAccount();
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

  useEffect(() => {
    setReported(isSnapReported);
  }, [isSnapReported]);

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
      const provider = await connector?.getProvider();
      await writeSnapAssertion(
        VC.message as Assertion,
        signature,
        address,
        provider,
      );
    }
    setShowModal(false);
  };

  return (
    <>
      <ReportButton
        onClick={() => setShowModal(true)}
        reported={reported}
        isDisabled={reported || latestSnapStatus === SnapCurrentStatus.Disputed}
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
