import { Center, Link, Text, VStack } from '@chakra-ui/react';
import { Trans, t } from '@lingui/macro';
import { useState, type FunctionComponent } from 'react';

import {
  MultipleCheckboxOptions,
  QuestionRedIcon,
  RequestSignModal,
} from '../../../../components';

export type AccountReportModalProps = {
  reportEntity: string;
  options: string[];
  onSign: (arg: string[]) => Promise<void>;
  onClose: () => void;
  visibility: boolean;
};

export const AccountReportModal: FunctionComponent<AccountReportModalProps> = ({
  reportEntity,
  options,
  onSign,
  onClose,
  visibility,
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
      isOpen={visibility}
      isLoading={isLoading}
      mode="negative"
      headerIcon={<QuestionRedIcon />}
      buttonText={t`Sign to report`}
      onClose={onClose}
      onSignButtonClick={onSignButtonClick}
    >
      <Center>
        <VStack textAlign="center" fontSize="md">
          <Text fontWeight="medium">
            <Trans>Report a Malicious Actor</Trans>
          </Text>

          <Text noOfLines={2} as="span">
            <Trans>
              Report{' '}
              <Text variant="blue" as="span">
                {reportEntity}
              </Text>{' '}
              as malicious to safeguard your community.
            </Trans>{' '}
            <Link
              href="https://support.metamask.io/hc/en-us/articles/23263846792475"
              target="_blank"
            >
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
