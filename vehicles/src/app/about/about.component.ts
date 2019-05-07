import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  para = ' ';
  constructor() { }

  ngOnInit() {

// const LoremIpsum = require("lorem-ipsum").LoremIpsum;


    this.createPara();


  }

  createPara() {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 5,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });


    this.para = lorem.generateParagraphs(5);
  }

}
