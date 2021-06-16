import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../models/question';
import { OpenTriviaService } from '../../services/open-trivia.service';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  pseudo : string = '';
  difficultyChoice: string = '';
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
    private route: ActivatedRoute,
    private openTriviaService: OpenTriviaService,
    private toastController: ToastController,
    private router: Router
    ) {
    this.route.params.subscribe((params) => {
        this.pseudo = params['pseudo'];
        this.difficultyChoice = params['difficulty'];
    })
   }

   ngOnInit() {
    this.end = false;
    this.answered = false;
    this.score = 0;
    this.indexQuestion = 0;
    this.openTriviaService.getQuestions(10, this.difficultyChoice).then(res => {
      this.questions = res;
      this.setQuestion();
    })
  }


  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color    });
    toast.present();
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
    if (this.end) {
        this.router.navigate(['/score', this.pseudo, this.randomUser, this.score]);
      }
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
