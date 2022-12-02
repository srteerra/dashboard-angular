import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

import { Observable, Subject } from 'rxjs';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | any;
  public chartOptions!: Partial<any> | any;
  public chartOptionsPie!: Partial<any> | any;
  public chartOptionsLine!: Partial<any> | any;
  private productos$: Subject<any>;
  private cat: Array<any>;
  private productos: Array<any>;

  constructor(private firestoreService: FirestoreService) {
    this.productos$ = new Subject();
    this.cat = [];
    this.productos = [];
    this.chartOptions = {};
    this.chartOptionsPie = {};
    this.chartOptionsLine = {};
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
      const lastProductIndex = this.productos.findIndex(
        (product) => product.nombre === res.nombre
      );

      if (lastProductIndex !== -1) {
        this.productos[lastProductIndex] = res;
      } else {
        this.productos.push(res);
      }

      this.loadCharts();
    });
  }

  loadCharts() {
    console.log(this.productos);
    this.productos.map((product, index) => {
      this.chartOptions = {
        series: [
          {
            name: 'En Stock',
            data: this.productos.map((product, index) => {
              return product.cantidad;
            }),
          },
        ],
        chart: {
          height: 450,
          type: 'bar',
        },
        title: {
          text: 'Productos en existencia',
        },
        xaxis: {
          categories: this.productos.map((product, index) => {
            return product.nombre;
          }),
        },
      };

      this.chartOptionsPie = {
        series: this.productos.map((product, index) => {
          return product.pedidos;
        }),
        chart: {
          height: 450,
          type: 'donut',
        },
        title: {
          text: 'Productos por pedidos',
        },
        labels: this.productos.map((product, index) => {
          return product.nombre;
        }),
      };

      this.chartOptionsLine = {
        series: [
          {
            name: 'Series A',
            data: this.productos.map((product, index) => {
              return product.precio;
            }),
          },
        ],
        chart: {
          height: 450,
          type: 'line',
        },
        stroke: {
          width: [4, 4],
        },
        title: {
          text: 'Productos por precio',
        },
        plotOptions: {
          bar: {
            columnWidth: '20%',
          },
        },
        xaxis: {
          categories: this.productos.map((product, index) => {
            return product.nombre;
          }),
        },
      };
    });
  }
}
