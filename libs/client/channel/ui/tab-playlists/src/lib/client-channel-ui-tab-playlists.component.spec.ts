import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientChannelUiTabPlaylistsComponent } from './client-channel-ui-tab-playlists.component';

describe('ClientChannelUiTabPlaylistsComponent', () => {
  let component: ClientChannelUiTabPlaylistsComponent;
  let fixture: ComponentFixture<ClientChannelUiTabPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientChannelUiTabPlaylistsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientChannelUiTabPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
