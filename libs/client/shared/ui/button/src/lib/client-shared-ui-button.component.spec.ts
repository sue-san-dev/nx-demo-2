import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSharedUiButtonComponent } from './client-shared-ui-button.component';

describe('ClientSharedUiButtonComponent', () => {
  let component: ClientSharedUiButtonComponent;
  let fixture: ComponentFixture<ClientSharedUiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSharedUiButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSharedUiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
