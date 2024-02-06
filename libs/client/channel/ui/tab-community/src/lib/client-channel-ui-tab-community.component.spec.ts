import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientChannelUiTabCommunityComponent } from './client-channel-ui-tab-community.component';

describe('ClientChannelUiTabCommunityComponent', () => {
  let component: ClientChannelUiTabCommunityComponent;
  let fixture: ComponentFixture<ClientChannelUiTabCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientChannelUiTabCommunityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientChannelUiTabCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
