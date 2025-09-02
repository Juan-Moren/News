import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenesisPage } from './genesis.page';

describe('GenesisPage', () => {
  let component: GenesisPage;
  let fixture: ComponentFixture<GenesisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenesisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
