import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientChannelFeatureComponent } from './client-channel-feature.component';

describe('ClientChannelFeatureComponent', () => {
  let component: ClientChannelFeatureComponent;
  let fixture: ComponentFixture<ClientChannelFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientChannelFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientChannelFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
