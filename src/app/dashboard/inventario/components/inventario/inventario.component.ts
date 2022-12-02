import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {
  private productos$: Subject<any>;
  public displayedColumns: string[];
  private cat: Array<any>;
  public dataSource: Array<any>;

  constructor(private firestoreService: FirestoreService) {
    this.productos$ = new Subject();
    this.cat = [];
    this.displayedColumns = ['id', 'precio', 'nombre', 'cantidad', 'pedidos'];
    this.dataSource = [];
  }

  getCategories$(): Observable<any> {
    return this.productos$.asObservable();
  }

  ngOnInit() {
    this.firestoreService.getCollections().subscribe((res) => {
      this.cat = res;
      this.cat.forEach((e) => {
        this.productos$.next(e);
      });
    });

    this.getCategories$().subscribe((res) => {
      const lastProductIndex = this.dataSource.findIndex(
        (product) => product.nombre === res.nombre
      );

      if (lastProductIndex !== -1) {
        this.dataSource[lastProductIndex] = res;
      } else {
        this.dataSource.push(res);
      }

      console.log(this.dataSource);
    });
  }
}
