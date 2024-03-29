import { DecimalPipe, NgClass, NgOptimizedImage, NgStyle } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { FormatCountPipe, FormatDurationPipe, TimeAgoPipe } from '@nx-demo/client-shared-pipes';
import { ClientSharedUiButtonComponent } from '@nx-demo/client-shared-ui-button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

/**
 * 使用頻度の高いModuleはこちらに定義してまとめてimport
 * そうでないものは各Componentごとにimport
 */
export const SHARED_MODULES = [
  RouterModule,
  ReactiveFormsModule,
  NgOptimizedImage,
  NgStyle,
  NgClass,
  DecimalPipe,
  FormatCountPipe,
  FormatDurationPipe,
  TimeAgoPipe,
  SvgIconComponent,
  ClientSharedUiButtonComponent,
  MatSnackBarModule,
  MatMenuModule,
];