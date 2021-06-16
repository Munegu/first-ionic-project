import { Question } from '../models/question';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  constructor(private http: HttpClient) { }

   questions: Question[] = [];
   

 private async shuffle(array: any[]): Promise<any[]> {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  async callAPI (numberQuestions: number,difficultySelected: string ): Promise<void> {
    await this.http.get(`https://opentdb.com/api.php?amount=${numberQuestions}&category=15&difficulty=${difficultySelected}`).toPromise()
    .then((response: any) => {
      if (0 === response['response_code']){
      this.questions = response['results'];
    }
   })
    .catch((err) => { console.log(err); });

  }


   async getQuestions(numberQuestions: number,difficultySelected: string ): Promise<Question[]> {
      await this.callAPI(numberQuestions, difficultySelected.toLowerCase());
      let shuffleQuestions = await this.shuffle(this.questions);
      return shuffleQuestions;
  }

  async getAnswers(question: Question): Promise<string[]> {
    const responses: string[] = [];

    question.incorrect_answers.forEach(answer => {
      responses.push(answer);
      
    });

    responses.push(question.correct_answer);

    return await this.shuffle(responses);
  }
}
