import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientChannelUiTabHomeComponent } from './client-channel-ui-tab-home.component';

describe('ClientChannelUiTabHomeComponent', () => {
  let component: ClientChannelUiTabHomeComponent;
  let fixture: ComponentFixture<ClientChannelUiTabHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientChannelUiTabHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientChannelUiTabHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
