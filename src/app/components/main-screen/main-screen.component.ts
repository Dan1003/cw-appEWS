import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from './../../service/api.service';
import { Player } from './../../model/player';


var LEADERBOARD: Player[] = []

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  newGuess = new FormControl('');
  randomValue = 0;
  userScore;
  userName = new FormControl('');

  alreadyGuessed = false;
  alreadySubmitted = false;

  leaderboardTableColumns : string[] = ['position','name','score'];
  dataSource = new MatTableDataSource(LEADERBOARD);


  //This function calculates the score based on how close the user's
  //guess was to the generated number, with 100 being the "One in a million score"
  calcScore(){
    if(parseInt(this.newGuess.value) > this.randomValue){
      this.userScore =  this.randomValue / parseInt(this.newGuess.value)  * 100;
    }
    else if(parseInt(this.newGuess.value) < this.randomValue){
      this.userScore = parseInt(this.newGuess.value) / this.randomValue * 100;
    }
    else{
      this.userScore = "100!";
    }
    this.alreadyGuessed = true;
  }

  //This function adds the player to the database and
  //refreshes the leaderboard to display the new state
  processPlayer(){
    var newPlayer : Player = {name: String(this.userName.value), score: String(this.userScore)};
    LEADERBOARD.push(newPlayer);
    this.apiService.addPlayer(newPlayer).subscribe((data) => {
    })
    this.refreshLeaderboard();
    this.alreadySubmitted = true;

  }

  //This function gets the full db via the api call to the
  //back end and diplays it on the MatTable
  refreshLeaderboard(){
    this.apiService.getPlayers().subscribe((data: Player[]) => {
      LEADERBOARD = data;
      LEADERBOARD.sort((a,b)=> parseFloat(b.score) - parseFloat(a.score));
      this.dataSource = new MatTableDataSource(LEADERBOARD);
    })
  }


  ngOnInit(): void {
    this.randomValue = Math.floor(Math.random() * 1000000) + 1
    this.refreshLeaderboard();
  }

}
