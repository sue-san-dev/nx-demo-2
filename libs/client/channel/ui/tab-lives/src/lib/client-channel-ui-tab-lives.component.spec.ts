import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientChannelUiTabLivesComponent } from './client-channel-ui-tab-lives.component';

describe('ClientChannelUiTabLivesComponent', () => {
  let component: ClientChannelUiTabLivesComponent;
  let fixture: ComponentFixture<ClientChannelUiTabLivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientChannelUiTabLivesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientChannelUiTabLivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
