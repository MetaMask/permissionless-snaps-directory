import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent, useMemo, useEffect } from 'react';
import { useEnsName } from 'wagmi';

import { TEEndorsementModal, TEEndorsementButton } from './components';
import useToastMsg from '../../hooks/useToastMsg';
import {
  useVerifiableCredential,
  VCSignErrorType,
} from '../../hooks/useVerifiableCredential';
import {
  TrustworthinessScope,
  type Trustworthiness,
  trimAddress,
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

  const { showErrorMsg, showSuccessMsg } = useToastMsg();

  const { signMessage, signError, accountVCBuilder } =
    useVerifiableCredential();

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

  useEffect(() => {
    if (signError) {
      if (signError.type === VCSignErrorType.SignError) {
        showErrorMsg({
          title: t`Failed to sign the message`,
          // TODO change to human readable error message
          description: signError?.message as string,
        });
      } else if (signError.type === VCSignErrorType.VerifyError) {
        showErrorMsg({
          title: t`Failed to verify signature`,
          description: t`Your signature is invalid`,
        });
      } else if (signError.type === VCSignErrorType.VerifyFailed) {
        showErrorMsg({
          title: t`Invalid Signature`,
          // TODO change to human readable error message
          description: signError?.message as string,
        });
      } else {
        showErrorMsg({
          title: t`Failed to sign the message`,
          description: t`Unknown error`,
        });
      }
    }
  }, [signError, showErrorMsg]);

  return (
    <>
      <TEEndorsementButton
        onClick={() => setShowModal(true)}
        endorsed={false}
      />
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
