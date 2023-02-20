import { parse } from 'date-fns';
import { date, number, object, string } from 'yup';

import { DATE_FORMATS, getYesterdayDate } from '@xpmarket/xpm.system.time';

const shape = {
  amount: number().required(),
  amountToken: string().required(),
  duration: number().nullable(),
  date: date()
    .nullable()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }

      const result = parse(originalValue, DATE_FORMATS.dateTime, new Date());

      return result;
    })
    .typeError('common:errors.invalidDate')
    .min(getYesterdayDate(), 'common:errors.pastDate'),
};

export const schema = object<typeof shape>().shape(shape);
