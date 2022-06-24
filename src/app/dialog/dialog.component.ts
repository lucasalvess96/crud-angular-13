import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  freshnessLists: string[] = ["Brand new", " Second brand", " Refurbished"];
  productForm!: FormGroup;
  actionBTN: string = 'Salvar';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matDialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      produto: ['', Validators.required],
      categoria: ['', Validators.required],
      freshness: ['', Validators.required],
      preco: ['', Validators.required],
      comentarios: ['', Validators.required],
      data: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBTN = 'atualizar';
      this.productForm.controls['produto'].setValue(this.editData.produto);
      this.productForm.controls['categoria'].setValue(this.editData.categoria);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['preco'].setValue(this.editData.preco);
      this.productForm.controls['comentarios'].setValue(this.editData.comentarios);
      this.productForm.controls['data'].setValue(this.editData.data);
    }
  }

  addProdutos(): void {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProdutos(this.productForm.value)
          .subscribe({
            next: res => {
              alert("produto adicionado com sucesso!");
              this.productForm.reset();
              this.matDialogRef.close('salvo');
            },
            error: () => alert("erro ao adicionar produto"),
          })
      }
    }else{
      this.updateProduto();
    }
  }

  updateProduto(){
    this.api.putProduto(this.productForm.value, this.editData.id)
    .subscribe({
      next: res => {
        alert('produto atualizado com sucesso'),
        this.productForm.reset();
        this.matDialogRef.close("atualizado");
      },
      error: () => alert("erro ao atualizar produto"),
    })
  }

}
