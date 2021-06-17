import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../utils/toast.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  difficulty: Array<string> = ['Easy','Medium','Hard'];
  difficultyChoice: string = '';
  save: boolean = false;
  pseudo : string = '';

  constructor(
    private toastService: ToastService,
    private router: Router,
    private storage: Storage
    ) {}

    async ngOnInit() {
      await this.storage.create();
      this.storage.get('pseudo').then((data) => {
        this.pseudo = data;
      });
      this.storage.get('difficulty').then((data) => {
        this.difficultyChoice = data;
      });
    }



  async startQuiz ()   {

    if (0 === this.difficultyChoice.trim().length || 3 > this.pseudo.trim().length){
      this.toastService.presentToast('Veuillez renseignez un pseudo (3 caractères min) et choisir une difficulté', 'danger');
    }
    else {
      if (this.save) {
        this.storage.set('pseudo', this.pseudo);
        this.storage.set('difficulty', this.difficultyChoice);
      }
      this.router.navigate(['/game', this.pseudo, this.difficultyChoice]);
    }
  }





}
