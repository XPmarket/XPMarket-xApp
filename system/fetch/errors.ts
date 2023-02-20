import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { TFunction } from 'next-i18next';

import { TOAST_IDS } from '@system/constants';
import { XpmarketResponse } from '@xpmarket/xpm.api.xpmarket';
import { AnyObject } from '@xpmarket/xpm.system.types';

import { ErrorHandlerParams } from './types';

export const handleErrors = async <
  TQueryFnData,
  Fn extends () => TQueryFnData | Promise<TQueryFnData>
>(
  func: Fn,
  onLogout: () => void,
  isAuthenticated: boolean,
  t: TFunction
): Promise<TQueryFnData> => {
  try {
    return await func();
  } catch (unknownError: unknown | ErrorHandlerParams) {
    if (unknownError && typeof unknownError === 'object') {
      const errorFormat = unknownError as Partial<ErrorHandlerParams>;
      const error = (errorFormat.error ?? unknownError) as AnyObject;
      const statusCode = parseHttpStatusCode(error);

      if ('isAxiosError' in error && (error as AxiosError).isAxiosError) {
        const isUnauthorized = statusCode === StatusCodes.UNAUTHORIZED;
        const isReportableError =
          statusCode !== undefined &&
          statusCode !== StatusCodes.TOO_MANY_REQUESTS;

        if (isUnauthorized && isAuthenticated) {
          onLogout();
          toast.info(t('common:info.loggedOut'), {
            toastId: TOAST_IDS.loggedOut,
          });
        } else if (
          isUnauthorized &&
          !isAuthenticated &&
          errorFormat.showToast
        ) {
          toast.error(t('common:errors.loginRequired'), {
            toastId: TOAST_IDS.loginRequired,
          });
        } else if (statusCode === StatusCodes.TOO_MANY_REQUESTS) {
          toast.error(t('common:errors.tooManyRequests'), {
            toastId: TOAST_IDS.tooManyRequests,
          });
        } else if (errorFormat.showToast && isReportableError) {
          toast.error(errorFormat.message ?? formatGenericError(error));
        }
      } else {
        if (errorFormat.showToast) {
          toast.error(errorFormat.message ?? formatGenericError(error));
        }
      }

      throw error;
    } else {
      throw unknownError;
    }
  }
};

export const formatError = (params: ErrorHandlerParams): ErrorHandlerParams => {
  return params;
};

export const formatGenericError = (err: unknown): string => {
  const axiosError = err as AxiosError;

  return axiosError.message || JSON.stringify(err);
};

export const getXpmarketErrorCode = (error: unknown): string | undefined => {
  if (typeof error === 'object' && (error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError;
    const errorCode = (axiosError.response?.data as XpmarketResponse).errorCode;

    return errorCode;
  }

  return undefined;
};

export const parseHttpStatusCode = (err: unknown): StatusCodes | undefined =>
  (err as AxiosError)?.response?.status;

export const isValidationError = (err: unknown): boolean =>
  parseHttpStatusCode(err) === StatusCodes.PRECONDITION_FAILED;

export const isUnprocessableEntity = (err: unknown): boolean => {
  return parseHttpStatusCode(err) === StatusCodes.UNPROCESSABLE_ENTITY;
};

/* eslint-disable no-console */
export const captureError = (prefix: string, err: unknown): void => {
  console.error(prefix);
  console.error('............');
  console.error(formatGenericError(err));
};
