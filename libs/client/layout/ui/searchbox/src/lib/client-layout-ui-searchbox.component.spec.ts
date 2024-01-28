import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientLayoutUiSearchboxComponent } from './client-layout-ui-searchbox.component';

describe('ClientLayoutUiSearchboxComponent', () => {
  let component: ClientLayoutUiSearchboxComponent;
  let fixture: ComponentFixture<ClientLayoutUiSearchboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLayoutUiSearchboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientLayoutUiSearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
