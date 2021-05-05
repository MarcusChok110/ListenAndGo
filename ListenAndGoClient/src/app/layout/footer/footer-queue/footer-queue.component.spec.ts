import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterQueueComponent } from './footer-queue.component';

describe('FooterQueueComponent', () => {
  let component: FooterQueueComponent;
  let fixture: ComponentFixture<FooterQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
