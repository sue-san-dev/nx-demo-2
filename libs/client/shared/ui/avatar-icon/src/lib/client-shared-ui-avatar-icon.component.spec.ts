import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSharedUiAvatarIconComponent } from './client-shared-ui-avatar-icon.component';

describe('ClientSharedUiAvatarIconComponent', () => {
  let component: ClientSharedUiAvatarIconComponent;
  let fixture: ComponentFixture<ClientSharedUiAvatarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSharedUiAvatarIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSharedUiAvatarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
