import * as moment from 'moment';
import { Timestamp } from '@firebase/firestore-types';

export type AppDate = moment.Moment;

/** function that converts firestore's timestamp to moment */
export function __DateFromStorage(unixDate: Timestamp | Date, offsetCorrection = false) : AppDate
{
  let appDate:  moment.Moment;

  const dateTime = unixDate as any;

  const seconds = (dateTime.seconds || dateTime._seconds)
                      ? dateTime.seconds ?? dateTime._seconds
                      : null;
  appDate = !!seconds
              ? moment(seconds * 1000)
              : moment(unixDate);

  return appDate;
}