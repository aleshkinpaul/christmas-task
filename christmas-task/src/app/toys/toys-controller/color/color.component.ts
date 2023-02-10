import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColorsFilter, IToysFilter } from 'src/app/services/app-toys.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  @Input() colorInfo!: IColorsFilter;
  @Output() onChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  checkColor() {
    this.colorInfo.isChosen = !this.colorInfo.isChosen;
    this.saveChangesInLocalStorage();
    this.onChanged.emit();
  }

  saveChangesInLocalStorage() {
    const toysFilterOptionsLocalStorage: IToysFilter = JSON.parse(localStorage.getItem('filter-options')!);
    toysFilterOptionsLocalStorage.colors.forEach(color => {
      if (color.name === this.colorInfo.name) color.isChosen = this.colorInfo.isChosen;
    });
    localStorage.setItem('filter-options', JSON.stringify(toysFilterOptionsLocalStorage));
  }
}
