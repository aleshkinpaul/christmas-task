import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IToy } from 'src/app/services/app-toys.service';

@Component({
  selector: 'app-toys-desc',
  templateUrl: './toys-desc.component.html',
  styleUrls: ['./toys-desc.component.scss'],
  animations: [
    trigger('notification-message', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('0.5s ease-in',
          style({
            opacity: 1,
          })
        )
      ]),
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('0.5s ease-in',
          style({
            opacity: 0,
          })
        )
      ]),
    ]),
  ]
})
export class ToysDescComponent implements OnInit, OnChanges {
  @Input() toysData!: IToy[];
  @Input() triggerFilter!: boolean;
  selectedToysCount?: number;
  isNotificate: boolean = false;
  isEmpty: boolean = false;
  searchText: string = '';
  searchPlaceholder: string = 'Поиск...';

  public disableAnimation = true;

  constructor() { }

  ngOnInit(): void {
    this.updateSelectedToysCount();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.showEmptyToysList();
  }

  updateSelectedToysCount() {
    const localStorageSelectedToysCount: number | null = Number(localStorage.getItem('selected-toys-count'));
    this.selectedToysCount = localStorageSelectedToysCount ? localStorageSelectedToysCount : 0;
  }

  clearSearch() {
    this.searchText = '';
    this.showEmptyToysList();
  }

  showNotification() {
    this.isNotificate = true;
    setTimeout(() => {
      this.isNotificate = false;
    }, 1500);
  }

  showEmptyToysList() {
    const localStorageToysData: string | null = localStorage.getItem('toys-data');
    if (localStorageToysData) {
      const toysData: IToy[] = JSON.parse(localStorageToysData);
      const visibleToys = toysData.filter(toyData => toyData.visible && this.searchToys(toyData));
      this.isEmpty = !visibleToys.length;
    }
  }

  searchToys(toyData: IToy) {
    return toyData.name.toLowerCase().includes(this.searchText.trim().toLowerCase());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.disableAnimation = false;
    }, 0);
  }
}
