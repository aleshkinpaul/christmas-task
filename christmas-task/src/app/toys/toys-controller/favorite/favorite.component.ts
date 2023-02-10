import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IToysFilter } from 'src/app/services/app-toys.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  @Input() favorite!: boolean;
  @Output() onChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  checkFavorite(): void {
    this.saveChangesInLocalStorage();
    this.onChanged.emit();
  }

  saveChangesInLocalStorage() {
    const toysFilterOptionsLocalStorage: IToysFilter = JSON.parse(localStorage.getItem('filter-options')!);
    toysFilterOptionsLocalStorage.favorite = !this.favorite;
    localStorage.setItem('filter-options', JSON.stringify(toysFilterOptionsLocalStorage));
  }
}
