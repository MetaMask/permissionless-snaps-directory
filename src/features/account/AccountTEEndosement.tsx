import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent, useMemo } from 'react';
import { useEnsName } from 'wagmi';

import { TEEndosementModal, TEEndosementButton } from './components';
import { trimAddress } from '../../utils';

type AccountTEEndosementProps = {
  address: Hex;
  connectedAddress: Hex;
};

export const AccountTEEndosement: FunctionComponent<
  AccountTEEndosementProps
> = ({ address }) => {
  const { data } = useEnsName({
    address,
  });

  const trimedAddress = useMemo(() => trimAddress(address), [address]);

  const [showModal, setShowModal] = useState(false);

  // TODO: hardcode options for now, change to dynamic if needed
  const options = [
    {
      label: t`Software Development`,
      description: t`Ability to develop MetaMask Snaps`,
      value: 'Software Development',
    },
    {
      label: t`Software Security`,
      description: t`Ability to develop secure applications`,
      value: 'Software Security',
    },
  ];

  const onSign = async (selected: string[]) => {
    console.log(selected);
    setShowModal(false);
  };

  return (
    <>
      <TEEndosementButton onClick={() => setShowModal(true)} endosed={false} />
      {showModal && (
        <TEEndosementModal
          trustEntity={data ?? trimedAddress}
          visability={showModal}
          onClose={() => setShowModal(false)}
          options={options}
          onSign={onSign}
        />
      )}
    </>
  );
};
