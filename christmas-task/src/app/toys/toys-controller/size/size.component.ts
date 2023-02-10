import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { ISizeFilter, IToysFilter } from 'src/app/services/app-toys.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {
  @Input() sizeInfo!: ISizeFilter;
  @Output() onChanged: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('size') sizeRef!: MatCheckbox;

  constructor() { }

  ngOnInit(): void { }

  checkSize(): void {
    this.saveChangesInLocalStorage();
    this.onChanged.emit();
  }

  saveChangesInLocalStorage() {
    const toysFilterOptionsLocalStorage: IToysFilter = JSON.parse(localStorage.getItem('filter-options')!);
    toysFilterOptionsLocalStorage.sizes.forEach(size => {
      if (size.name === this.sizeInfo.name) size.isChosen = !this.sizeRef.checked;
    });
    localStorage.setItem('filter-options', JSON.stringify(toysFilterOptionsLocalStorage));
  }

  getNameWithFirstCapitalLetter(): string {
    return this.sizeInfo.name[0].toUpperCase() + this.sizeInfo.name.slice(1);
  }
}
