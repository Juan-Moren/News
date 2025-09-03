import { Component } from '@angular/core';

@Component({
  selector: 'app-genesis',
  templateUrl: 'genesis.page.html',
  styleUrls: ['genesis.page.scss'],
  standalone: false,
})
export class GenesisPage {
  showSegment = false;
  segmentValue: string = 'profile';

  noticias = [
    { titulo: 'Noticia 1', descripcion: 'Contenido de la noticia 1...' },
    { titulo: 'Noticia 2', descripcion: 'Contenido de la noticia 2...' },
    { titulo: 'Noticia 3', descripcion: 'Contenido de la noticia 3...' }
  ];

  toggleSegment() {
    this.showSegment = !this.showSegment;
  }
}
