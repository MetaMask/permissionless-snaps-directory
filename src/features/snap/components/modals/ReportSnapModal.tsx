import { Center, Link, Text, VStack } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import { useState, type FunctionComponent } from 'react';

import {
  MultipleCheckboxOptions,
  QuestionRedIcon,
  RequestSignModal,
} from '../../../../components';

export type ReportSnapModalProps = {
  snapName: string;
  options: string[];
  onSign: (arg: string[]) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
};

export const ReportSnapModal: FunctionComponent<ReportSnapModalProps> = ({
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
      mode="negative"
      headerIcon={<QuestionRedIcon />}
      buttonText={t`Sign to report`}
      onClose={onClose}
      onSignButtonClick={onSignButtonClick}
    >
      <Center>
        <VStack textAlign="center">
          <Text fontSize="md" fontWeight="bold">
            <Trans>
              Report for{' '}
              <Text variant="blue" as="span">
                {snapName}
              </Text>{' '}
              as a malicious snap
            </Trans>
          </Text>

          <Text fontSize="sm" noOfLines={2} as="span">
            <Trans>
              This action will flag the snap as a malicious in your community.
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