import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServeurComponent } from './add-serveur.component';

describe('AddServeurComponent', () => {
  let component: AddServeurComponent;
  let fixture: ComponentFixture<AddServeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddServeurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddServeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
