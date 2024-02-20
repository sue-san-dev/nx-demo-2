import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientChannelUiTabShortsComponent } from './client-channel-ui-tab-shorts.component';

describe('ClientChannelUiTabShortsComponent', () => {
  let component: ClientChannelUiTabShortsComponent;
  let fixture: ComponentFixture<ClientChannelUiTabShortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientChannelUiTabShortsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientChannelUiTabShortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
