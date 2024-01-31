import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent, useMemo, useEffect } from 'react';
import { useEnsName } from 'wagmi';

import { AccountReportModal } from './components';
import { ReportButton } from '../../components';
import { VCSignErrorType, useVerifiableCredential } from '../../hooks';
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

  const { showErrorMsg, showSuccessMsg } = useToastMsg();

  const { signMessage, signError, accountVCBuilder } =
    useVerifiableCredential();

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
