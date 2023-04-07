import { Option } from '@xpmarket/xpm.ui.inputs.types';

export interface TokenDropdownOption extends Option<string> {
  index: number;
  title: string | undefined;
  code: string;
}
