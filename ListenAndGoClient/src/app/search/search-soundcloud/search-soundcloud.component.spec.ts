import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSoundcloudComponent } from './search-soundcloud.component';

describe('SearchSoundcloudComponent', () => {
  let component: SearchSoundcloudComponent;
  let fixture: ComponentFixture<SearchSoundcloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSoundcloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSoundcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
