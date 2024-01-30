import { t } from '@lingui/macro';
import { useEffect } from 'react';

import useToastMsg from './useToastMsg';
import type { VCSignError } from './useVerifiableCredential';
import { VCSignErrorType } from './useVerifiableCredential';

export type CustomErrorProps = {
  [key: string]: {
    title: string;
    description: string;
  };
};

/**
 * A Hook to handle sign error and display the error message in toast.
 *
 * @param signError - The sign error.
 * @param errorMessages - The override error messages.
 */
export function useSignErrorHandler(
  signError: VCSignError | undefined,
  errorMessages?: CustomErrorProps,
) {
  const { showErrorMsg } = useToastMsg();

  useEffect(() => {
    if (signError) {
      const defaultTitle = t`Unknown Error`;
      const defaultDescription = t`Unknown Error`;

      const errorMsg = errorMessages ?? {};

      for (const item in VCSignErrorType) {
        if (!errorMsg[item]) {
          if (item === VCSignErrorType.SignError) {
            errorMsg[item] = {
              title: t`Failed to sign the message`,
              description: signError?.message ?? t`Failed to sign the message`,
            };
          } else if (item === VCSignErrorType.VerifyError) {
            errorMsg[item] = {
              title: t`Failed to verify signature`,
              description: signError?.message ?? t`Failed to verify signature`,
            };
          } else {
            errorMsg[item] = {
              title: t`Invalid Signature`,
              description: signError?.message ?? t`Invalid Signature`,
            };
          }
        }
      }

      showErrorMsg({
        title: errorMsg[signError.type]?.title ?? defaultTitle,
        description:
          errorMsg[signError.type]?.description ?? defaultDescription,
      });
    }
  }, [signError, errorMessages, showErrorMsg]);
}
