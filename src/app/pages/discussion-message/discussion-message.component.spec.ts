import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionMessageComponent } from './discussion-message.component';

describe('DiscussionMessageComponent', () => {
  let component: DiscussionMessageComponent;
  let fixture: ComponentFixture<DiscussionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
