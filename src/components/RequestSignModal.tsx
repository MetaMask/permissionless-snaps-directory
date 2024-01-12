import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  type ModalProps,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { SignIcon } from './icons';

export type RequestSignModalProps = ModalProps & {
  mode: 'positive' | 'negative';
  headerIcon: JSX.Element;
  buttonText: string;
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
 * @returns A React component.
 */
export const RequestSignModal: FunctionComponent<RequestSignModalProps> = ({
  isOpen,
  onClose,
  mode = 'positive',
  headerIcon,
  children,
  buttonText,
  onSignButtonClick,
  ...props
}) => {
  return (
    <>
      <Modal
        variant="minimal"
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        {...props}
      >
        <ModalOverlay />
        <ModalContent bg="background.alternative">
          <ModalCloseButton />
          <ModalBody>
            <Center flexDirection="column" rowGap="1.5rem">
              {headerIcon}
              {children}
              <Button
                variant="primary"
                bg={mode === 'positive' ? 'info.default' : 'error.default'}
                fontSize="sm"
                leftIcon={<SignIcon width="1rem" fill="currentColor" />}
                width="100%"
                onClick={() => onSignButtonClick()}
              >
                <Trans>{buttonText}</Trans>
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
