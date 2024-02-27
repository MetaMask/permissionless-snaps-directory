import { t } from '@lingui/macro';
import { useCallback, type FunctionComponent } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import {
  ExportOutlineIcon,
  IconMenu,
  MenuItemCard,
  MoreOptionIcon,
  ShareIcon,
} from '../../components';
import useToastMsg from '../../hooks/useToastMsg';

type MoreOptionMenuProps = {
  subjectAddress: string;
};

export const MoreOptionMenu: FunctionComponent<MoreOptionMenuProps> = ({
  subjectAddress,
}) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { showSuccessMsg, showErrorMsg } = useToastMsg();

  // Dont know why when we write following as async method, the typescript will have error complaining about the return type Promise<Void>
  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(`${window.location.origin}/account/?address=${subjectAddress}`)
      .then(() => {
        showSuccessMsg({
          title: t`Copied`,
          description: t`Profile link copied to clipboard`,
        });
      })
      .catch(() => {
        showErrorMsg({
          title: t`Error`,
          description: t`Failed to copy profile link to clipboard`,
        });
      });
  }, [subjectAddress, showErrorMsg, showSuccessMsg]);

  const openBlockExplorer = useCallback(() => {
    window.open(`${chain?.blockExplorers?.etherscan?.url}/address/${address}`);
  }, [chain, address]);

  // const shouldShowAddModal = useMemo(() => {
  //   if (address === subjectAddress) {
  //     return false;
  //   }

  //   if (userAccount.userCircle.includes(subjectAddress)) {
  //     return false;
  //   }

  //   return true;
  // }, [address, subjectAddress, userAccount]);

  return (
    <IconMenu icon={<MoreOptionIcon />}>
      {/* {shouldShowAddModal && (
        <MenuItemCard
          icon={<UserCircleAddIcon />}
          label={t`Add to my circle`}
          testId="add-to-circle"
          onClick={() => dispatch(setAddToUserModalOpen(true))}
        />
      )} */}
      <MenuItemCard
        icon={<ShareIcon />}
        label={t`Copy profile link`}
        testId="copy-profile-link"
        onClick={() => {
          copyToClipboard();
        }}
      />
      <MenuItemCard
        icon={<ExportOutlineIcon />}
        label={t`Etherscan`}
        testId="etherscan"
        onClick={() => openBlockExplorer()}
      />
    </IconMenu>
  );
};
