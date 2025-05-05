import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAuthComponent } from './content-auth.component';

describe('ContentAuthComponent', () => {
  let component: ContentAuthComponent;
  let fixture: ComponentFixture<ContentAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
