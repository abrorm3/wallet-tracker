import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../app.const";
import { Category } from "../main/main-center/category.model";

@Injectable({providedIn:'root'})

export class DataStorageService {
  constructor(private http: HttpClient){

  }
  getCategories(){
    return this.http.get<Category>(BASE_URL+'/categories.json')
  }
  addCategory(category:Category){
    return this.http.post<any>(BASE_URL+'/categories.json', category)

  }
}
