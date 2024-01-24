import { useToast } from '@chakra-ui/react';
import { act } from '@testing-library/react';

import useToastMsg from './useToastMsg';
import { renderHook } from '../utils/test-utils';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('useToastMsg', () => {
  let mockUseToast: jest.Mock;
  let mockToast: jest.Mock;

  beforeEach(() => {
    mockUseToast = useToast as jest.Mock;
    mockUseToast.mockClear();

    mockToast = jest.fn();
    mockUseToast.mockReturnValue(mockToast);
  });

  it('should call useToast with correct parameters when showErrorMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showErrorMsg } = result.current;

    await act(() =>
      showErrorMsg({
        title: 'Error',
        description: 'Something went wrong',
        duration: 2000,
        isClosable: false,
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Something went wrong',
      status: 'error',
      duration: 2000,
      isClosable: false,
    });
  });

  it('should call useToast with correct parameters when showInfoMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showInfoMsg } = result.current;

    await act(() =>
      showInfoMsg({
        title: 'Info',
        description: 'Some information',
        duration: 3000,
        isClosable: true,
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Info',
      description: 'Some information',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  });

  it('should call useToast with correct parameters when showSuccessMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showSuccessMsg } = result.current;

    await act(() =>
      showSuccessMsg({
        title: 'Success',
        description: 'Some success',
        duration: 3000,
        isClosable: true,
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Some success',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  });

  it('should call useToast with correct parameters when showWarningMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showWarningMsg } = result.current;

    await act(() =>
      showWarningMsg({
        title: 'Warning',
        description: 'Some warning',
        duration: 3000,
        isClosable: true,
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Warning',
      description: 'Some warning',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
  });

  it('should call useToast with correct parameters when showLoadingMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showLoadingMsg } = result.current;

    await act(() =>
      showLoadingMsg({
        title: 'Loading',
        description: 'Some loading',
        duration: 3000,
        isClosable: true,
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Loading',
      description: 'Some loading',
      status: 'loading',
      duration: 3000,
      isClosable: true,
    });
  });

  it('should call useToast with default parameters when showErrorMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showErrorMsg } = result.current;

    await act(() =>
      showErrorMsg({
        title: 'Error',
        description: 'Something went wrong',
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Something went wrong',
      status: 'error',
      duration: 200,
      isClosable: true,
    });
  });

  it('should call useToast with default parameters when showInfoMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showInfoMsg } = result.current;

    await act(() =>
      showInfoMsg({
        title: 'Info',
        description: 'Some information',
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Info',
      description: 'Some information',
      status: 'info',
      duration: 200,
      isClosable: true,
    });
  });

  it('should call useToast with default parameters when showSuccessMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showSuccessMsg } = result.current;

    await act(() =>
      showSuccessMsg({
        title: 'Success',
        description: 'Some success',
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Some success',
      status: 'success',
      duration: 200,
      isClosable: true,
    });
  });

  it('should call useToast with default parameters when showWarningMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showWarningMsg } = result.current;

    await act(() =>
      showWarningMsg({
        title: 'Warning',
        description: 'Some warning',
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Warning',
      description: 'Some warning',
      status: 'warning',
      duration: 200,
      isClosable: true,
    });
  });

  it('should call useToast with default parameters when showLoadingMsg is called', async () => {
    const { result } = await act(() => renderHook(() => useToastMsg()));
    const { showLoadingMsg } = result.current;

    await act(() =>
      showLoadingMsg({
        title: 'Loading',
        description: 'Some loading',
      }),
    );

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Loading',
      description: 'Some loading',
      status: 'loading',
      duration: 200,
      isClosable: true,
    });
  });
});
