import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import type { Address } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useAccount, useEnsName } from 'wagmi';

import {
  getCurrentTrustworthinessLevelForIssuer,
  isAccountEndorsedByIssuer,
} from './assertions/store';
import { TEEndorsementModal } from './components';
import { writeAccountAssertion } from '../../ceramic/account-assertion';
import { EndorseButton } from '../../components';
import { useSelector } from '../../hooks';
import { useSignErrorHandler } from '../../hooks/useSignErrorHandler';
import { useVerifiableCredential } from '../../hooks/useVerifiableCredential';
import { trimAddress, TrustworthinessScope } from '../../utils';
import type { Assertion, Trustworthiness } from '../../utils';

type AccountTEEndorsementProps = {
  address: Hex;
  connectedAddress: Address;
};

export const AccountTEEndorsement: FunctionComponent<
  AccountTEEndorsementProps
> = ({ address, connectedAddress }) => {
  const { connector } = useAccount();
  const { data } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const { signMessage, signError, accountVCBuilder } =
    useVerifiableCredential();

  const trimmedAddress = useMemo(() => trimAddress(address), [address]);

  const latestTrustworthinessLevel = useSelector(
    getCurrentTrustworthinessLevelForIssuer(address, connectedAddress),
  );

  const isAccountEndorsed = useSelector(
    isAccountEndorsedByIssuer(address, connectedAddress),
  );

  const trustEntity = data ?? trimmedAddress;

  const [showModal, setShowModal] = useState(false);
  const [endorsed, setEndorsed] = useState(isAccountEndorsed);

  useEffect(() => {
    setEndorsed(isAccountEndorsed);
  }, [isAccountEndorsed]);

  useSignErrorHandler(signError);

  const options = [
    {
      label: t`Software Development`,
      description: t`Ability to develop reliable Snaps`,
      value: TrustworthinessScope.SoftwareDevelopment,
    },
    {
      label: t`Software Security`,
      description: t`Ability to evaluate Snaps security`,
      value: TrustworthinessScope.SoftwareSecurity,
    },
  ];

  const fillOptions = (selected: string[]): Trustworthiness[] => {
    const selectedOptions = new Set<string>(selected);

    return options.map((option) => ({
      scope: option.value,
      level: selectedOptions.has(option.value) ? 1 : 0,
    }));
  };

  const onSign = async (selected: string[]) => {
    const VC = accountVCBuilder.buildTechnicalExpertiseTrust(
      connectedAddress,
      address,
      fillOptions(selected),
    );

    const signature = await signMessage(VC);

    if (signature) {
      const provider = await connector?.getProvider();
      await writeAccountAssertion(
        VC.message as Assertion,
        signature,
        connectedAddress,
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
        isDisabled={endorsed || latestTrustworthinessLevel !== undefined}
      />
      {showModal && (
        <TEEndorsementModal
          trustEntity={trustEntity}
          visibility={showModal}
          onClose={() => setShowModal(false)}
          options={options}
          onSign={onSign}
        />
      )}
    </>
  );
};
