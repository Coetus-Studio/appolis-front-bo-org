import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Requirements } from '../../interfaces/requirement.interface';
import MapOrgComponent from "../../../../shared/map-org/components/map-org/map-org.component";
import { RequirementsService } from '../../services/requirements.service';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from "../../components/message-list/message-list.component";
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

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
  imageUrls: string[] = [];
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

  isUserObject(user: any): user is { email?: string } {
    return user && typeof user === 'object' && 'email' in user;
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

  getImageUrl(key: string): string {
    const cloudFrontDomain = environment.cloudfrontDomain; // Reemplaza con tu dominio de CloudFront
    return `${cloudFrontDomain}/${key}`;
  }
}
