import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarAuthComponent } from './top-bar-auth.component';

describe('TopBarAuthComponent', () => {
  let component: TopBarAuthComponent;
  let fixture: ComponentFixture<TopBarAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
