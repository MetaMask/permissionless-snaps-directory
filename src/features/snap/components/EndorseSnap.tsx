import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { type FunctionComponent, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { EndorseSnapModal } from './modals/EndorseSnapModal';
import { writeSnapAssertion } from '../../../ceramic/snap-assertion';
import { EndorseButton } from '../../../components';
import { useSelector, useVerifiableCredential } from '../../../hooks';
import { useSignErrorHandler } from '../../../hooks/useSignErrorHandler';
import type { Assertion } from '../../../utils';
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
  const { connector } = useAccount();
  const { signMessage, signError, snapVCBuilder } = useVerifiableCredential();

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
      const provider = await connector?.getProvider();
      await writeSnapAssertion(
        verifiableCredential.message as Assertion,
        signature,
        address,
        provider,
      );
    }
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
