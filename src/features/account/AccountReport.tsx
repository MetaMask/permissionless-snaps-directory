import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { mainnet } from '@wagmi/core/chains';
import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useAccount, useEnsName } from 'wagmi';

import {
  getCurrentTrustworthinessLevelForIssuer,
  isAccountReportedByIssuer,
} from './assertions/store';
import { AccountReportModal } from './components';
import { writeAccountAssertion } from '../../ceramic/account-assertion';
import { ReportButton } from '../../components';
import { useSelector, useVerifiableCredential } from '../../hooks';
import { useSignErrorHandler } from '../../hooks/useSignErrorHandler';
import type { Assertion } from '../../utils';
import { trimAddress } from '../../utils';

type AccountReportProps = {
  address: Hex;
  connectedAddress: Hex;
};

export const AccountReport: FunctionComponent<AccountReportProps> = ({
  address,
  connectedAddress,
}) => {
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

  const isAccountReported = useSelector(
    isAccountReportedByIssuer(address, connectedAddress),
  );

  const reportEntity = data ?? trimmedAddress;

  const [showModal, setShowModal] = useState(false);
  const [reported, setEndorsed] = useState(isAccountReported);

  useEffect(() => {
    setEndorsed(isAccountReported);
  }, [isAccountReported]);

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
