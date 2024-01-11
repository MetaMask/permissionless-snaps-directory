import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { SignIcon } from './icons';

export type ProfileTrustModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'trust' | 'report';
  icon: JSX.Element;
  children: JSX.Element;
  buttonText: string;
};

/**
 * A modal that is shown after a profile menu option is selected.
 *
 * @param props - The component props.
 * @param props.isOpen - Whether the modal is open.
 * @param props.onClose - A function to close the modal.
 * @param props.mode - The mode of the modal.
 * @param props.icon - The icon to render as a header of the modal.
 * @param props.children - The children to render inside the modal.
 * @param props.buttonText - The text to be shown on sign button.
 * @returns A React component.
 */
export const ProfileTrustModal: FunctionComponent<ProfileTrustModalProps> = ({
  isOpen,
  onClose,
  mode = 'trust',
  icon,
  children,
  buttonText,
}) => {
  return (
    <>
      <Modal variant="minimal" size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="background.alternative">
          <ModalCloseButton />
          <ModalBody>
            <Center flexDirection="column" rowGap="1.5rem">
              {icon}
              {children}
              <Button
                variant="primary"
                bg={mode === 'trust' ? 'info.default' : 'error.default'}
                fontSize="sm"
                leftIcon={<SignIcon width="1rem" fill="currentColor" />}
                width="100%"
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
