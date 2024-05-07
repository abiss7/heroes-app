import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListPageComponent } from './list-page.component';
import { HeroService } from '../../services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { EnumPublisher, IntHero } from '@interfaces/hero.interface';
import { SearchComponent } from '@components/search/search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from '@components/card/card.component';
import { HeroImagePipe } from '../../pipes/hero-image.pipe';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesModule } from '../../heroes.module';
import { HttpClientModule } from '@angular/common/http';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [
        ListPageComponent,
        SearchComponent,
        CardComponent,
        HeroImagePipe,
      ],
      imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HeroesModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes on initialization', () => {
    const mockHeroes: IntHero[] = [
      {
        id: 'dc-martian',
        superhero: 'Martian Manhunter',
        publisher: EnumPublisher.DCComics,
        alter_ego: 'J"onn J"onzz',
        first_appearance: 'Detective Comics #225',
        characters: 'Martian Manhunter',
      },
      {
        id: 'dc-robin',
        superhero: 'Robin/Nightwing',
        publisher: EnumPublisher.DCComics,
        alter_ego: 'Dick Grayson',
        first_appearance: 'Detective Comics #38',
        characters: 'Dick Grayson',
      },
    ];
    mockHeroService.getHeroes.and.returnValue(of(mockHeroes));

    fixture.detectChanges();

    expect(mockHeroService.getHeroes).toHaveBeenCalledWith(
      component.pagination
    );
    expect(component.heroes()).toEqual(mockHeroes);
  });
});
