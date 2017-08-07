import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'sb-backup-plan',
  templateUrl: './backup-plan.component.html',
  styleUrls: ['./backup-plan.component.scss']
})
export class BackupPlanComponent implements OnInit {
  plan: any = { destination: {} }
  update = false;

  constructor(protected readonly backupService: BackupService,
              protected readonly route: ActivatedRoute,
              protected readonly router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['planId']);
       if (params['planId']) {
         this.update = true;
          this.backupService.loadBackupPlan(params['planId'])
            .subscribe(
              (plan: any) => { this.plan = plan},
            );
       }
    });

  }

  delete(): void {
    this.backupService.delete('plans', this.plan)
      .subscribe((plan: any) => {
        this.redirect();
      });
  }

  onSubmit(): void {
    if (this.update) {
      this.backupService.update('plans', this.plan)
        .subscribe((plan: any) => {
          this.redirect();
      });
    } else {
      this.backupService.save('plans', this.plan)
        .subscribe((plan: any) => {
          this.redirect();
      });
    }
  }

  private redirect(): void {
    this.router.navigate(['/backup']);
  }

}
