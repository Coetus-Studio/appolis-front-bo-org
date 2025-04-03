import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EventFormService {

  // retornamos una instancia nueva en cada llamada, con eso evitamos que otras instancias alteren la data
  getForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required]),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      responsible_organization: new FormControl(''),
      created_by: new FormControl(''),
      location: new FormGroup({
        gm_formatted_address: new FormControl('', [Validators.required, Validators.minLength(5)]),
        description: new FormControl('Event Location Saved'),
        is_public: new FormControl(false),
        geo_point: new FormGroup({
          type: new FormControl('Point'),
          coordinates: new FormArray([
            new FormControl(''), // Latitud
            new FormControl('')  // Longitud
          ])
        })
      })
    });
  }
}
