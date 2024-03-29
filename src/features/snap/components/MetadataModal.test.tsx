import { MetadataModal } from './MetadataModal';
import { useSelector } from '../../../hooks';
import type { MockSnap } from '../../../utils/test-utils';
import { getMockSnap, render } from '../../../utils/test-utils';

jest.mock('../../../hooks');

jest.mock('.', () => ({
  ...jest.requireActual('.'),
  MetadataAuditItem: () => <div data-testid="metadata-audit-item" />,
}));

jest.mock('./MetadataItem', () => ({
  MetadataItem: () => <div data-testid="metadata-item" />,
}));

jest.mock('./Audits', () => ({
  Audits: () => <div data-testid="audits" />,
}));

describe('MetadataModal', () => {
  let mockUseSelector: jest.Mock;

  beforeEach(() => {
    mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockClear();
    mockUseSelector.mockReturnValueOnce([]);
  });

  it('renders', () => {
    const { snap } = getMockSnap();
    const { queryByTestId } = render(
      <MetadataModal snap={snap} isOpen={true} onClose={jest.fn()} />,
    );

    expect(queryByTestId('metadata-audit-item')).toBeInTheDocument();
  });

  it('renders without audit', () => {
    const { snap } = getMockSnap();
    // @ts-expect-error - We want to test the case where the value is undefined
    snap.audits = undefined;
    console.log(snap);
    const { queryByTestId } = render(
      <MetadataModal snap={snap} isOpen={true} onClose={jest.fn()} />,
    );

    expect(queryByTestId('metadata-audit-item')).toBeInTheDocument();
  });

  it('renders a warning if the Snap has private code', () => {
    const { snap } = getMockSnap({
      privateCode: true,
      support: {
        contact: '',
        faq: '',
        knowledgeBase: '',
      },
    });

    const { queryByLabelText } = render(
      <MetadataModal snap={snap} isOpen={true} onClose={jest.fn()} />,
    );

    expect(queryByLabelText('Warning')).toBeInTheDocument();
  });

  it("doesn't render legal if privacy policy and terms of use are missing", () => {
    const { snap: rawSnap } = getMockSnap();
    const snap = {
      ...rawSnap,
      privacyPolicy: undefined,
      termsOfUse: undefined,
    } as unknown as MockSnap;
    const { queryByText } = render(
      <MetadataModal snap={snap} isOpen={true} onClose={jest.fn()} />,
    );

    expect(queryByText('Legal')).not.toBeInTheDocument();
  });
});
