import { Component, Input, OnInit } from '@angular/core';
import { CitizenMap } from '../../interfaces/citizen-map.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import MapOrgComponent from '../../components/map-org/map-org.component';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-citizen-point-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, MapOrgComponent],
  templateUrl: './citizen-point-detail.component.html',
  styleUrl: './citizen-point-detail.component.css'
})
export default class CitizenPointDetailComponent implements OnInit {

  @Input() citizenPoint!: CitizenMap;

  constructor (
    private route: ActivatedRoute, // proporciona informacion sobre la ruta activa, obtiene el id entre otras
    private router: Router,
    private citizenPointService: LocationsService,
  ) {}

  ngOnInit(): void {
    this.getCitizenPointById();

  }


  getCitizenPointById() {
    console.log('get citizen point by id');
    const citizenPointId = this.route.snapshot.paramMap.get('id');
    console.log('citizenPointId', citizenPointId)
    if (citizenPointId) {
      this.citizenPointService.getCitizenPointById(citizenPointId).subscribe(point => {
        this.citizenPoint = point;
        console.log('citizenPoint 1: ', this.citizenPoint)
      })
    }

  }

  deleteCitizenPoint(citizenPointId: string) {
    console.log("ingresando a citizen point detail")
  }


}
