import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

export interface IToy {
  num: number,
  name: string,
  count: number,
  year: number,
  shape: string,
  color: string,
  size: string,
  favorite: boolean,
  visible?: boolean,
  order?: number,
  isSelected?: boolean
}

export interface IToysFilter {
  sortTypes: ISortFilter[];
  shapes: IShapeFilter[],
  count: ISliderFilter,
  year: ISliderFilter,
  colors: IColorsFilter[],
  sizes: ISizeFilter[],
  favorite: boolean
}

export interface ISortFilter {
  title: string,
  name: string,
  id: number
}

export interface IShapeFilter {
  name: string,
  url: string,
  isChosen: boolean,
}

export interface ISliderFilter {
  name: string,
  value: number,
  minValue: number,
  maxValue: number,
  ICountFilterProperty: boolean,
}

export interface IColorsFilter {
  name: string,
  colorHex: string,
  isChosen: boolean,
}

export interface ISizeFilter {
  name: string,
  isChosen: boolean,
}

export interface ISortValue {
  title: string,
  id: number
}

export enum CONSTS {
  minYear = 1900,
  maxYear = 2021,
  minToysCount = 0,
  maxToysCount = 20
}

@Injectable()
export class AppToysService {
  private toysUrl: string = './assets/database/data.js';
  private defaultFilterUrl: string = './assets/database/default-filter.json';

  constructor(
    private http: HttpClient,
  ) { }

  getToys(): Observable<IToy[]> {
    return this.http.get<IToy[]>(this.toysUrl).pipe(delay(500));
  }

  getFilterOptions(): Observable<IToysFilter> {
    return this.http.get<IToysFilter>(this.defaultFilterUrl).pipe(delay(500));
  }
}