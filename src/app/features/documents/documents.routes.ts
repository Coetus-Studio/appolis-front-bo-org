import { Routes } from "@angular/router";
import { DocumentsComponent } from "./documents.components";
import { CreateDocsComponent } from "./residence/pages/create-docs/create-docs.component";

export const DOCS_ROUTES: Routes = [

  // {
  //   path: '',
  //   component: DocumentsComponent,
  //   children: [
  //     { path: 'create', component: CreateDocsComponent },
  //     // { path: ':id', component: DocumentDetailComponent },
  //     // { path: ':id/edit', component: EditDocumentComponent },
  //   ]
  // },

  {
    path: '',
    component: DocumentsComponent,
  },
  {
    path: 'create',
    component: CreateDocsComponent,
  },





]
