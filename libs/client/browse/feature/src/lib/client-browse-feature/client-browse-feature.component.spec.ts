import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientBrowseFeatureComponent } from './client-browse-feature.component';

describe('ClientBrowseFeatureComponent', () => {
  let component: ClientBrowseFeatureComponent;
  let fixture: ComponentFixture<ClientBrowseFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBrowseFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientBrowseFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
