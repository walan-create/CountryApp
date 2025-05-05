import { Routes } from '@angular/router';
import { HomePageComponent } from '../shared/pages/home-page/home-page.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [
  //De esta manera no hay acceso a /country simplemente pues te dirije a by-capital por defecto
  {
    path: '',
    component: CountryLayoutComponent, // Importacion tradicional
    children: [
      {
        path: 'by-region',
        component: ByRegionPageComponent,
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent,
      },
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: 'by/:code',
        component: CountryPageComponent,
      },
      {
        path: '**',
        redirectTo: 'by-region',
      },
    ],
  },
];

export default countryRoutes;
