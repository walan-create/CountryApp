import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';
import { CountryListComponent } from "../country-list/country-list.component";

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  placeholder = input('Buscar');
  initialValue = input<string>();

  entrada = output<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '') //Se inicia con un valor computacional

  //Bloque de codigo para busqueda activa
  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue(); //Siempre que esta señal cambie angular va a disparar este efecto

    const timeout = setTimeout(() => {
      this.entrada.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  onSearch(value: string) {
    this.entrada.emit(value);
  }

 }
