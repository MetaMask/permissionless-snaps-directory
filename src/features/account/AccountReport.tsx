import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent, useMemo } from 'react';
import { useEnsName } from 'wagmi';

import { AccountReportButton, AccountReportModal } from './components';
import { trimAddress } from '../../utils';

type AccountReportProps = {
  address: Hex;
};

export const AccountReport: FunctionComponent<AccountReportProps> = ({
  address,
}) => {
  const { data } = useEnsName({
    address,
  });

  const trimedAddress = useMemo(() => trimAddress(address), [address]);

  const [showModal, setShowModal] = useState(false);

  // TODO: hardcode options for now, change to dynamic if needed
  const options = [
    t`Scamming`,
    t`Hacking`,
    t`Harassment`,
    t`Disinformation`,
    t`Other`,
  ];

  const onSign = async (selectedReasons: string[]) => {
    console.log(selectedReasons);
    setShowModal(false);
  };

  return (
    <>
      <AccountReportButton
        onClick={() => setShowModal(true)}
        reported={false}
      />
      {showModal && (
        <AccountReportModal
          reportEntity={data ?? trimedAddress}
          visability={showModal}
          onClose={() => setShowModal(false)}
          options={options}
          onSign={onSign}
        />
      )}
    </>
  );
};
