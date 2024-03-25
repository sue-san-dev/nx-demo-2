import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientWatchUiVideoPlayerComponent } from './client-watch-ui-video-player.component';

describe('ClientWatchUiVideoPlayerComponent', () => {
  let component: ClientWatchUiVideoPlayerComponent;
  let fixture: ComponentFixture<ClientWatchUiVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientWatchUiVideoPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientWatchUiVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
