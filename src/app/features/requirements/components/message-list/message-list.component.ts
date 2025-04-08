import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Requirements } from '../../interfaces/requirement.interface';
import RequirementDetailComponent from '../../pages/requirement-detail/requirement-detail.component';

@Component({
  selector: 'message-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent   {

  @Input() requirement!: Requirements;

  constructor() {
    console.log("MessageListComponent", this.requirement);
  }




}
