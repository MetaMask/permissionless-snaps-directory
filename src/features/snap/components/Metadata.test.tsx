import { Metadata } from './Metadata';
import { useDispatch } from '../../../hooks';
import { getMockSnap, render } from '../../../utils/test-utils';

jest.mock('../../../hooks');
jest.mock('./community-sentiment', () => ({
  CommunitySentiment: () => <div data-testid="community-sentiment" />,
}));
jest.mock('./MetadataItem', () => ({
  MetadataItem: () => <div data-testid="metadata-item" />,
}));
jest.mock('./MetadataModal', () => ({
  MetadataModal: () => <div data-testid="metadata-modal" />,
}));

describe('Metadata', () => {
  let mockUseDispatch: jest.Mock;
  beforeEach(() => {
    mockUseDispatch = useDispatch as jest.Mock;
    mockUseDispatch.mockClear();
  });

  it('renders the category', () => {
    const mockDispatch = jest.fn().mockImplementation(() => ({
      catch: jest.fn(),
    }));
    mockUseDispatch.mockReturnValue(mockDispatch);

    const { snap } = getMockSnap();
    const { queryByText } = render(<Metadata snap={snap} />);

    expect(queryByText('Category')).toBeInTheDocument();
    expect(queryByText('Security')).toBeInTheDocument();
  });

  it('renders the metadata items', () => {
    const mockDispatch = jest.fn().mockImplementation(() => ({
      catch: jest.fn(),
    }));
    mockUseDispatch.mockReturnValue(mockDispatch);

    const { snap } = getMockSnap();
    const { queryByTestId } = render(<Metadata snap={snap} />);
    expect(queryByTestId('metadata-item')).toBeInTheDocument();
  });

  it('renders the developer even when fetchSnapAssertionsForSnapId fails', () => {
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );
    mockDispatch.mockImplementationOnce(async () =>
      Promise.reject(new Error()),
    );

    const { snap } = getMockSnap();
    const { queryByTestId } = render(
      <Metadata
        snap={{
          ...snap,
          privateCode: true,
          support: {
            contact: '',
            faq: '',
            knowledgeBase: '',
          },
        }}
      />,
    );

    expect(queryByTestId('metadata-item')).toBeInTheDocument();
  });

  it('renders the key recovery link', () => {
    const mockDispatch = jest.fn().mockImplementation(() => ({
      catch: jest.fn(),
    }));
    mockUseDispatch.mockReturnValue(mockDispatch);

    const { snap } = getMockSnap();
    const { queryByText } = render(<Metadata snap={snap} />);

    expect(queryByText('Key Recovery')).toBeInTheDocument();
  });
});
