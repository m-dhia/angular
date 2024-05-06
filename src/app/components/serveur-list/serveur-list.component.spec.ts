import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeurListComponent } from './serveur-list.component';

describe('ServeurListComponent', () => {
  let component: ServeurListComponent;
  let fixture: ComponentFixture<ServeurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServeurListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServeurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
