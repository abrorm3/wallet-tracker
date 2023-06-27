import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./app.const";
import { Category } from "./main/main-center/category.model";

@Injectable({providedIn:'root'})

export class DataStorageService {
  constructor(private http: HttpClient){

  }
  getCategories(){
    return this.http.get<Category>(url+'/categories.json')
  }
  addCategory(category:Category){
    return this.http.post<any>(url+'/categories.json', category)

  }
}
