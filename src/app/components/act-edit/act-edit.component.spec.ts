import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActEditComponent } from './act-edit.component';

describe('ActEditComponent', () => {
  let component: ActEditComponent;
  let fixture: ComponentFixture<ActEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
