import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Requirements } from '../../interfaces/requirement.interface';
import MapOrgComponent from "../../../../shared/map-org/components/map-org/map-org.component";
import { RequirementsService } from '../../services/requirements.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requirement-detail',
  standalone: true,
  imports: [ MapOrgComponent, CommonModule ],
  templateUrl: './requirement-detail.component.html',
  styleUrl: './requirement-detail.component.css'
})
export default class RequirementDetailComponent implements OnInit {

  @Input() requirement!: Requirements;

  constructor(
    private route: ActivatedRoute, // proporciona informacion sobre la ruta activa, obtiene el id entre otras
    private requirementService: RequirementsService
  ) { }
  ngOnInit(): void {
    this.getRequirementById();
  }


  getRequirementById() {
    const requirementId = this.route.snapshot.paramMap.get('id');
    console.log('requirementId' + requirementId);

    if (requirementId) {
      this.requirementService.getRequirementById(requirementId).subscribe(requirement => {
        this.requirement = requirement;
        console.log('requirement', this.requirement);
      })
    }

    // const requirementId = this.route.snapshot.paramMap.get('id');
  }

}
