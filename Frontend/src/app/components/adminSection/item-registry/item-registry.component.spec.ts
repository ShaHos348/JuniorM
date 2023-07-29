import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRegistryComponent } from './item-registry.component';

describe('ItemRegistryComponent', () => {
  let component: ItemRegistryComponent;
  let fixture: ComponentFixture<ItemRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRegistryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
