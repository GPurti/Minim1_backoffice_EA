import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActComponent } from './act-post.component';

describe('AddActComponent', () => {
  let component: AddActComponent;
  let fixture: ComponentFixture<AddActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
