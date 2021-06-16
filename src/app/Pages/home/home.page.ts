import { Component } from '@angular/core';
import { ToastService } from '../../utils/toast.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  difficulty: Array<string> = ['Easy','Medium','Hard'];
  difficultyChoice: string = '';
  save: boolean = false;
  pseudo : string = '';

  constructor(
    private toastService: ToastService,
    private router: Router
    ) {}



  async startQuiz ()   {

    if (0 === this.difficultyChoice.trim().length || 3 > this.pseudo.trim().length){
      this.toastService.presentToast('Veuillez renseignez un pseudo (3 caractères min) et choisir une difficulté', 'danger');
    }
    else {
      this.router.navigate(['/game', this.pseudo, this.difficultyChoice]);
    }
  }





}
