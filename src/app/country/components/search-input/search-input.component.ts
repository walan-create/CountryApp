import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CountryListComponent } from "../country-list/country-list.component";

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  placeholder = input('Buscar');
  entrada = output<string>();

  onSearch(value: string) {
    this.entrada.emit(value);
  }

 }
