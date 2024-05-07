export interface IntHero {
  id: string;
  superhero: string;
  publisher: EnumPublisher;
  alter_ego: string;
  first_appearance: string;
  characters: string;
  alt_img?: string;
}

export enum EnumPublisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}
