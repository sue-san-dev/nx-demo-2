import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientShellUiSidenavComponent } from './client-shell-ui-sidenav.component';

describe('ClientShellUiSidenavComponent', () => {
  let component: ClientShellUiSidenavComponent;
  let fixture: ComponentFixture<ClientShellUiSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientShellUiSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientShellUiSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
