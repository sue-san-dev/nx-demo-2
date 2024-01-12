import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSharedUiRichItemComponent } from './client-shared-ui-rich-item.component';

describe('ClientSharedUiRichItemComponent', () => {
  let component: ClientSharedUiRichItemComponent;
  let fixture: ComponentFixture<ClientSharedUiRichItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSharedUiRichItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSharedUiRichItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
