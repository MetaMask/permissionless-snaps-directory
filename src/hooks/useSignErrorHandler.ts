import { t } from '@lingui/macro';
import { useEffect } from 'react';

import useToastMsg from './useToastMsg';
import type { VCSignError } from './useVerifiableCredential';
import { VCSignErrorType } from './useVerifiableCredential';

export type SignErrorDespProps = {
  signErrorDescription?: string;
  verifyErrorDescription?: string;
  verifyFailedDescription?: string;
  unknownErrorDescription?: string;
};

/**
 * A Hook to handle sign error and display the error message in toast.
 *
 * @param signError - The sign error.
 * @param overrideDescriptionProp - The override description props.
 */
export function useSignErrorHandler(
  signError: VCSignError | undefined,
  overrideDescriptionProp?: SignErrorDespProps,
) {
  const { showErrorMsg } = useToastMsg();

  useEffect(() => {
    if (signError) {
      if (signError.type === VCSignErrorType.SignError) {
        showErrorMsg({
          title: t`Failed to sign the message`,
          description:
            overrideDescriptionProp?.signErrorDescription ??
            signError?.message ??
            t`Failed to sign the msssage`,
        });
      } else if (signError.type === VCSignErrorType.VerifyError) {
        showErrorMsg({
          title: t`Failed to verify signature`,
          description:
            overrideDescriptionProp?.signErrorDescription ??
            signError?.message ??
            t`Failed tyo verify signature`,
        });
      } else if (signError.type === VCSignErrorType.VerifyFailed) {
        showErrorMsg({
          title: t`Invalid Signature`,
          description:
            overrideDescriptionProp?.signErrorDescription ??
            signError?.message ??
            t`Invalid Signature`,
        });
      } else {
        showErrorMsg({
          title: t`Failed to sign the message`,
          description:
            overrideDescriptionProp?.unknownErrorDescription ??
            signError.message ??
            t`Unknown Error`,
        });
      }
    }
  }, [signError, overrideDescriptionProp, showErrorMsg]);
}
