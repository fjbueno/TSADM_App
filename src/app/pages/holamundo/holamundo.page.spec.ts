import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HolamundoPage } from './holamundo.page';

describe('HolamundoPage', () => {
  let component: HolamundoPage;
  let fixture: ComponentFixture<HolamundoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolamundoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HolamundoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
