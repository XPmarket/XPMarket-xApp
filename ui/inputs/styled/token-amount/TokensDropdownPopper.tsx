import { Popper, PopperProps } from '@mui/material';

type Props = PopperProps;

export const TokensDropdownPopper = (props: Props) => {
  const { ...popperProps } = props;

  return (
    <Popper {...popperProps} style={{ width: '200px' }} placement="bottom" />
  );
};
