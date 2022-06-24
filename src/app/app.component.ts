import { Component, OnInit, ViewChild } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'material-ui';

  displayedColumns: string[] = ['produto', 'categoria', 'data', 'freshness', 'preco', 'comentario', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) {}

  openDialog():void {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if(val === 'salvo'){
        this.getAllProdutos();
      }
    });
  }

  ngOnInit(): void {
      this.getAllProdutos();
  }

  getAllProdutos(): void {
    this.api.getProdutos()
    .subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => alert("erro ao fazer a requisição"),
    })
  }

  editProduct(row: any): void {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row,
    }).afterClosed().subscribe(val => {
      if(val === 'atualizado'){
        this.getAllProdutos();
      }
    });
  }

  deleteProduto(id: number): void{
    this.api.deleteProduto(id)
    .subscribe({
      next: res => {
        alert('produto deletado!');
        this.getAllProdutos();
      },
      error: () => alert("erro ao deletar produto"),
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
