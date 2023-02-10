import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ISortFilter, ISortValue, IToysFilter } from 'src/app/services/app-toys.service';

@Component({
  selector: 'app-sort-select',
  templateUrl: './sort-select.component.html',
  styleUrls: ['./sort-select.component.scss']
})
export class SortSelectComponent implements OnInit {
  @Input() sortType!: ISortFilter;
  @Output() onSorted: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('select') selectRef!: MatSelect;

  sortFormControl = new FormControl('');

  sortValueArr: ISortValue[] = [
    { id: 0, title: 'Нет' },
    { id: 1, title: 'По возрастанию' },
    { id: -1, title: 'По убыванию' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.sortFormControl.setValue(this.sortValueArr.find(sortValue => sortValue.id === this.sortType.id));
  }

  checkSortType() {
    const filterOptions: IToysFilter = JSON.parse(localStorage.getItem('filter-options')!);
    filterOptions.sortTypes.forEach(sortType => {
      if (sortType.title === this.sortType.title) sortType.id = this.sortFormControl.value.id
    });
    localStorage.setItem('filter-options', JSON.stringify(filterOptions));
    this.onSorted.emit();
  }
}
