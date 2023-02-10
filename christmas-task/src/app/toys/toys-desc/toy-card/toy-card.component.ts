import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AppToysService, IToy } from 'src/app/services/app-toys.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-toy-card',
  templateUrl: './toy-card.component.html',
  styleUrls: ['./toy-card.component.scss'],
  providers: [AppToysService],
  animations: [
    trigger('toy-card', [
      transition(':enter', [
        style({
          opacity: 0,
          width: '0px'
        }),
        animate('1.25s ease-in',
          style({
            opacity: 1,
            width: '*'
          })
        )
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          width: '*'
        }),
        animate('1.25s ease-in',
          style({
            opacity: 0,
            width: '0px'
          })
        )
      ]),
    ]),
  ]
})
export class ToyCardComponent implements OnInit, OnChanges {
  @Input() toyData!: IToy;
  @Input() triggerFilter!: boolean;
  @Input() searchText: string = '';
  @Output() onSelectToy: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onNotificate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('toyCard') toyCardRef!: ElementRef;

  toyImgUrl: string = '';
  isFavouriteStr: string = '';

  constructor(private appToysService: AppToysService) { }

  ngOnInit(): void {
    this.toyImgUrl = `../../../../assets/toys/${this.toyData.num}.png`;
    this.isFavouriteStr = this.toyData.favorite ? 'да' : 'нет';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getVisibleProp();
  }

  selectToy(): void {
    const isInLimit = this.checkSelectedToysLimit();
    this.toyData.isSelected = isInLimit ? !this.toyData.isSelected : false;
    this.updateSelectedToyData();
    this.updateSelectedToysCount();
    if (!isInLimit && this.getSelectedToysCount() === 20) this.onNotificate.emit();
    this.onSelectToy.emit();
  }

  checkSelectedToysLimit() {
    const currentSelectedToysCount: number = this.getSelectedToysCount();
    return currentSelectedToysCount < 20;
  }

  updateSelectedToyData() {
    const localStorageToysData: string | null = localStorage.getItem('toys-data');
    if (localStorageToysData) {
      const toysData: IToy[] = JSON.parse(localStorageToysData);
      toysData.forEach(toyData => {
        if (this.toyData.num === toyData.num) toyData.isSelected = this.toyData.isSelected;
      });
      localStorage.setItem('toys-data', JSON.stringify(toysData));
    }
  }

  updateSelectedToysCount() {
    const localStorageToysData: string | null = localStorage.getItem('toys-data');
    let selectedToysCount: number = 0;
    if (localStorageToysData) {
      const toysData: IToy[] = JSON.parse(localStorageToysData);
      const selectedToys = toysData.filter(toyData => toyData.isSelected);
      selectedToysCount = selectedToys.length;
    }
    localStorage.setItem('selected-toys-count', String(selectedToysCount));
  }

  getSelectedToysCount(): number {
    return Number(localStorage.getItem('selected-toys-count'));
  }

  getVisibleProp() {
    const localStorageToysData: string | null = localStorage.getItem('toys-data');
    if (localStorageToysData) {
      const toysData: IToy[] = JSON.parse(localStorageToysData);
      const currentToyData: IToy = toysData.find(toyData => this.toyData.num === toyData.num)!;
      this.toyData.visible = currentToyData.visible && this.toyData.name.toLowerCase().includes(this.searchText.trim().toLowerCase());
    }
  }
}
