import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../country/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';

@Component({
  selector: 'not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {

  location = inject(Location);

  goBack(){
    this.location.back();
  }
}

