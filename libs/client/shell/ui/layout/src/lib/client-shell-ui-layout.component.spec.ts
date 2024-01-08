import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientShellUiLayoutComponent } from './client-shell-ui-layout.component';

describe('ClientShellUiLayoutComponent', () => {
  let component: ClientShellUiLayoutComponent;
  let fixture: ComponentFixture<ClientShellUiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientShellUiLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientShellUiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
