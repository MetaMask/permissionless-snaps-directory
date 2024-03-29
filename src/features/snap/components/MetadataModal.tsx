import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import type { Hex } from 'viem';

import { Identifier, MetadataAuditItem } from '.';
import { Audits } from './Audits';
import { Data } from './Data';
import { Legal } from './Legal';
import { MetadataItem } from './MetadataItem';
import { SourceCode } from './SourceCode';
import { ExternalLink } from '../../../components';
import { useSelector } from '../../../hooks';
import { type Fields, getLinkText } from '../../../utils';
import { getAuditorAddressesByNames } from '../../snaps';

export type MetadataModalProps = {
  snap: Fields<
    Queries.Snap,
    | 'snapId'
    | 'name'
    | 'audits'
    | 'author'
    | 'latestVersion'
    | 'sourceCode'
    | 'additionalSourceCode'
    | 'website'
    | 'privateCode'
    | 'privacyPolicy'
    | 'support'
    | 'termsOfUse'
  >;
  isOpen: boolean;
  onClose: () => void;
};

export const MetadataModal: FunctionComponent<MetadataModalProps> = ({
  snap,
  isOpen,
  onClose,
}) => {
  const {
    name,
    author,
    audits,
    latestVersion,
    sourceCode,
    additionalSourceCode,
    privateCode,
    privacyPolicy,
    support,
    termsOfUse,
    snapId,
  } = snap;

  let auditorNames: string[] = [];
  if (audits) {
    auditorNames = audits.map((audit) => audit?.auditor) as string[];
  }

  const auditorAddresses = useSelector(
    getAuditorAddressesByNames(auditorNames),
  );

  return (
    <Modal variant="minimal" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap="4">
          <Data label={t`Identifier`} value={<Identifier snapId={snapId} />} />
          {author && <MetadataItem address={author.address as Hex} />}
          <MetadataAuditItem auditorAddresses={auditorAddresses} />
          <Data label={t`Version`} value={latestVersion} />
          <Data
            label={t`Source Code`}
            value={
              <SourceCode
                url={sourceCode}
                additionalUrls={additionalSourceCode}
              />
            }
            warning={
              privateCode && (
                <Trans>
                  <Box as="span" fontWeight="500">
                    {name}
                  </Box>{' '}
                  uses code that isn&apos;t viewable by the public. Critical
                  parts of the codebase were audited for security, but later
                  versions of the code may not be. Make sure you trust{' '}
                  <Box as="span" fontWeight="500">
                    {author.name}
                  </Box>{' '}
                  before installing and using{' '}
                  <Box as="span" fontWeight="500">
                    {name}
                  </Box>
                  .
                </Trans>
              )
            }
          />
          <Data
            label={t`Audit Reports`}
            value={
              <Audits
                audits={
                  audits as Fields<Queries.SnapAudits, 'auditor' | 'report'>[]
                }
              />
            }
          />
          {(privacyPolicy || termsOfUse) && (
            <Data
              label={t`Legal`}
              value={
                <Legal privacyPolicy={privacyPolicy} termsOfUse={termsOfUse} />
              }
            />
          )}
          {(support?.contact || support?.faq || support?.knowledgeBase) && (
            <Data
              label={t`Support`}
              value={
                <>
                  {support.contact && (
                    <ExternalLink href={support.contact}>
                      {getLinkText(support.contact, t`Contact`)}
                    </ExternalLink>
                  )}
                  {support.faq && (
                    <ExternalLink href={support.faq}>
                      <Trans>FAQ</Trans>
                    </ExternalLink>
                  )}
                  {support.knowledgeBase && (
                    <ExternalLink href={support.knowledgeBase}>
                      <Trans>Knowledge Base</Trans>
                    </ExternalLink>
                  )}
                  {support.keyRecovery && (
                    <ExternalLink href={support.keyRecovery}>
                      <Trans>Key Recovery</Trans>
                    </ExternalLink>
                  )}
                </>
              }
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
