import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from '@ngneat/svg-icon';

/**
 * 必須Moduleはこちらに定義してまとめてimport
 * そうでないものは各Componentごとにimport
 */
export const SHARED_MODULES = [
  RouterModule,
  ReactiveFormsModule,
  AsyncPipe,
  SvgIconComponent,
];