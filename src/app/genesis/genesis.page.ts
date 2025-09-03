import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/services/news/news'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-genesis',
  templateUrl: 'genesis.page.html',
  styleUrls: ['genesis.page.scss'],
  standalone: false,
})
export class GenesisPage implements OnInit {
  showSegment = false;
  segmentValue: string = 'general';
  noticias: any[] = [];
  categorias: string[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarNoticias();
  }

  cargarCategorias() {
    this.categorias = this.newsService.getValidCategories();
  }

  cargarNoticias() {
    this.isLoading = true;
    this.errorMessage = '';

    this.newsService.getNewsByCategory(this.segmentValue).subscribe({
      next: (data) => {
        this.noticias = data.articles || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
        this.errorMessage = 'Error al cargar noticias. Inténtalo de nuevo más tarde.';
        this.isLoading = false;
      }
    });
  }

  toggleSegment() {
    this.showSegment = !this.showSegment;
  }

  onCategoriaChange() {
    this.cargarNoticias();
  }

  refrescarNoticias(event: any) {
    this.cargarNoticias();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
