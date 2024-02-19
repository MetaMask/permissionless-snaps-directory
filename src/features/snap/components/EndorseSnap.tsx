import { t } from '@lingui/macro';
import type { Hex } from '@metamask/utils';
import { useState, type FunctionComponent, useEffect } from 'react';

import { EndorseSnapModal } from './modals/EndorseSnapModal';
import { EndorseButton } from '../../../components';
import {
  useDispatch,
  useSelector,
  useVerifiableCredential,
} from '../../../hooks';
import { useSignErrorHandler } from '../../../hooks/useSignErrorHandler';
import useToastMsg from '../../../hooks/useToastMsg';
import {
  createSnapAssertion,
  fetchSnapAssertionsForSnapId,
} from '../assertions/api';
import {
  getCurrentSnapStatusForIssuer,
  isSnapEndorsedByIssuer,
} from '../assertions/store';

type EndorseSnapProps = {
  address: Hex;
  snapChecksum: string;
  snapName: string;
};

export const EndorseSnap: FunctionComponent<EndorseSnapProps> = ({
  address,
  snapChecksum,
  snapName,
}) => {
  const { signMessage, signError, snapVCBuilder } = useVerifiableCredential();

  const issuer = snapVCBuilder.getIssuerDid(address);

  const latestSnapStatus = useSelector(
    getCurrentSnapStatusForIssuer(snapChecksum, issuer),
  );

  const isSnapEndorsed = useSelector(
    isSnapEndorsedByIssuer(snapChecksum, issuer),
  );

  const [showModal, setShowModal] = useState(false);
  const [endorsed, setEndorsed] = useState(isSnapEndorsed);

  useEffect(() => {
    setEndorsed(isSnapEndorsed);
  }, [isSnapEndorsed]);

  const dispatch = useDispatch();

  const { showSuccessMsg, showErrorMsg } = useToastMsg();

  useSignErrorHandler(signError);

  // TODO: hardcode options for now, change to dynamic if needed,
  // TODO may need to consider change options to key value pair to support i18n, key to stored in DB, value is localized string shown in UI.
  const options = [t`Good user experience`, t`Useful`, t`Seems secure`];

  const onSign = async (selected: string[]) => {
    const verifiableCredential = snapVCBuilder.buildEndorsedPayload(
      address,
      snapChecksum,
      selected,
    );

    const signature = await signMessage(verifiableCredential);
    if (signature) {
      const assertion = snapVCBuilder.getSignedAssertion(
        verifiableCredential,
        signature,
      );
      dispatch(createSnapAssertion(assertion))
        .then((action) => {
          if (action.type.endsWith('fulfilled')) {
            dispatch(fetchSnapAssertionsForSnapId(snapChecksum)).catch(
              (error) => console.log(error),
            );
            setEndorsed(true);
            showSuccessMsg({
              title: t`Success`,
              description: t`${snapName} has been endorsed.`,
            });
          } else {
            showErrorMsg({
              title: t`Error`,
              description: t`Failed to create endorsement for ${snapName}.`,
            });
          }
        })
        .catch(() => {
          showErrorMsg({
            title: t`Error`,
            description: t`Failed to create endorsement for ${snapName}.`,
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
        isDisabled={endorsed || latestSnapStatus !== null}
      />
      {showModal && (
        <EndorseSnapModal
          snapName={snapName}
          options={options}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSign={onSign}
        />
      )}
    </>
  );
};
