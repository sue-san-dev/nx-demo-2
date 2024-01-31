import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSharedUiAvatarIconComponent } from './client-shared-ui-avatar-icon.component';
import { By } from '@angular/platform-browser';
import { User } from '@prisma/client';

describe('ClientSharedUiAvatarIconComponent', () => {
  let component: ClientSharedUiAvatarIconComponent;
  let fixture: ComponentFixture<ClientSharedUiAvatarIconComponent>;


  const dummyUser: User = {
    channelAvatarUrl: null,
    accountName: "accountName",
    channelHandle: "channelHandle",
    email: "email",
    password: "password",
    createdAt: new Date(0),
    updatedAt: new Date(0),
    id: 0
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSharedUiAvatarIconComponent],
    }).compileComponents();

  });

  it('ユーザーにアバターが設定している場合imgタグが表示される', () => {
    const url = 'https://example.com/avatar.jpg'

    // コンポーネント作成
    fixture = TestBed.createComponent(ClientSharedUiAvatarIconComponent);
    component = fixture.componentInstance;

    const dummyUser2: User = {
      ...dummyUser,
      channelAvatarUrl: url
    }

    const dummyUserRef = () => dummyUser2

    Object.defineProperty(component, 'userRef', { value: dummyUserRef })

    fixture.detectChanges();
    // imgタグがレンダリングされたかを確認
    const imgElement = fixture.debugElement.query(By.css('img'));
    // img要素が存在することを確認
    expect(imgElement).toBeTruthy();
    // src属性が正しいパスになっていることを確認
    expect(imgElement.nativeElement.src).toBe(url);
  });

  it('ユーザーにアバターが設定していない場合imgタグが表示されない', () => {
    const url = null

    // コンポーネント作成
    fixture = TestBed.createComponent(ClientSharedUiAvatarIconComponent);
    component = fixture.componentInstance;

    const dummyUser2: User = {
      ...dummyUser,
      channelAvatarUrl: url
    }

    const dummyUserRef = () => dummyUser2

    Object.defineProperty(component, 'userRef', { value: dummyUserRef })

    fixture.detectChanges();
    // imgタグがレンダリングされたかを確認
    const imgElement = fixture.debugElement.query(By.css('img'));
    // img要素が存在しないことを確認
    expect(imgElement).toBeFalsy();
  });
});
