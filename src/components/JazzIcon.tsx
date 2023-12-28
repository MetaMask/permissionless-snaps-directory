import { Box } from '@chakra-ui/react';
import Jazzicon from '@metamask/jazzicon';
import { type FunctionComponent, useRef, useEffect } from 'react';

export type JazzIconProps = {
  address: string;
  size: number;
};

export const JazzIcon: FunctionComponent<JazzIconProps> = ({
  address,
  size,
}) => {
  const ref = useRef<HTMLDivElement>();
  const addr = address.trim().slice(2, 10);
  const seed = parseInt(addr, 16);

  useEffect(() => {
    if (ref?.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(Jazzicon(size, seed));
    }
  }, [ref, seed, size]);

  return (
    <Box
      data-testid="jazzicon"
      ref={ref as React.MutableRefObject<HTMLDivElement>}
      sx={{ div: { borderRadius: `${size}px!important` } }}
    />
  );
};
