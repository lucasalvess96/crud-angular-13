import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProdutos(data: any) {
    return this.http.post<any>("http://localhost:3000/listaProdutos/", data);
  }

  getProdutos(){
    return this.http.get<any>("http://localhost:3000/listaProdutos/");
  }

  putProduto(data: any, id: number){
    return this.http.put<any>('http://localhost:3000/listaProdutos/' + id, data);
  }

  deleteProduto(id: number){
    return this.http.delete<any>('http://localhost:3000/listaProdutos/' + id);
  }
}
