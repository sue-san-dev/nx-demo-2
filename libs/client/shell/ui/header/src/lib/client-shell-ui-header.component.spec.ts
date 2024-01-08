import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientShellUiHeaderComponent } from './client-shell-ui-header.component';

describe('ClientShellUiHeaderComponent', () => {
  let component: ClientShellUiHeaderComponent;
  let fixture: ComponentFixture<ClientShellUiHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientShellUiHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientShellUiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
