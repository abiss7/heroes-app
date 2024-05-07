import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
  computed,
  inject,
} from '@angular/core';
import { IntSidebarItem } from '../../interfaces';
import { APP } from '../../constants/app.constant';
import { LoadingService } from 'src/app/shared/services/laoding.service';

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

  ngAfterViewChecked(): void {
    this.detectChange.detectChanges();
  }
}
