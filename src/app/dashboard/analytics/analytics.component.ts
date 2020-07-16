import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import { from } from 'rxjs';
import * as  ChartGeo from 'node_modules/chartjs-chart-geo';
import { SocketService } from 'src/app/services/socket.service';
import { templateJitUrl } from '@angular/compiler';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  mychart;
  pie_chart;
  world_map;
  constructor(private socket : SocketService) { }

  ngOnInit(): void {
        // creating the chart.js
        this.mychart = new Chart(document.getElementById("mychart"), {
          type: 'line',
          data: {
            labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
            datasets: [{ 
                data: [86,114,106,106,107,111,133,221,783,2478],
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
              }, { 
                data: [282,350,411,502,635,809,947,1402,3700,5267],
                label: "Asia",
                borderColor: "#8e5ea2",
                fill: false
              }, { 
                data: [168,170,178,190,203,276,408,547,675,734],
                label: "Europe",
                borderColor: "#3cba9f",
                fill: false
              }, { 
                data: [40,20,10,16,24,38,74,167,508,784],
                label: "Latin America",
                borderColor: "#e8c3b9",
                fill: false
              }, { 
                data: [6,3,2,2,7,26,82,172,312,433],
                label: "North America",
                borderColor: "#c45850",
                fill: false
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'World population per region (in millions)'
            }
          }
        });
    
        this.pie_chart = new Chart(document.getElementById("pie_chart"), {
          type: 'pie',
          data: {
            labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
            datasets: [{
              label: "Population (millions)",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: [2478,5267,734,784,433]
            }]
          },
          options: {
            title: {
              display: true,
              text: 'Predicted world population (millions) in 2050'
            }
          }
      });
    
      // world map
      fetch('https://unpkg.com/world-atlas/countries-110m.json').then((r) => r.json()).then((data) => {
        let canvas = document.getElementById('world_map') as
        HTMLCanvasElement;
        let context = canvas.getContext("2d");
        const countries = ChartGeo.topojson.feature(data, data.objects.countries).features;
        console.log(ChartGeo.topojson);
        
        // TODO additional
        let mycontrylist = [{counry: 'India',count:10},{counry:'South Korea',count:15},{counry:'Vietnam',count:8}];
        let display_list = [];
        countries.forEach(element => {
          let flag:any = {flag:false};
          mycontrylist.forEach((elem)=>{
            var temp = element.properties.name === elem.counry;
            // console.log(temp);
            if (temp) {
              let t2 = countries.find((d) => d.properties.name === elem.counry);
              flag = { feature: t2, flag:true, value:elem.count};
            }
          })
          if (flag.flag) {
            console.log(flag);   
            display_list.push({feature : flag.feature, value: flag.value})
          }
          else{
            display_list.push({feature: element, value: 0 })
          }
        });
        // console.log("contries",countries.map((d) => d.properties.name));
    
        this.world_map = new Chart(context, {
          type: 'choropleth',
          data: {
            labels: countries.map((d) => d.properties.name),
            datasets: [{
              label: 'Countries',
              // data: countries.map((d) => ({feature: d, value: Math.random()})),
              data: display_list,
            }]
          },
          options: {
            showOutline: true,
            showGraticule: true,
            legend: {
              display: false
            },
            scale: {
              projection: 'equalEarth'
            },
            geo: {
              colorScale: {
                display: true,
              },
            },
          }
        });
      });

      this.socket.listen('os').subscribe((data)=>{
        console.log("os data, ",data);
        this.mychart.data = data;
        this.mychart.update();
      })
  
      this.socket.listen('graph').subscribe((data)=>{
        console.log("data, ",data);
        this.mychart.data = data;
        this.mychart.update();
      })
  }
}
