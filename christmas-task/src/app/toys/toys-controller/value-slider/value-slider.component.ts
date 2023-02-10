import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { ISliderFilter, IToysFilter } from 'src/app/services/app-toys.service';

@Component({
  selector: 'app-value-slider',
  templateUrl: './value-slider.component.html',
  styleUrls: ['./value-slider.component.scss']
})
export class ValueSliderComponent implements OnInit {
  @Input() sliderInfo!: ISliderFilter;
  @Output() onChanged: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('sliderElem') sliderRef!: MatSlider;

  constructor() { }

  ngOnInit(): void { }

  getSliderValue(value: number) {
    return value;
  }

  inputValue(): void {
    this.saveChangesInLocalStorage();
    this.onChanged.emit();
  }

  saveChangesInLocalStorage() {
    const toysFilterOptionsLocalStorage: IToysFilter = JSON.parse(localStorage.getItem('filter-options')!);
    if (this.sliderInfo.name === 'count' || this.sliderInfo.name === 'year') {
      toysFilterOptionsLocalStorage[this.sliderInfo.name].value = this.sliderRef.value;
    }
    localStorage.setItem('filter-options', JSON.stringify(toysFilterOptionsLocalStorage));
  }
}
