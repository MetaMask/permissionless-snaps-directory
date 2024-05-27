import { screen } from '@testing-library/react';
import { useEnsName } from 'wagmi';

import type { IssuersListModalProps } from './IssuersListModal';
import { IssuersListModal } from './IssuersListModal';
import { Value } from '../features/account/assertions/enums';
import { useSelector } from '../hooks';
import { render } from '../utils/test-utils';

jest.mock('../hooks', () => ({
  ...jest.requireActual('../hooks'),
  useSelector: jest.fn(),
}));

jest.mock('../features');
jest.mock('wagmi', () => ({
  useEnsName: jest.fn(),
  createConfig: jest.fn(),
  mainnet: { id: 1 },
}));
jest.mock('./EntityName', () => ({
  EntityName: () => <span data-testid="entity-name" />,
}));
jest.mock('./JazzIcon', () => ({
  JazzIcon: () => <span data-testid="jazz-icon" />,
}));

const buildEnsNameMock = (name?: string, isLoading = false) => {
  const mockUseEnsName = useEnsName as jest.Mock;
  mockUseEnsName.mockImplementation(() => ({
    data: name,
    isLoading,
  }));
};

describe('IssuersListModal', () => {
  let mockUseSelector: jest.Mock;
  const defaultProps: IssuersListModalProps = {
    isOpen: true,
    onClose: jest.fn(),
    subject: '0x123',
    isSnap: false,
    assertionType: Value.Endorsement,
    issuers: [
      { address: '0x123', issuanceDate: new Date(Date.now() - 1000 * 60 * 60) },
      {
        address: '0x456',
        issuanceDate: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
    children: <div />,
  };

  beforeEach(() => {
    buildEnsNameMock('ens.mock.name');
    mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockClear();
  });

  it('renders without crashing', () => {
    render(<IssuersListModal {...defaultProps} />);
    expect(screen.getByText('Endorsements')).toBeInTheDocument();
  });

  it('displays the correct header text based on assertionType', () => {
    render(<IssuersListModal {...defaultProps} />);
    expect(screen.getByText('Endorsements')).toBeInTheDocument();

    render(
      <IssuersListModal {...defaultProps} assertionType={Value.Dispute} />,
    );
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('displays the list of issuers', () => {
    render(<IssuersListModal {...defaultProps} />);
    expect(screen.getAllByTestId('entity-name')).toHaveLength(2);
    expect(screen.getAllByTestId('jazz-icon')).toHaveLength(2);
  });

  it('displays the reason if provided', () => {
    render(<IssuersListModal {...defaultProps} reason="Test Reason" />);
    expect(screen.getByText('Test Reason')).toBeInTheDocument();
  });

  it('does not display the reason if not provided', () => {
    render(<IssuersListModal {...defaultProps} />);
    expect(screen.queryByText('for')).not.toBeInTheDocument();
  });

  it('renders snap without name as unknown', () => {
    defaultProps.isSnap = true;
    mockUseSelector.mockReturnValue({ name: undefined });
    render(<IssuersListModal {...defaultProps} />);
    expect(screen.getByText('Endorsements')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('renders trimmed address when subject is address without ens', () => {
    defaultProps.isSnap = false;
    mockUseSelector.mockReturnValue({ name: undefined });
    buildEnsNameMock(undefined);
    render(<IssuersListModal {...defaultProps} />);
    expect(screen.getByText('Endorsements')).toBeInTheDocument();
    expect(screen.getByText('0x123')).toBeInTheDocument();
  });
});
