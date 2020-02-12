import { Component, AfterViewInit } from '@angular/core';
import { fabric } from 'fabric';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ng-fabric';

  canvas: fabric.Canvas;

  svgSrcUrl: SafeUrl = '';

  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas('canvas', { isDrawingMode: true });
    // this.canvas.freeDrawingBrush.width = 3;
  }

  clear() {
    this.canvas.clear();
  }

  toSVG() {
    const svgString = this.canvas.toSVG();
    console.log(svgString);

    const url = this.getSvgFromString( svgString );
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl( url );

    this.svgSrcUrl = sanitizedUrl ;
  }

  getSvgFromString(svgString): string {
    const blob = new Blob([svgString], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);

    return url;
  }

  onLineWidthChange(lineWidth: string) {
    this.canvas.freeDrawingBrush.width = parseInt(lineWidth, 10);
  }
}
