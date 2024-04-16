import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { mainnet } from '@wagmi/core/chains';
import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useEnsName } from 'wagmi';

import {
  createAccountAssertion,
  fetchAccountAssertionsForAccountId,
} from './assertions/api';
import {
  getCurrentTrustworthinessLevelForIssuer,
  isAccountReportedByIssuer,
} from './assertions/store';
import { AccountReportModal } from './components';
import { ReportButton } from '../../components';
import { useDispatch, useSelector, useVerifiableCredential } from '../../hooks';
import { useSignErrorHandler } from '../../hooks/useSignErrorHandler';
import useToastMsg from '../../hooks/useToastMsg';
import { trimAddress } from '../../utils';

type AccountReportProps = {
  address: Hex;
  connectedAddress: Hex;
};

export const AccountReport: FunctionComponent<AccountReportProps> = ({
  address,
  connectedAddress,
}) => {
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

  const isAccountReported = useSelector(
    isAccountReportedByIssuer(address, connectedAddress),
  );

  const reportEntity = data ?? trimmedAddress;

  const [showModal, setShowModal] = useState(false);
  const [reported, setEndorsed] = useState(isAccountReported);

  useEffect(() => {
    setEndorsed(isAccountReported);
  }, [isAccountReported]);

  const dispatch = useDispatch();

  const { showSuccessMsg, showErrorMsg } = useToastMsg();

  useSignErrorHandler(signError);

  // TODO: hardcode options for now, change to dynamic if needed
  const options = [
    t`Scamming`,
    t`Hacking`,
    t`Harassment`,
    t`Disinformation`,
    t`Other`,
  ];

  const onSign = async (selected: string[]) => {
    const VC = accountVCBuilder.buildReportAccountTrust(
      connectedAddress,
      address,
      selected,
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
              description: t`${address} has been reported.`,
            });
          } else {
            showErrorMsg({
              title: t`Error`,
              description: t`Failed to create report for ${address}.`,
            });
          }
        })
        .catch(() => {
          showErrorMsg({
            title: t`Error`,
            description: t`Failed to create report for ${address}.`,
          });
        });
    }
    setShowModal(false);
  };

  return (
    <>
      <ReportButton
        onClick={() => setShowModal(true)}
        reported={reported}
        isDisabled={
          reported ||
          (latestTrustworthinessLevel !== undefined &&
            latestTrustworthinessLevel < 0)
        }
      />
      {showModal && (
        <AccountReportModal
          reportEntity={reportEntity}
          visibility={showModal}
          onClose={() => setShowModal(false)}
          options={options}
          onSign={onSign}
        />
      )}
    </>
  );
};
