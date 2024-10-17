import { Routes } from "@angular/router";
import { DocumentsComponent } from "./documents.components";
import { CreateDocsComponent } from "./residence/pages/create-docs/create-docs.component";
import { SummaryDocsComponent } from "./residence/pages/create-docs/summary-docs.component";



export const DOCS_ROUTES: Routes = [


  {
    path: '',
    component: DocumentsComponent,
  },
  {
    path: 'create',
    component: CreateDocsComponent,
    // children: [
    //   { path: 'summary', component: SummaryDocsComponent}
    // ]
  },
  {
    path: 'create/summary',
    component: SummaryDocsComponent,
    // outlet: 'summary'
  }





]
