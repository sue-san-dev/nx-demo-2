import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSharedUiCommentComponent } from './client-shared-ui-comment.component';

describe('ClientSharedUiCommentComponent', () => {
  let component: ClientSharedUiCommentComponent;
  let fixture: ComponentFixture<ClientSharedUiCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSharedUiCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSharedUiCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
