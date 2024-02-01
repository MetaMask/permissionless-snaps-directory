import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useMemo, useState, type FunctionComponent } from 'react';
import { useEnsName } from 'wagmi';

import { TEEndorsementModal } from './components';
import { EndorseButton } from '../../components';
import { useSignErrorHandler } from '../../hooks/useSignErrorHandler';
import useToastMsg from '../../hooks/useToastMsg';
import { useVerifiableCredential } from '../../hooks/useVerifiableCredential';
import {
  trimAddress,
  TrustworthinessScope,
  type Trustworthiness,
} from '../../utils';

type AccountTEEndorsementProps = {
  address: Hex;
  connectedAddress: Hex;
};

export const AccountTEEndorsement: FunctionComponent<
  AccountTEEndorsementProps
> = ({ address, connectedAddress }) => {
  const { data } = useEnsName({
    address,
  });

  const { showSuccessMsg } = useToastMsg();

  const { signMessage, signError, accountVCBuilder } =
    useVerifiableCredential();

  useSignErrorHandler(signError);

  const trimedAddress = useMemo(() => trimAddress(address), [address]);

  const [showModal, setShowModal] = useState(false);

  const options = [
    {
      label: t`Software Development`,
      description: t`Ability to develop MetaMask Snaps`,
      value: TrustworthinessScope.SoftwareDevelopment,
    },
    {
      label: t`Software Security`,
      description: t`Ability to develop secure applications`,
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
      const assertion = accountVCBuilder.getSignedAssertion(VC, signature);
      console.log('assertion', assertion);

      showSuccessMsg({
        title: t`Success`,
        description: t`Your endorsement has been done`,
      });

      // save db (assertion)

      setShowModal(false);
    }
  };

  return (
    <>
      <EndorseButton onClick={() => setShowModal(true)} endorsed={false} />
      {showModal && (
        <TEEndorsementModal
          trustEntity={data ?? trimedAddress}
          visibility={showModal}
          onClose={() => setShowModal(false)}
          options={options}
          onSign={onSign}
        />
      )}
    </>
  );
};
