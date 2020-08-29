import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodepopupComponent } from './codepopup.component';

describe('CodepopupComponent', () => {
  let component: CodepopupComponent;
  let fixture: ComponentFixture<CodepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
