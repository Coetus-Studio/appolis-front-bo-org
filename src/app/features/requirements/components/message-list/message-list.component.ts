import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Requirements } from '../../interfaces/requirement.interface';
import RequirementDetailComponent from '../../pages/requirement-detail/requirement-detail.component';

@Component({
  selector: 'message-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {


  @Input() requirement: Requirements | null = null;


  ngOnInit(): void {
    console.log("MessageListComponent", this.requirement);
  }



}
