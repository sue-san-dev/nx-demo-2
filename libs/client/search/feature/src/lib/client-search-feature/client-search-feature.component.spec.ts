import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSearchFeatureComponent } from './client-search-feature.component';

describe('ClientSearchFeatureComponent', () => {
  let component: ClientSearchFeatureComponent;
  let fixture: ComponentFixture<ClientSearchFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSearchFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSearchFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
