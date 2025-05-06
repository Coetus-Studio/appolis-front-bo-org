import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ModalAddressComponent } from '../../../../shared/map-org/components/modal-address/modal-address.component';
import { MatDialog } from '@angular/material/dialog';
import { Opportunity } from '../../interfaces/opportunities.interface';
import { OpportunityFormService } from '../../services/opportunity-form.service';

@Component({
  selector: 'app-opportunity-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatInputModule, MatChipsModule, MatIconModule ],
  templateUrl: './opportunity-form.component.html',
  styleUrl: './opportunity-form.component.css'
})
export class OpportunityFormComponent implements OnInit {

  opportunityForm: any;

  sponsors: string[] = [];

  isUpdate: boolean = false;

  isAddressModalOpen = false;

  readonly keywords = signal(['']);

  successMessage: string | null = null;
  successUpdateMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private dialog: MatDialog,
    private opportunityFormService: OpportunityFormService
  ) {
    this.opportunityForm = this.opportunityFormService.getForm();

  }

  ngOnInit(): void {
    console.log('implement OpportunityFormComponent')
  }

  onSubmit() {
    if (this.isUpdate) {
      this.updateOpportunity();
    } else {
      this.createOpportunity();
    }

  }

  updateOpportunity() {

  }

  createOpportunity() {
    if (this.opportunityForm.valid) {
      const opportunityData = this.opportunityForm.getRawValue();

      const opportunity: Opportunity = {
        _id: opportunityData._id,
        title: opportunityData.title,
        description: opportunityData.description,
        start_date: opportunityData.start_date,
        end_date: opportunityData.end_date,
        sponsors: this.sponsors,
        created_by: '',
        // responsible_organization: this.orgId,

      }

      console.log('opportunity: ', opportunity)
    }

  }

  removeKeyword(sponsor: string) {
    console.log("sponsor: ", sponsor)
    const index = this.sponsors.indexOf(sponsor);
    console.log('index: ', index)
    if (index >= 0) {
      this.sponsors.splice(index, 1);
      // this.sponsorsControl.setValue(this.sponsors);
      // this.eventForm.patchValue({ sponsor: this.sponsors });
    }
  }

    openAddressModal() {
      this.isAddressModalOpen = true;

      const dialogRef = this.dialog.open(ModalAddressComponent, {
        width: '50',
        height: '60',
        data: {
          location: this.opportunityForm.get('location.geo_point.coordinates')?.value
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Actualizar los valores en el formulario
          this.opportunityForm.get('location.gm_formatted_address')?.setValue(result.gm_formatted_address);
          this.opportunityForm.get('location.geo_point.coordinates')?.setValue([
            result.location.lng,
            result.location.lat
          ]);
          // Actualizar los valores en el componente
          this.opportunityForm = result.gm_formatted_address;
        }
      });
    }

      add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        console.log("value: ", value)

        // Add our keyword
        if (value && !this.sponsors.includes(value)) {
          this.sponsors.push(value);
          this.opportunityForm.patchValue({ sponsor: this.sponsors })
          this.keywords.update(keywords => [...keywords, value]);
        }

        console.log("sponsors: ", this.sponsors)

        // limpio el input
        if (event.chipInput) {
          event.chipInput.clear()
        }

      }

}
