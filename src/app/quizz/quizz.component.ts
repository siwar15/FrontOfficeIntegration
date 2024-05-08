import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Question} from "../model/Question";
import {Response} from "../model/Response";
import {QuestionService} from "../service/question.service";
import {ActivatedRoute} from "@angular/router";
import {ResponseService} from "../service/response.service";
//import {timer} from "rxjs";
import {ResultComponent} from "../result/result.component";
import {LevelService} from "../service/level.service";
import {ThemeService} from "../service/theme.service";
import {HistoryService} from "../service/history.service";
import {History} from "../model/History";
import {UserService} from "../service/user.service";
//const counterSecond = timer(0, 1000);


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  dialogRef: any;
  questions: Question[] | undefined;
  history: History = {} as History;
  idLevel: number = 0;
  level: any;
  counter = 0;
  score = 0;
  btnDisabled = true;
  username: string = " ";
  timeValue =  15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  counterLine :any;
  widthValue = 0;
  @ViewChild('start_btn') start_btn!: ElementRef
  @ViewChild('info_box') infoBox!: ElementRef;
  @ViewChild('quiz_box') quizBox!: ElementRef;
  @ViewChild('quit') exit_btn!:ElementRef
  @ViewChild('result_box') resultBox!: ElementRef;
  @ViewChild('option_list') optionList!: ElementRef;
  @ViewChild('time_line') timeLine!: ElementRef;
  @ViewChild('time_left_txt') timeText!: ElementRef;
  @ViewChild('time_sec') timeCount!: ElementRef;
  @ViewChild('total_que') bottom_ques_counter!: ElementRef
  @ViewChild('next_btn') next_btn!: ElementRef;
  @ViewChild('continue') continue_btn!: ElementRef
  @ViewChild('restart')restart_btn!: ElementRef

  constructor(private dialog: MatDialog, private questionService: QuestionService, private route: ActivatedRoute,
              private levelService: LevelService, private historyService: HistoryService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.username = this.userService.getUsername();
    this.idLevel = this.route.snapshot.params['idLevel'];
    console.log(this.idLevel)
    this.questionService.getQuestions(this.idLevel).subscribe(data => {
      this.questions = data;
      // Shuffle questions if needed
    });
    this.levelService.getLevel(this.idLevel).subscribe(level => {
      this.level = level;
      console.log(level.difficulty);

      console.log(level.themeName);

    });


    /*const counterSecond = timer(0, 1000);
    counterSecond.subscribe(() => {
      this.counter -= 1;
    });*/
  }

  startQuiz(): void {
    this.infoBox.nativeElement.classList.add("activeInfo");
  }

  exitQuiz(): void {
    this.infoBox.nativeElement.classList.remove("activeInfo");
  }

  continueQuiz(): void {
    this.infoBox.nativeElement.classList.remove("activeInfo");
    this.quizBox.nativeElement.classList.add("activeQuiz");
    this.showQuestions(0);
    this.queCounter(1);
    this.startTimer(15);

  }

  restartQuiz(): void {
    this.quizBox.nativeElement.classList.add("activeQuiz"); //show quiz box
    this.resultBox.nativeElement.classList.remove("activeResult"); //hide result box
    this.timeValue = 15;
    this.que_count = 0;
    this.que_numb = 1;
    this.userScore = 0;
    this.widthValue = 0;
    this.showQuestions(this.que_count); //calling showQestions function
    this.queCounter(this.que_numb); //passing que_numb value to queCounter
    clearInterval(this.counter); //clear counter
    clearInterval(this.counterLine); //clear counterLine
    this.startTimer(this.timeValue); //calling startTimer function
   // this.startTimerLine(this.widthValue); //calling startTimerLine function
    this.timeText.nativeElement.textContent = "Time Left"; //change the text of t
  }

  quitQuiz(): void {
    window.location.reload();
  }

  nextQuestion(): void {
    // @ts-ignore
    if(this.que_count < this.questions.length - 1){ //if question count is less than total question length
      this.que_count++; //increment the que_count value
      this.que_numb++; //increment the que_numb value
      this.showQuestions(this.que_count); //calling showQestions function
      this.queCounter(this.que_numb); //passing que_numb value to queCounter
      clearInterval(this.counter); //clear counter
      clearInterval(this.counterLine); //clear counterLine
      this.startTimer(this.timeValue); //calling startTimer function
     // this.startTimerLine(this.widthValue); //calling startTimerLine function
      this.timeText.nativeElement.textContent = "Time Left"; //change the timeText to Time Left
      this.next_btn.nativeElement.classList.remove("show"); //hide the next button
    }else{
      clearInterval(this.counter); //clthisear counter
      clearInterval(this.counterLine); //clear counterLine
      this.showResult(); //calling showResult function
    }
  }

  showQuestions(index: number): void {
    const que_text = document.querySelector(".que_text");
    const optionList = this.optionList.nativeElement; // Assuming optionList is a reference to an element

    // Create a new span for the question and prepend the index
    const que_tag = document.createElement('span');
    // @ts-ignore
    que_tag.textContent = `${index + 1}. ${this.questions[index].question}`;

    // Create option elements and bind click events using Angular event binding
    const options: HTMLDivElement[] = [];
    for (let i = 0; i < 4; i++) { // Assuming 4 options (correct, response1, response2, response3)
      const option = document.createElement('div');
      option.classList.add('option');

      const optionSpan = document.createElement('span');
      // @ts-ignore
      const response = i === 2 ? this.questions[index].correct : // Set correct answer
        // @ts-ignore
        i === 0 ? this.questions[index].response1 :
          // @ts-ignore
          i === 1 ? this.questions[index].response2 :
            // @ts-ignore
            this.questions[index].response3; // Handle all response cases
      optionSpan.textContent = response;

      // Bind click event using Angular event binding (recommended)
      optionSpan.addEventListener('click', () => this.optionSelected(response));

      option.appendChild(optionSpan);
      options.push(option);
    }

    // Update the DOM using Angular's change detection
    // @ts-ignore
    que_text.innerHTML = ''; // Clear existing content
    // @ts-ignore
    que_text.appendChild(que_tag);

    optionList.innerHTML = ''; // Clear existing options
    for (const option of options) {
      optionList.appendChild(option);
    }

  }
  tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
  crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


  optionSelected(answer: string): void {
    clearInterval(this.counter);
    clearInterval(this.counterLine);

    // @ts-ignore
    const clickedOption = event.target as HTMLElement; // Assuming event object is available

    if (clickedOption && !clickedOption.classList.contains('disabled')) { // Check if valid element and not already disabled
      const userAns = clickedOption.textContent;
      // @ts-ignore
      let correcAns = this.questions[this.que_count].correct;

      clickedOption.classList.add("disabled"); // Disable the clicked option immediately

      if (userAns === correcAns) {
        this.userScore += 1;
        clickedOption.classList.add("correct");
        clickedOption.insertAdjacentHTML("beforeend", this.tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + this.userScore);
      } else {
        clickedOption.classList.add("incorrect");
        clickedOption.insertAdjacentHTML("beforeend", this.crossIconTag);
        console.log("Wrong Answer");
        for (let i = 0; i < this.optionList.nativeElement.children.length; i++) {
          if (this.optionList.nativeElement.children[i].textContent === correcAns) {
            this.optionList.nativeElement.children[i].setAttribute("class", "option correct");
            this.optionList.nativeElement.children[i].insertAdjacentHTML("beforeend", this.tickIconTag);
            console.log("Auto selected correct answer.");
          }
        }
      }
    } else {
      console.error("Unexpected event target type or option already disabled. Cannot access insertAdjacentHTML");
    }

    for (let i = 0; i < this.optionList.nativeElement.children.length; i++) {
      this.optionList.nativeElement.children[i].classList.add("disabled"); // Disable all options after a click
    }
    this.next_btn.nativeElement.classList.add("show");
  }


  showResult(): void {
    this.infoBox.nativeElement.classList.remove("activeInfo"); //hide info box
    this.quizBox.nativeElement.classList.remove("activeQuiz"); //hide quiz box
    this.resultBox.nativeElement.classList.add("activeResult"); //show result box





    this.history.username=this.username;

    this.history.sore=this.userScore;
    this.history.themeName=this.level.themeName;
    this.history.levelName=this.level.difficulty;
    this.historyService.addHistory(this.history).subscribe(addHistory => {
      this.history = addHistory;
    });
    const scoreText = this.resultBox.nativeElement.querySelector(".score_text");
    if (this.userScore > 3){ // if user scored more than 3
      //creating a new span tag and passing the user score number and total question number
      // @ts-ignore
      let scoreTag = '<span>and congrats! , You got <p>'+ this.userScore +'</p> out of <p>'+ this.questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(this.userScore > 1){ // if user scored more than 1
      // @ts-ignore
      let scoreTag = '<span>and nice , You got <p>'+ this.userScore +'</p> out of <p>'+ this.questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
      // @ts-ignore
      let scoreTag = '<span>and sorry , You got only <p>'+ this.userScore +'</p> out of <p>'+ this.questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
    }
  }
   startTimer(time: number) {
    this.counter = setInterval(() => {
      this.timeCount.nativeElement.textContent = time.toString(); // changing the value of timeCount with time value
      time--; // decrement the time value
      if (time < 9) { // if timer is less than 9
        this.timeCount.nativeElement.textContent = "0" + this.timeCount.nativeElement.textContent; // add a 0 before time value
      }
      if (time < 0) { // if timer is less than 0
        clearInterval(this.counter); // clear counter
        this.timeText.nativeElement.textContent = "Time Off"; // change the time text to time off
        const allOptions = this.optionList.nativeElement.children.length; // getting all option items
        // @ts-ignore
        let correcAns = this.questions[this.que_count].correct; // getting correct answer from array
        for (let i = 0; i < allOptions; i++) {
          if (this.optionList.nativeElement.children[i].textContent == correcAns) { // if there is an option which is matched to an array answer
            this.optionList.nativeElement.children[i].setAttribute("class", "option correct"); // adding green color to matched option
            this.optionList.nativeElement.children[i].insertAdjacentHTML("beforeend", this.tickIconTag); // adding tick icon to matched option
            console.log("Time Off: Auto selected correct answer.");
          }
        }
        for (let i = 0; i < allOptions; i++) {
          this.optionList.nativeElement.children[i].classList.add("disabled"); // once user select an option then disabled all options
        }
       this.next_btn.nativeElement.classList.add("show"); // show the next button if user selected any option
      }
    }, 1000);
  }
  startTimerLine(time: number) {
    this.counterLine = setInterval(() => {
      time += 1; // upgrading time value with 1
      this.timeLine.nativeElement.style.width = time + "px"; // increasing width of time_line with px by time value
      if (time > 549) { // if time value is greater than 549
        clearInterval(this.counterLine); // clear counterLine
      }
    }, 29);
  }



  queCounter(index: number): void {
    // @ts-ignore
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + this.questions.length + '</p> Questions</span>';
    this.bottom_ques_counter.nativeElement.innerHTML = totalQueCounTag;
  }



}
