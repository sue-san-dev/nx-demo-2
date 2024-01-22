import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from '@ngneat/svg-icon';

/**
 * 使用頻度の高いModuleはこちらに定義してまとめてimport
 * そうでないものは各Componentごとにimport
 */
export const SHARED_MODULES = [
  RouterModule,
  ReactiveFormsModule,
  NgOptimizedImage,
  AsyncPipe,
  SvgIconComponent,
];