import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientLayoutUiHeaderComponent } from './client-layout-ui-header.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('ClientLayoutUiHeaderComponent', () => {
  let component: ClientLayoutUiHeaderComponent;
  let fixture: ComponentFixture<ClientLayoutUiHeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLayoutUiHeaderComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientLayoutUiHeaderComponent);
    router = TestBed.inject(Router); 
    jest.spyOn(router, 'navigateByUrl');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ロゴをクリックした時ホームに遷移するか', () => {
    // ロゴ部分のaタグを抽出
    const logoLinkDe = fixture.debugElement.query(By.css('#logo a'));

    // クリックシミュレーション
    logoLinkDe.triggerEventHandler('click', null);

    // navigateByUrlメソッドが適切な引数で呼び出されたかを検証
    expect(router.navigateByUrl).toHaveBeenCalledWith('/', {
      onSameUrlNavigation: 'reload'
    });
  });
});
