import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeurDetailsComponent } from './serveur-details.component';

describe('ServeurDetailsComponent', () => {
  let component: ServeurDetailsComponent;
  let fixture: ComponentFixture<ServeurDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServeurDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServeurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
