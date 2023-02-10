import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IShapeFilter, IToysFilter } from 'src/app/services/app-toys.service';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss']
})
export class ShapeComponent implements OnInit {
  @Input() shape!: IShapeFilter;
  @Output() onChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleShape() {
    this.shape.isChosen = !this.shape.isChosen;
    this.saveChangesInLocalStorage();
    this.onChanged.emit();
  }

  saveChangesInLocalStorage() {
    const toysFilterOptionsLocalStorage: IToysFilter = JSON.parse(localStorage.getItem('filter-options')!);
    toysFilterOptionsLocalStorage.shapes.forEach(shape => {
      if (shape.name === this.shape.name) shape.isChosen = this.shape.isChosen;
    });
    localStorage.setItem('filter-options', JSON.stringify(toysFilterOptionsLocalStorage));
  }
}
