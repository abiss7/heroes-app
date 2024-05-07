/** Angular */
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
} from '@angular/core';

/** Constants */
import { APP } from '../../constants/app.constant';

/** Services */
import { LoadingService } from 'src/app/shared/services/laoding.service';

/** Interfaces */
import { IntSidebarItem } from '@interfaces/app.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent implements AfterViewChecked {
  public sidebarItems: IntSidebarItem[] = [
    {
      label: 'Listado',
      icon: 'label',
      url: `./${APP.PAGES.Root.children.List}`,
    },
    {
      label: 'Añadir',
      icon: 'add',
      url: `./${APP.PAGES.Root.children.NewHero}`,
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: `./${APP.PAGES.Root.children.SearchMenu}`,
    },
  ];

  private detectChange: ChangeDetectorRef = inject(ChangeDetectorRef);
  private loadingService: LoadingService = inject(LoadingService);

  showLoading = computed(() => {
    return this.loadingService.isLoading();
  });

  //#region -----------------------------------------------------> HOOKS

  ngAfterViewChecked(): void {
    this.detectChange.detectChanges();
  }

  //#endregion
}
