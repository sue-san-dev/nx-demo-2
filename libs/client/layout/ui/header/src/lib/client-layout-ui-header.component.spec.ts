import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientLayoutUiHeaderComponent } from './client-layout-ui-header.component';

describe('ClientLayoutUiHeaderComponent', () => {
  let component: ClientLayoutUiHeaderComponent;
  let fixture: ComponentFixture<ClientLayoutUiHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLayoutUiHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientLayoutUiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
