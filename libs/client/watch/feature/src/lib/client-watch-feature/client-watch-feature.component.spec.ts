import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientWatchFeatureComponent } from './client-watch-feature.component';

describe('ClientWatchFeatureComponent', () => {
  let component: ClientWatchFeatureComponent;
  let fixture: ComponentFixture<ClientWatchFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientWatchFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientWatchFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
