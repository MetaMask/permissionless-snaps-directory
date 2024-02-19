import { Button, type ModalProps } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { SignIcon } from './icons';
import { SimpleModal } from './SimpleModal';

export type RequestSignModalProps = ModalProps & {
  mode: 'positive' | 'negative';
  headerIcon: JSX.Element;
  buttonText: string;
  isLoading: boolean;
  buttonDisabled?: boolean;
  onSignButtonClick: () => void;
};

/**
 * Render a modal with header, body and button to request signature.
 *
 * @param props - The component props.
 * @param props.isOpen - Whether the modal is open.
 * @param props.onClose - A function to close the modal.
 * @param props.mode - The mode of the modal.
 * @param props.headerIcon - The icon to render as a header of the modal.
 * @param props.children - The children to render inside the modal.
 * @param props.buttonText - The text to be shown on sign button.
 * @param props.onSignButtonClick - A function to be called when Sign button is clicked.
 * @param props.isLoading - Whether the modal is loading.
 * @param props.buttonDisabled - Whether the button is disabled.
 * @returns A React component.
 */
export const RequestSignModal: FunctionComponent<RequestSignModalProps> = ({
  isOpen,
  onClose,
  mode,
  headerIcon,
  children,
  buttonText,
  isLoading,
  buttonDisabled = false,
  onSignButtonClick,
  ...props
}) => {
  return (
    <>
      <SimpleModal
        isOpen={isOpen}
        onClose={onClose}
        headerIcon={headerIcon}
        {...props}
      >
        {children}
        <Button
          variant="primary"
          bg={mode === 'positive' ? 'info.default' : 'error.default'}
          fontSize="md"
          fontWeight="medium"
          leftIcon={<SignIcon width="1rem" fill="currentColor" />}
          width="100%"
          isLoading={isLoading}
          isDisabled={buttonDisabled}
          onClick={() => onSignButtonClick()}
        >
          <Trans>{buttonText}</Trans>
        </Button>
      </SimpleModal>
    </>
  );
};
