import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { IntPagination } from '@interfaces/pagination.interface';
import { EnumPublisher, IntHero } from '@interfaces/hero.interface';
import { environments } from 'src/environments/environments';

describe('HeroService', () => {
  let heroService: HeroService;
  let httpMock: HttpTestingController;
  let baseUrl = environments.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    heroService = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('should fetch heroes', () => {
    const pagination: IntPagination = { startPage: 1, offset: 10 };
    const mockHeroes: IntHero[] = [
      {
        id: 'dc-batman',
        superhero: 'Batman',
        publisher: EnumPublisher.DCComics,
        alter_ego: 'Bruce Wayne',
        first_appearance: 'Detective Comics #27',
        characters: 'Bruce Wayne',
      },
      {
        id: 'dc-green',
        superhero: 'Green Lantern',
        publisher: EnumPublisher.DCComics,
        alter_ego: 'Alan Scott',
        first_appearance: 'All-American Comics #16',
        characters:
          'Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz',
        alt_img: undefined,
      },
    ];

    heroService.getHeroes(pagination).subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });

    const request = httpMock.expectOne(`${baseUrl}/heroes?_page=1&_limit=10`);
    expect(request.request.method).toBe('GET');
    request.flush(mockHeroes);
  });
});
