import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppService } from './app.service';
import { Pokemon, PokemonListDto, PokemonListItem } from './_core/models';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Keyboard, Mousewheel, Navigation, Pagination, Virtual } from "swiper";
import { map } from 'rxjs/operators';
import { MatSlider } from '@angular/material/slider';

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
  pokemonId: number = 1;

  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  @ViewChild('matSlider') matSlider: MatSlider;

  appendNumber = 150;
  prependNumber = 1;

  constructor(
    private appService: AppService,
    private cdr: ChangeDetectorRef
  ) {  }

  slideTo(step: number) {
    this.swiperRef.swiperRef.slideTo(this.swiperRef.swiperRef.activeIndex + step);
    this.cdr.detectChanges();
  }

  onSwiper(swiper) {
    this.cdr.detectChanges();
  }

  formatLabel(value: number) {
    if (value >= 150) {
      return 'N°' + Math.round(value);
    }
    return value;
  }

  ngOnInit (): void {
    this.getPokemons();
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
