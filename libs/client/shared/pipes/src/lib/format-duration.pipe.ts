import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration',
  pure: true,
  standalone: true,
})
export class FormatDurationPipe implements PipeTransform {
  transform(duration: number) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const paddedMinutes = (hours > 0) ? minutes.toString().padStart(2, '0') : minutes.toString();
    const paddedSeconds = seconds.toString().padStart(2, '0');

    if (hours > 0) {
      return `${ hours }:${ paddedMinutes }:${ paddedSeconds }`;
    } else {
      return `${ paddedMinutes }:${ paddedSeconds }`;
    }
  }
}