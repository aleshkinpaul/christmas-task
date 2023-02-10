import { Component, OnInit } from '@angular/core';
import { AppToysService, ISortFilter, IToy, IToysFilter } from '../services/app-toys.service';

@Component({
  selector: 'app-toys',
  templateUrl: './toys.component.html',
  styleUrls: ['./toys.component.scss'],
  providers: [AppToysService]
})
export class ToysComponent implements OnInit {
  toysData: IToy[] = [];
  filterOptions!: IToysFilter;
  isLoading: boolean = true;
  triggerFilter: boolean = false;

  constructor(
    private appToysService: AppToysService,
  ) { }

  ngOnInit(): void { 
    this.refreshPage();
  }

  refreshPage(): void {
    this.fetchFilterOptions();
    this.fetchToys();
  }

  fetchFilterOptions() {
    const localStorageFilterOptions: string | null = localStorage.getItem('filter-options');
    if (!localStorageFilterOptions) this.getFilterOptionsData();
    else {
      setTimeout(() => {
        this.filterOptions = JSON.parse(localStorageFilterOptions);
        this.isLoading = false;
      }, 0);
    }
  }

  fetchToys() {
    const localStorageToysData: string | null = localStorage.getItem('toys-data');
    if (!localStorageToysData) this.getToysData();
    else {
      this.toysData = JSON.parse(localStorageToysData);
      this.filterToys();
      this.applySortOptions();
    }
  }

  filterToys() {
    const localStorageFilterOptions: string = localStorage.getItem('filter-options')!;
    const localStorageToysData: string = localStorage.getItem('toys-data')!;
    this.triggerFilter = !this.triggerFilter;
    if (!localStorageFilterOptions || !localStorageToysData) this.refreshPage()
    else {
      let toysData: IToy[] = JSON.parse(localStorageToysData);
      this.filterOptions = JSON.parse(localStorageFilterOptions);
      toysData.forEach(toy => {
        toy.visible = this.shapesFilter(toy)
                      && this.countFilter(toy)
                      && this.yearFilter(toy)
                      && this.colorFilter(toy)
                      && this.sizeFilter(toy)
                      && this.favoriteFilter(toy);
      });
      localStorage.setItem('toys-data', JSON.stringify(toysData));
    }
  }

  shapesFilter(toy: IToy) {
    const shapes = this.filterOptions.shapes.filter(shape => shape.isChosen).map(shape => shape.name.toLowerCase());
    return !shapes.length || shapes.includes(toy.shape.toLowerCase());
  }

  countFilter(toy: IToy) {
    const countValue = Number(this.filterOptions.count.value);
    return Number(toy.count) >= countValue;
  }

  yearFilter(toy: IToy) {
    const yearValue = Number(this.filterOptions.year.value);
    return Number(toy.year) >= yearValue;
  }

  colorFilter(toy: IToy) {
    const colors = this.filterOptions.colors.filter(color => color.isChosen).map(color => color.name.toLowerCase());
    return !colors.length || colors.includes(toy.color.toLowerCase());
  }

  sizeFilter(toy: IToy) {
    const sizes = this.filterOptions.sizes.filter(size => size.isChosen).map(size => size.name.toLowerCase());
    return !sizes.length || sizes.includes(toy.size.toLowerCase());
  }

  favoriteFilter(toy: IToy) {
    return !this.filterOptions.favorite || toy.favorite === this.filterOptions.favorite;
  }

  applySortOptions() {
    this.toysData.sort((firstToy: IToy, secondToy: IToy) => {
      const filterOptions: IToysFilter = JSON.parse(localStorage.getItem('filter-options')!);
      const sortOptions: ISortFilter[] = filterOptions.sortTypes;
      const nameSortId = sortOptions.find(sortOption => sortOption.name === 'name')!.id;
      const yearSortId = sortOptions.find(sortOption => sortOption.name === 'year')!.id;
      
      return yearSortId * compareValues(firstToy.year, secondToy.year) !== 0 ?
             yearSortId * compareValues(firstToy.year, secondToy.year) :
             nameSortId * compareValues(firstToy.name, secondToy.name);

      function compareValues(firstStr: string | number, secondStr: string | number) {
        if (firstStr < secondStr) return -1;
        if (firstStr > secondStr) return 1;
        return 0;
      }
    });
    this.toysData.forEach((toyData, ind) => toyData.order = ind );
    this.toysData = JSON.parse(JSON.stringify(this.toysData));
  }

  getToysData() {
    this.appToysService.getToys().subscribe(toysData => {
      this.toysData = toysData;
      localStorage.setItem('toys-data', JSON.stringify(toysData));
      this.filterToys();
      this.applySortOptions();
    });
  }

  getFilterOptionsData() {
    this.appToysService.getFilterOptions().subscribe(filterOptions => {
      this.filterOptions = filterOptions;
      localStorage.setItem('filter-options', JSON.stringify(filterOptions));
      localStorage.setItem('filter-options-default', JSON.stringify(filterOptions));
      this.isLoading = false;
    });
  }
}
