import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientLayoutFeatureComponent } from './client-layout-feature.component';

describe('ClientLayoutFeatureComponent', () => {
  let component: ClientLayoutFeatureComponent;
  let fixture: ComponentFixture<ClientLayoutFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLayoutFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientLayoutFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
