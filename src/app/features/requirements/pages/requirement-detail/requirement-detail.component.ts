import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Requirements } from '../../interfaces/requirement.interface';
import MapOrgComponent from "../../../../shared/map-org/components/map-org/map-org.component";
import { RequirementsService } from '../../services/requirements.service';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from "../../components/message-list/message-list.component";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-requirement-detail',
  standalone: true,
  imports: [MapOrgComponent, CommonModule, MessageListComponent],
  templateUrl: './requirement-detail.component.html',
  styleUrl: './requirement-detail.component.css'
})
export default class RequirementDetailComponent implements OnInit {

  @Input() requirement!: Requirements;

  idRequirement = '';


  constructor(
    private route: ActivatedRoute, // proporciona informacion sobre la ruta activa, obtiene el id entre otras
    private requirementService: RequirementsService
  ) { }
  ngOnInit(): void {
    this.getRequirementById();

    // esto me ayuda a renderizar el componente message-list
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requirementService.getRequirementById(id).subscribe(data => {
        this.requirement = data;
        this.idRequirement = id;
      })
    }
  }


  getRequirementById() {
    const requirementId = this.route.snapshot.paramMap.get('id');
    console.log('requirementId' + requirementId);

    if (requirementId) {
      this.requirementService.getRequirementById(requirementId).subscribe(requirement => {
        this.requirement = requirement;
        console.log('requirement 2', this.requirement);
      })
    }
    // const requirementId = this.route.snapshot.paramMap.get('id');
  }

  respondRequirement(message: string) {
    console.log("message org", message)
    console.log("idRequirement", this.idRequirement)
    if (message) {
      this.requirementService.respondRequirement(this.idRequirement, message).subscribe(message => {
        console.log("entrando al service")
      })
    }
  }
}
