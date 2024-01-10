import { AsyncPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from '@ngneat/svg-icon';

/**
 * 出現頻度の高いModuleはこちらに定義
 * そうでないものは各Componentでimport
 */
const sharedModules = [
  RouterModule,
  ReactiveFormsModule,
  AsyncPipe,
  SvgIconComponent,
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules,
})
export class ClientShellFeatureModule { }