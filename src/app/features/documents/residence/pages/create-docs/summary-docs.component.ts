import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormComponent } from "../../components/form/form.component";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-docs',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormComponent, CommonModule],
  templateUrl: './summary-docs.component.html',
  // styleUrl: './summary-docs.component.css'
})
export class SummaryDocsComponent {


  // constructor() {}

  // // TODO: agregar interface para dejar como tipo de dato
  // formData: any;

  // // recupera datos del localStorage
  // ngOnInit() {
  //   const data = localStorage.getItem('residenceFormData');
  //   if (data) {
  //     this.formData = JSON.parse(data);
  //     console.log('form Data => ', this.formData);
  //   }
  // }

  downloadPDF() {
    const data = document.getElementById('pdf-content');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('MYPdf.pdf');
      });
    }
  }






}
