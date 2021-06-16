import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../open-trivia.service';
import { Question } from '../question';



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
  valid: boolean = false;
  questions: Question[] = [];
  responses: string[] = [];
  currentQuestion: Question;
  indexQuestion: number;
  answered: boolean = false;
  end: boolean =  false;
  score: number = 0;
  randomInt = Math.floor(Math.random() * 9) + 1;
  randomUser: string = `https://randomuser.me/api/portraits/lego/${this.randomInt}.jpg`;


  constructor(
    private toastController: ToastController,
    private openTriviaService: OpenTriviaService
    ) {}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color    });
    toast.present();
  }



  async startQuiz ()   {

    this.end = false;
    this.answered = false;
    this.score = 0;
    this.indexQuestion = 0;

    if (0 === this.difficultyChoice.trim().length || 3 > this.pseudo.trim().length){
      this.presentToast('Veuillez renseignez un pseudo (3 caractères min) et choisir une difficulté', 'danger');
    }else {
      this.valid = true;
        await this.openTriviaService.getQuestions(10, this.difficultyChoice).then(res => {
          this.questions = res;
          this.setQuestion();
        })
    }
  }

  async setQuestion (): Promise<void> {
    this.currentQuestion = this.questions[this.indexQuestion];
    this.responses = await this.openTriviaService.getAnswers(this.currentQuestion);
  }

  setColor (response: string): string {
    if (!this.answered) {
      return "medium";
    }
    else if (this.answered && this.currentQuestion.correct_answer === response) {
      return "success";
    }
    else {
      return "danger";
    }
  }


  response (response: string): void {
    if (!this.answered && this.currentQuestion.correct_answer === response) {
      this.score++;
    }
      this.answered = true;
  }

  nextQuestion (): void {
    if (this.answered && this.indexQuestion+1 <= this.questions.length && undefined != this.currentQuestion){
      this.answered = false;
      this.indexQuestion ++;
      this.setQuestion();
      if (this.indexQuestion+1 == this.questions.length) {
        this.end = true;
      }
    } 
    else if (!this.answered) {
      this.presentToast('Veuillez choisir une réponse !', 'danger');
    }
   

  }


}
