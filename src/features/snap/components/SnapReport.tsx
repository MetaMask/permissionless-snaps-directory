import { useState, type FunctionComponent } from 'react';

import { ReportSnapModal } from './modals/ReportSnapModal';
import { ReportButton } from '../../../components';

type SnapReportProps = {
  snapName: string;
};

export const SnapReport: FunctionComponent<SnapReportProps> = ({
  snapName,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [reported, setReported] = useState(false);

  const onSign = async () => {
    setShowModal(false);
    setReported(true);
  };

  return (
    <>
      <ReportButton
        onClick={() => setShowModal(true)}
        reported={reported}
        size="lg"
      />
      {showModal && (
        <ReportSnapModal
          snapName={snapName}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSign={onSign}
        />
      )}
    </>
  );
};
