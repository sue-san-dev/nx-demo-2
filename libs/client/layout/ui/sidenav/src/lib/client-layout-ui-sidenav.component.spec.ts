import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientLayoutUiSidenavComponent } from './client-layout-ui-sidenav.component';

describe('ClientLayoutUiSidenavComponent', () => {
  let component: ClientLayoutUiSidenavComponent;
  let fixture: ComponentFixture<ClientLayoutUiSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLayoutUiSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientLayoutUiSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
