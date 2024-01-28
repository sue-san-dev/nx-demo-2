import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInWeeks, differenceInYears } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  pure: true,
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: Date) {
    const now = new Date();

    const diffInSecs = differenceInSeconds(now, date);
    if (diffInSecs < 60) {
      return `${ diffInSecs } 秒前`;
    }

    const diffInMins = differenceInMinutes(now, date);
    if (diffInMins < 60) {
      return `${ diffInMins } 分前`;
    }

    const diffInHours = differenceInHours(now, date);
    if (diffInHours < 24) {
      return `${ diffInHours } 時間前`;
    }

    const diffInDays = differenceInDays(now, date);
    if (diffInDays < 7) {
      return `${ diffInDays } 日前`;
    }

    const diffInWeeks = differenceInWeeks(now, date);
    if (diffInWeeks < 4) {
      return `${ diffInWeeks } 週間前`;
    }

    const diffInMonths = differenceInMonths(now, date);
    // 4週間前でも 0ヶ月前と表示されるため、条件を足して絞り込む
    if (diffInWeeks >= 4 && diffInMonths < 2) {
      return `1 か月前`;
    } else if (diffInMonths < 12) {
      return `${ diffInMonths } か月前`;
    }

    const diffInYears = differenceInYears(now, date);

    return `${ diffInYears } 年前`;
  }
}