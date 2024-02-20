import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientChannelUiTabVideosComponent } from './client-channel-ui-tab-videos.component';

describe('ClientChannelUiTabVideosComponent', () => {
  let component: ClientChannelUiTabVideosComponent;
  let fixture: ComponentFixture<ClientChannelUiTabVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientChannelUiTabVideosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientChannelUiTabVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
