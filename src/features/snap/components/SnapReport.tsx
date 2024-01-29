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

  const onSign = async (selected: string[]) => {
    console.log(selected);
    setShowModal(false);
  };

  return (
    <>
      <ReportButton
        onClick={() => setShowModal(true)}
        reported={false}
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
