import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInfoComponent } from './todo-info.component';

describe('TodoInfoComponent', () => {
  let component: TodoInfoComponent;
  let fixture: ComponentFixture<TodoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
