import { useToast } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useCallback, useMemo, type FunctionComponent } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import { setAddToUserModalOpen } from './store';
import {
  ExportOutlineIcon,
  IconMenu,
  MenuItemCard,
  MoreOptionIcon,
  ShareIcon,
  UserCircleAddIcon,
} from '../../components';
import { useDispatch, useSelector } from '../../hooks';
import type { ApplicationState } from '../../store';

type MoreOptionMenuProps = {
  subjectAddress: string;
};

export const MoreOptionMenu: FunctionComponent<MoreOptionMenuProps> = ({
  subjectAddress,
}) => {
  const { userAccount } = useSelector(
    (state: ApplicationState) => state.accountProfile,
  );
  const dispatch = useDispatch();
  const toast = useToast({ position: 'top' });
  const { chain } = useNetwork();
  const { address } = useAccount();

  // Dont know why when we write following as async method, the typescript will have error complaining about the return type Promise<Void>
  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(`${window.location.origin}/account/${subjectAddress}`)
      .then(() => {
        toast({
          title: t`Copied`,
          description: t`Profile link copied to clipboard`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [toast, subjectAddress]);

  const openBloxplorer = useCallback(() => {
    if (chain) {
      window.open(`${chain.blockExplorers?.etherscan?.url}/address/${address}`);
    }
  }, [chain, address]);

  const shouldShowAddModal = useMemo(() => {
    if (address === subjectAddress) {
      return false;
    }

    if (userAccount.userCircle.includes(subjectAddress)) {
      return false;
    }

    return true;
  }, [address, subjectAddress, userAccount]);

  return (
    <IconMenu icon={<MoreOptionIcon />}>
      {shouldShowAddModal && (
        <MenuItemCard
          icon={<UserCircleAddIcon />}
          label={t`Add to my circle`}
          onClick={() => dispatch(setAddToUserModalOpen(true))}
        />
      )}
      <MenuItemCard
        icon={<ShareIcon />}
        label={t`Copy profile link`}
        onClick={() => {
          copyToClipboard();
        }}
      />
      <MenuItemCard
        icon={<ExportOutlineIcon />}
        label={t`Etherscan`}
        onClick={() => openBloxplorer()}
      />
    </IconMenu>
  );
};
