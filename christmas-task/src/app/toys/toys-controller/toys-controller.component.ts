import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CONSTS, IToysFilter } from 'src/app/services/app-toys.service';

@Component({
  selector: 'app-toys-controller',
  templateUrl: './toys-controller.component.html',
  styleUrls: ['./toys-controller.component.scss'],
})
export class ToysControllerComponent implements OnInit {
  filterConsts = CONSTS;

  @Input() options!: IToysFilter;
  @Output() onChanged: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSorted: EventEmitter<void> = new EventEmitter<void>();

  constructor( ) { }

  ngOnInit(): void { }

  applyFilter(): void {
    this.onChanged.emit();
  }

  applySort(): void {
    this.onSorted.emit();
  }

  setDefault(): void {
    const defaultOptions: IToysFilter = JSON.parse(localStorage.getItem('filter-options-default')!);
    const currenttOptions: IToysFilter = JSON.parse(localStorage.getItem('filter-options')!);
    defaultOptions.sortTypes = JSON.parse(JSON.stringify(currenttOptions.sortTypes));
    localStorage.setItem('filter-options', JSON.stringify(defaultOptions));
    this.onChanged.emit();
  }

  clearLocalStorage(): void {
    localStorage.clear();
    location.reload();
  }
}
