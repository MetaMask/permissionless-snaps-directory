import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { type FunctionComponent, useEffect, useState } from 'react';
import { stringToHex } from 'viem';

import { ReportSnapModal } from './modals/ReportSnapModal';
import { ReportButton } from '../../../components';
import { useSelector, useVerifiableCredential } from '../../../hooks';
import { useVerax } from '../../../hooks/useVerax';
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
  const { snapVCBuilder } = useVerifiableCredential();

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

  const options = [t`Scam`, t`Vulnerable`];

  const attest = useVerax(address);

  const onSign = async (selected: string[]) => {
    await attest(
      '0xf7151fa0f8f527b14e962e5d75ee7b156a4801756a81f1043b36b09f95ae61eb',
      [
        {
          reaction: 'Disputed',
          reasons: selected && selected.length > 0 ? selected : [],
        },
      ],
      stringToHex(`snap://${snapChecksum}`),
      0,
    );

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
