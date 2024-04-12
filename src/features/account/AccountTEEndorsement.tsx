import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import type { Address } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useEnsName } from 'wagmi';

import {
  createAccountAssertion,
  fetchAccountAssertionsForAccountId,
} from './assertions/api';
import {
  getCurrentTrustworthinessLevelForIssuer,
  isAccountEndorsedByIssuer,
} from './assertions/store';
import { TEEndorsementModal } from './components';
import { EndorseButton } from '../../components';
import { useDispatch, useSelector } from '../../hooks';
import { useSignErrorHandler } from '../../hooks/useSignErrorHandler';
import useToastMsg from '../../hooks/useToastMsg';
import { useVerifiableCredential } from '../../hooks/useVerifiableCredential';
import {
  trimAddress,
  type Trustworthiness,
  TrustworthinessScope,
} from '../../utils';

type AccountTEEndorsementProps = {
  address: Hex;
  connectedAddress: Address;
};

export const AccountTEEndorsement: FunctionComponent<
  AccountTEEndorsementProps
> = ({ address, connectedAddress }) => {
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

  const dispatch = useDispatch();

  const { showSuccessMsg, showErrorMsg } = useToastMsg();

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
      const assertion = accountVCBuilder.getSignedAssertion(VC, signature);
      dispatch(createAccountAssertion(assertion))
        .then((action) => {
          if (action.type.endsWith('fulfilled')) {
            dispatch(fetchAccountAssertionsForAccountId(address)).catch(
              (error) => console.log(error),
            );
            setEndorsed(true);
            showSuccessMsg({
              title: t`Success`,
              description: t`${address} has been endorsed.`,
            });
          } else {
            showErrorMsg({
              title: t`Error`,
              description: t`Failed to create endorsement for ${address}.`,
            });
          }
        })
        .catch(() => {
          showErrorMsg({
            title: t`Error`,
            description: t`Failed to create endorsement for ${address}.`,
          });
        });
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
