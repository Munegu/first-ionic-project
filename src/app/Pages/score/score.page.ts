import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  pseudo : string;
  randomUser: string;
  score: number;




  constructor(private route: ActivatedRoute,) {
    this.route.params.subscribe((params) => {
      this.pseudo = params['pseudo'];
      this.randomUser = params['lego'];
      this.score = params['score'];
  })
   }

  ngOnInit() {
  }

}
