import { Center, Link, Text, VStack } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import { useState, type FunctionComponent } from 'react';

import {
  MultipleCheckboxOptions,
  RequestSignModal,
  StarFilledIcon,
} from '../../../../components';

export type EndorseSnapModalProps = {
  snapName: string;
  options: string[];
  onSign: (arg: string[]) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
};

export const EndorseSnapModal: FunctionComponent<EndorseSnapModalProps> = ({
  snapName,
  options,
  onSign,
  onClose,
  isOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([] as string[]);

  const onSignButtonClick = () => {
    setIsLoading(true);

    onSign(selectedOptions).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <RequestSignModal
      isOpen={isOpen}
      isLoading={isLoading}
      mode="positive"
      headerIcon={<StarFilledIcon />}
      buttonText={t`Sign to endorse`}
      onClose={onClose}
      onSignButtonClick={onSignButtonClick}
    >
      <Center>
        <VStack textAlign="center">
          <Text fontSize="md" fontWeight="bold">
            <Trans>
              Endorse{' '}
              <Text variant="blue" as="span">
                {snapName}
              </Text>{' '}
            </Trans>
          </Text>

          <Text fontSize="sm" noOfLines={2} as="span">
            <Trans>
              This action will endorse the snap as secure in your community.
            </Trans>
            <Link>
              <Trans>Learn more</Trans>
            </Link>
          </Text>
          <MultipleCheckboxOptions
            options={options}
            onChange={(values) => {
              setSelectedOptions(
                options.filter((_, index) => values[index] === true),
              );
            }}
          />
        </VStack>
      </Center>
    </RequestSignModal>
  );
};
