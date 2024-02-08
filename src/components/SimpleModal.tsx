import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  type ModalProps,
} from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

export type SimpleModalProps = ModalProps & {
  headerIcon: JSX.Element;
};

/**
 * Render a simple modal with header, body.
 *
 * @param props - The component props.
 * @param props.isOpen - Whether the modal is open.
 * @param props.onClose - A function to close the modal.
 * @param props.headerIcon - The icon to render as a header of the modal.
 * @param props.children - The children to render inside the modal.
 * @returns A React component.
 */
export const SimpleModal: FunctionComponent<SimpleModalProps> = ({
  isOpen,
  onClose,
  headerIcon,
  children,
  ...props
}) => {
  return (
    <Modal
      variant="minimal"
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      {...props}
    >
      <ModalOverlay />
      <ModalContent bg="background.alternative">
        <ModalCloseButton />
        <ModalBody>
          <Center flexDirection="column" rowGap="1.5rem">
            {headerIcon}
            {children}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
