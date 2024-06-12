import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { type FunctionComponent, useEffect, useState } from 'react';
import { stringToHex } from 'viem';

import { EndorseSnapModal } from './modals/EndorseSnapModal';
import { EndorseButton } from '../../../components';
import { useSelector } from '../../../hooks';
import { useVerax } from '../../../hooks/useVerax';
import {
  getCurrentSnapStatusForIssuer,
  isSnapEndorsedByIssuer,
} from '../assertions/store';

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
  const latestSnapStatus = useSelector(
    getCurrentSnapStatusForIssuer(snapChecksum, address),
  );

  const isSnapEndorsed = useSelector(
    isSnapEndorsedByIssuer(snapChecksum, address),
  );

  const [showModal, setShowModal] = useState(false);
  const [endorsed, setEndorsed] = useState(isSnapEndorsed);

  useEffect(() => {
    setEndorsed(isSnapEndorsed);
  }, [isSnapEndorsed]);

  const options = [t`Good user experience`, t`Useful`, t`Seems secure`];

  const attest = useVerax(address);

  const onSign = async (selected: string[]) => {
    await attest(
      '0xf7151fa0f8f527b14e962e5d75ee7b156a4801756a81f1043b36b09f95ae61eb',
      [
        {
          reaction: 'Endorsed',
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
      <EndorseButton
        onClick={() => setShowModal(true)}
        endorsed={endorsed}
        isDisabled={endorsed || latestSnapStatus !== null}
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
