import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: '' 
  }

  titulo = new FormControl('', [Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(resposta => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro criado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Erro ao criar um novo livro! Tente mais tarde.');
    });
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage(campoDeCaracteres: String) { 
    let qualquerInvalido = this.titulo.invalid || this.texto.invalid || this.nome_autor.invalid;

    if(this.titulo.invalid && campoDeCaracteres == "titulo") {
      return "O campo TÍTULO deve ter entre 3 e 100 caracteres";
    }

    if(this.nome_autor.invalid && campoDeCaracteres == "nome_autor") {
      return "O campo NOME DO AUTOR deve ter entre 3 e 100 caracteres";
    }

    if (this.texto.invalid && campoDeCaracteres == "texto") {
      return "O campo TEXTO deve ter entre 10 e 2.000.000 caracteres";
    }

    if (qualquerInvalido && campoDeCaracteres == "button") {
      return true;
    }
    return false;
  }

}
