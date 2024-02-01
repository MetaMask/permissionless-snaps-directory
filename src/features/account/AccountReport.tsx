import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useMemo, useState, type FunctionComponent } from 'react';
import { useEnsName } from 'wagmi';

import { AccountReportModal } from './components';
import { ReportButton } from '../../components';
import { useVerifiableCredential } from '../../hooks';
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
  });

  const { showSuccessMsg } = useToastMsg();

  const { signMessage, signError, accountVCBuilder } =
    useVerifiableCredential();

  useSignErrorHandler(signError);

  const trimedAddress = useMemo(() => trimAddress(address), [address]);

  const reportEntity = data ?? trimedAddress;

  const [showModal, setShowModal] = useState(false);

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
      console.log('report assertion', assertion);
      const successMessage = `${reportEntity} ${t`has been reported`}`;

      showSuccessMsg({
        title: t`Success`,
        description: successMessage,
      });

      // save db (assertion)

      setShowModal(false);
    }
  };

  return (
    <>
      <ReportButton onClick={() => setShowModal(true)} reported={false} />
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
