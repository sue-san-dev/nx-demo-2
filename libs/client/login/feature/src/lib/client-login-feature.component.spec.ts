import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientLoginFeatureComponent } from './client-login-feature.component';

describe('ClientLoginFeatureComponent', () => {
  let component: ClientLoginFeatureComponent;
  let fixture: ComponentFixture<ClientLoginFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLoginFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientLoginFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
