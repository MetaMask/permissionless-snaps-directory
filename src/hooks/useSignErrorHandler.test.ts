import { act } from '@testing-library/react';

import { useSignErrorHandler } from './useSignErrorHandler';
import useToastMsg from './useToastMsg';
import type { VCSignError } from './useVerifiableCredential';
import { VCSignErrorType } from './useVerifiableCredential';
import { renderHook } from '../utils/test-utils';

jest.mock('./useToastMsg');

describe('useSignErrorHandler', () => {
  let useToastMsgMock: jest.Mock;
  let showErrorMsgMock: jest.Mock;

  beforeEach(() => {
    useToastMsgMock = useToastMsg as jest.Mock;
    useToastMsgMock.mockClear();

    showErrorMsgMock = jest.fn();

    useToastMsgMock.mockReturnValue({
      showErrorMsg: showErrorMsgMock,
    });
  });

  it('shows error message when signError override messages is defined', async () => {
    const signError: VCSignError = {
      type: VCSignErrorType.SignError,
    };
    const errorMessages = {
      SignError: {
        title: 'Custom Sign Error Title',
        description: 'Custom Sign Error Description',
      },
    };

    await act(() =>
      renderHook(() => useSignErrorHandler(signError, errorMessages)),
    );

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Custom Sign Error Title',
      description: 'Custom Sign Error Description',
    });
  });

  it('shows error message when VerifyError override messages is defined', async () => {
    const signError: VCSignError = {
      type: VCSignErrorType.VerifyError,
    };
    const errorMessages = {
      VerifyError: {
        title: 'Custom Sign Error Title',
        description: 'Custom Sign Error Description',
      },
    };

    await act(() =>
      renderHook(() => useSignErrorHandler(signError, errorMessages)),
    );

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Custom Sign Error Title',
      description: 'Custom Sign Error Description',
    });
  });

  it('shows error message when VerifyFailed override messages is defined', async () => {
    const signError: VCSignError = {
      type: VCSignErrorType.VerifyFailed,
    };
    const errorMessages = {
      VerifyFailed: {
        title: 'Custom Sign Error Title',
        description: 'Custom Sign Error Description',
      },
    };

    await act(() =>
      renderHook(() => useSignErrorHandler(signError, errorMessages)),
    );

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Custom Sign Error Title',
      description: 'Custom Sign Error Description',
    });
  });

  it('shows default error message when errorMessages is not provided and SignError detected with error message content', async () => {
    const signError: VCSignError = {
      type: VCSignErrorType.SignError,
      message: 'Sign error message',
    };

    await act(() => renderHook(() => useSignErrorHandler(signError)));

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Failed to sign the message',
      description: 'Sign error message',
    });
  });

  it('shows default error message when errorMessages is not provided and SignError detected without error message content', async () => {
    const signError: VCSignError = {
      type: VCSignErrorType.SignError,
    };

    await act(() => renderHook(() => useSignErrorHandler(signError)));

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Failed to sign the message',
      description: 'Failed to sign the message',
    });
  });

  it('shows default error message when errorMessages is not provided and VerifyError detected with error message content', async () => {
    const signError: VCSignError = {
      type: VCSignErrorType.VerifyError,
      message: 'Verify error message',
    };

    await act(() => renderHook(() => useSignErrorHandler(signError)));

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Failed to verify signature',
      description: 'Verify error message',
    });
  });

  it('shows default error message when errorMessages is not provided and VerifyError detected without error message content', async () => {
    const signError: VCSignError = {
      type: VCSignErrorType.VerifyError,
    };

    await act(() => renderHook(() => useSignErrorHandler(signError)));

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Failed to verify signature',
      description: 'Failed to verify signature',
    });
  });

  it('shows default error message when errorMessages is not provided and VerifyFailed detected with error message content', async () => {
    const signError: VCSignError = {
      type: VCSignErrorType.VerifyFailed,
      message: 'Verify failed message',
    };

    await act(() => renderHook(() => useSignErrorHandler(signError)));

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Invalid Signature',
      description: 'Verify failed message',
    });
  });

  it('shows default error message when errorMessages is not provided and VerifyFailed detected without error message content', async () => {
    const signError: VCSignError = {
      type: VCSignErrorType.VerifyFailed,
    };

    await act(() => renderHook(() => useSignErrorHandler(signError)));

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Invalid Signature',
      description: 'Invalid Signature',
    });
  });

  it('shows default error message when errorMessages does not have a matching type', async () => {
    const signError = {
      type: 'UnknownError',
      message: 'Unknown error occurred',
    };
    const errorMessages = {
      SignError: {
        title: 'Custom Sign Error Title',
        description: 'Custom Sign Error Description',
      },
    };

    await act(() =>
      renderHook(() => useSignErrorHandler(signError, errorMessages)),
    );

    expect(showErrorMsgMock).toHaveBeenCalledWith({
      title: 'Unknown Error',
      description: 'Unknown Error',
    });
  });

  it('not shows error message when signError is undefined', () => {
    renderHook(() => useSignErrorHandler(undefined));

    expect(showErrorMsgMock).not.toHaveBeenCalled();
  });
});
