import {Routes} from '@angular/router';
import {MainLayoutComponent} from './component/infra/main-layout/main-layout.component';
import {EmptyLayoutComponent} from './component/infra/empty-layout/empty-layout.component';
import {ServerErrorComponent} from './component/infra/server-error/server-error.component';
import {NotFoundComponent} from './component/infra/not-found/not-found.component';
import {LoginComponent} from './component/iam/login/login.component';
import {HomeComponent} from './component/protected/home/home.component';
import {ListResumeComponent} from './component/protected/list-resume/list-resume.component';
import {ListBidComponent} from './component/protected/list-bid/list-bid.component';
import {ListProjectComponent} from './component/protected/list-project/list-project.component';
import {PreviewBidComponent} from './component/protected/preview-bid/preview-bid.component';
import {ListCustomerComponent} from './component/protected/list-customer/list-customer.component';
import {ListSectorComponent} from './component/protected/list-sector/list-sector.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent, title: 'Bidding Platform :: Dashboard'},
      {path: 'list-resume', component: ListResumeComponent, title: 'Bidding Platform :: Lista de Candidatos'},
      {path: 'list-bid', component: ListBidComponent, title: 'Bidding Platform :: Lista de Concursos'},
      {path: 'preview-bid/:idBid', component: PreviewBidComponent, title: 'Bidding Platform :: Visualização do Racional'},
      {path: 'list-project', component: ListProjectComponent, title: 'Bidding Platform :: Lista de Projetos'},
      {path: 'list-customer', component: ListCustomerComponent, title: 'Bidding Platform :: Lista de Clientes'},
      {path: 'list-sector', component: ListSectorComponent, title: 'Bidding Platform :: Lista de Setores'},
    ],
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent, title: 'Bidding Platform :: Login'},
    ]
  },
  {path: 'serverError', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent}
];
