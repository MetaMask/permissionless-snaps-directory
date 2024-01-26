import type { ToastProps } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

type MessageParams = {
  title: string;
  description: string;
  duration?: number;
  isClosable?: boolean;
};

const useToastMsg = (params?: ToastProps) => {
  const toast = useToast({ position: 'top', ...params });

  const showErrorMsg = ({
    title,
    description,
    duration = 2000,
    isClosable = true,
  }: MessageParams) =>
    toast({
      title,
      description,
      status: 'error',
      duration,
      isClosable,
    });

  const showInfoMsg = ({
    title,
    description,
    duration = 2000,
    isClosable = true,
  }: MessageParams) =>
    toast({
      title,
      description,
      status: 'info',
      duration,
      isClosable,
    });

  const showSuccessMsg = ({
    title,
    description,
    duration = 2000,
    isClosable = true,
  }: MessageParams) =>
    toast({
      title,
      description,
      status: 'success',
      duration,
      isClosable,
    });

  const showWarningMsg = ({
    title,
    description,
    duration = 2000,
    isClosable = true,
  }: MessageParams) =>
    toast({
      title,
      description,
      status: 'warning',
      duration,
      isClosable,
    });

  const showLoadingMsg = ({
    title,
    description,
    duration = 2000,
    isClosable = true,
  }: MessageParams) =>
    toast({
      title,
      description,
      status: 'loading',
      duration,
      isClosable,
    });
  return {
    showErrorMsg,
    showInfoMsg,
    showSuccessMsg,
    showWarningMsg,
    showLoadingMsg,
  };
};

export default useToastMsg;
