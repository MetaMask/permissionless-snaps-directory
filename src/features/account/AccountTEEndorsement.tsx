import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useMemo, useState, type FunctionComponent, useEffect } from 'react';
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

  const { signMessage, signError, accountVCBuilder } =
    useVerifiableCredential();

  const trimedAddress = useMemo(() => trimAddress(address), [address]);

  const pkhAddress = accountVCBuilder.getSubjectDid(address);
  const issuer = accountVCBuilder.getSubjectDid(connectedAddress);

  const latestTrustworthinessLevel = useSelector(
    getCurrentTrustworthinessLevelForIssuer(pkhAddress, issuer),
  );

  const isAccountEndorsed = useSelector(
    isAccountEndorsedByIssuer(pkhAddress, issuer),
  );

  const trustEntity = data ?? trimedAddress;

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
      dispatch(createAccountAssertion(assertion))
        .then((action) => {
          if (action.type.endsWith('fulfilled')) {
            dispatch(fetchAccountAssertionsForAccountId(pkhAddress)).catch(
              (error) => console.log(error),
            );
            setEndorsed(true);
            showSuccessMsg({
              title: t`Success`,
              description: t`${pkhAddress} has been endorsed.`,
            });
          } else {
            showErrorMsg({
              title: t`Error`,
              description: t`Failed to create endorsement for ${pkhAddress}.`,
            });
          }
        })
        .catch(() => {
          showErrorMsg({
            title: t`Error`,
            description: t`Failed to create endorsement for ${pkhAddress}.`,
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
