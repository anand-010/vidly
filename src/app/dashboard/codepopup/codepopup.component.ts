import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-codepopup',
  templateUrl: './codepopup.component.html',
  styleUrls: ['./codepopup.component.css'],
})
export class CodepopupComponent implements OnInit {
  template: string;
  configuration:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // will log the entire data object
    console.log('from the popup', this.data);
    this.template = `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Vidly -${this.data.name}</title>
      <meta name="<description>" content="<The HTML5 video playback>">
      <meta name="<Your name>" content="<Site name>">
      <link rel="stylesheet" href="css/styles.css?v=1.0">
    </head>
    <body>
      <Video>
      </Video>
      <script src="js/vidly.js"></script>
    </body>
    </html>`;
    this.configuration = `
      var vidly = new Vidly('<selector eg Video>','${this.data.id}');
    `;
  }
}
