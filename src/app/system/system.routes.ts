import { Route } from '@angular/router';
import { SystemComponent } from "./system.component";
import { BillComponent } from "./bill/bill.component";
import { PlanningComponent } from "./planning/planning.component";
import { RecordsComponent } from "./records/records.component";
import { HistoryComponent } from "./history/history.component";
import { DetailComponent } from "./history/detail/detail.component";
import { AuthGuard } from "../shared/services/auth.guard";

export default [
  {
    path: '',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'bill',
        component: BillComponent
      },
      {
        path: 'planning',
        component: PlanningComponent
      },
      {
        path: 'records',
        component: RecordsComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'history/:id',
        component: DetailComponent
      }
    ]
  }
] satisfies Route[];
