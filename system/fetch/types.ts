import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface DevtoolsOptions {
  initialIsOpen?: boolean;
  panelProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  closeButtonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  toggleButtonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  position?: DevtoolsPosition;
  containerElement?: unknown;
}

type DevtoolsPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface ErrorHandlerParams {
  error: unknown;
  showToast: boolean;
  message?: string;
}
