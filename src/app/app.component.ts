import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from './app.service';
import { Pokemon, PokemonListDto, PokemonListItem } from './_core/models';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Keyboard, Mousewheel, Navigation, Pagination, Virtual } from "swiper";
import { map } from 'rxjs/operators';

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination, Navigation, Keyboard, Mousewheel, Virtual]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'app';
  pokemons: Pokemon[];
  pokemon: Pokemon;

  slides = Array.from({ length: 150 }).map((_, index) => `Slide ${index + 1}`);
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;

  appendNumber = 150;
  prependNumber = 1;

  prepend() {
    this.swiperRef.swiperRef.virtual.prependSlide([
      'Slide ' + --this.prependNumber,
      'Slide ' + --this.prependNumber,
    ]);
  }

  append() {
    this.swiperRef.swiperRef.virtual.appendSlide(
      'Slide ' + ++this.appendNumber
    );
  }

  slideTo(index: number) {
    this.swiperRef.swiperRef.slideTo(index - 1, 0);
  }

  constructor(
    private appService: AppService
  ) {  }

  ngOnInit (): void {
    // this.getPokemons();
  }

  getPokemons() : void {
    this.appService.getPokemons().subscribe(
      (pokemons) => {
        this.pokemons = pokemons;
      }
    );
  }

  clearItems(){
    this.pokemons = null;
  }

}
