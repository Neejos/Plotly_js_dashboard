
console.log(data)
window.onload = doStuff;

function doStuff() {
    var e = document.getElementById("guage");
    console.log(e);
};
//unpack function which gets the values for each keys within the data.sample object
function unpack(rows, key) {
    return rows.map(function(row) {
      return row[key]; 
    });
  }

var sample_value = unpack(data.samples,'sample_values')
var otu_ids = unpack(data.samples,'otu_ids')
var otu_labels = unpack(data.samples,'otu_labels')
var ids=unpack(data.samples,'id')


//map function is used to access each rows each array and
//slice method is used to get the top 10 found within each row and each of the 
// top 10 arrays are reversed to get the bars displayed in reverse order from low to high
var sliced_otu_ids=otu_ids.map(array =>
    array.slice(0,10).reverse())
// 

var sliced_otu_labels=otu_labels.map(array => 
    array.slice(0,10).reverse())

var sliced_sample_values=sample_value.map(array => 
      array.slice(0,10).reverse())

      // another way to do instead of using  unpack function
// var samplevalue=((data.samples).map(row =>row.sample_values));
// var sliced_samplevalue=samplevalue.map(row => row.slice(0,10).reverse());
// console.log(sliced_samplevalue);

// var otuids=((data.samples).map(row =>row.otu_ids));
// var sliced_otuids=otuids.map(row => row.slice(0,10).reverse());
// console.log(sliced_otuids);

// var otulabels =((data.samples).map(row =>row.otu_labels));
// var labelvalue=otulabels.map(row => row.slice(0,10).reverse());
// console.log(labelvalue);



// new_object object is created which will contain the keys and values to be plotted
var new_object={}
// var new_object1=[]

new_object.ids=ids
new_object.sliced_otu_ids=sliced_otu_ids;
new_object.sliced_sample_values=sliced_sample_values;
new_object.sliced_otu_labels=sliced_otu_labels;

 console.log("-------------------")
console.log(new_object);
// // Getting the keys of JavaScript Object. 
// Modified_Object = Object.keys(new_object)  
              
// // Sort and calling a method on 
// // keys on sorted fashion. 
// .sort().reduce(function(Obj, key) {  
          
//     // Adding the key-value pair to the 
//     // new object in sorted keys manner 
//     Obj[key] = new_object[key];  
//     console.log(obj) ;  
// }, {});




// To plot bar plot
function barPlots(id){
  var id_index=(new_object.ids).findIndex(element => parseInt(element)==id);
  // console.log(new_object.sliced_otu_ids[id_index])
  // console.log(id_index)
  var New_label=[]
  for (i=0;i<new_object.sliced_otu_ids[id_index].length;i++){
    
    var Labels=`OTU-${new_object.sliced_otu_ids[id_index][i]}` //'OTU' is added to individual elements within each otu_ids
    New_label.push(Labels)
  }
  new_object.ylabels=New_label
 console.log(new_object.ylabels)
  var trace={
    x: new_object.sliced_sample_values[id_index],
    y: new_object.ylabels,
    type: "bar",
    orientation: "h",
    
    text :new_object.sliced_otu_labels[id_index],
  };

    



  var bardata= [trace];

  var layout = {
    title: "Bacteria values/individual id",
    barmode: "array",
    // yaxis: {
    //   type: 'category',
    //   tickmode : "array",
    //   tickvals :new_object.ylabels,
    //   ticktext: new_object.ylabels
     

    // }  
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    },
  };
  Plotly.newPlot("bar", bardata, layout);

  // access the div element where the demographic data needs to be listed
  var Demo_list = d3.select("#sample-metadata");
  // clear the list
    Demo_list.html("");
  
          //  add the age,bbtype,...to the html 
        Demo_list.append("li").text(`AGE: ${data.metadata[id_index].age}`);
        Demo_list.append("li").text(`BBTYPE: ${data.metadata[id_index].bbtype}`);
        Demo_list.append("li").text(`ETHNICITY: ${data.metadata[id_index].ethnicity}`);
        Demo_list.append("li").text(`GENDER:${data.metadata[id_index].gender}`);
        Demo_list.append("li").text(`LOCATION: ${data.metadata[id_index].location}`);
        Demo_list.append("li").text(`WFREQ: ${data.metadata[id_index].wfreq}`);

};

var wfrequency=(data.metadata).map(element =>  element.wfreq);
console.log(wfrequency);



// To plot guage plot

function guagePlots(id){
  var id_index=(new_object.ids).findIndex(element => parseInt(element)==id);
  var wfreqNum=wfrequency[id_index]
  // Trig to calc meter point
  // var level=3.67
var degrees = 9-wfreqNum;
alert(degrees);
     radius = .5;
var radians = degrees * Math.PI / 9;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'category',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'WFrEq',
    text : wfreqNum,
    hoverinfo: 'text+name'},
  { values: [50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50],
    

    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6',
          '4-5', '3-4', '2-3', '1-2', '0-1' ,''],
    textinfo: 'text',
    textposition:'inside',      
    marker: {colors:['#ffab0f','#ffad14',
      '#ffb62e',
      '#ffbd42','#ffbf47',
      '#ffc252','#ffc861',
      '#ffcf75','#ffd17a','#FFFFFF']},
    hoverinfo: 'text',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Wash count per ID',
  height: 500,
  width: 600,
  xaxis: {type:'category',zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {type:'category',zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};



Plotly.newPlot("gauge", data, layout);

}; 


  //---------------------------------------------------------------------------------- 
//  // Trig to calc meter point
// var degrees = 180-(wfreqNum-1)*45;
// alert(degrees);
//      radius = .5;
// var radians = degrees * Math.PI / 180;
// var x = radius * Math.cos(radians);
// var y = radius * Math.sin(radians);

// // Path: may have to change to create a better triangle
// var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
//      pathX = String(x),
//      space = ' ',
//      pathY = String(y),
//      pathEnd = ' Z';
// var path = mainPath.concat(pathX,space,pathY,pathEnd);

// var guagedata = [{ type: 'category',
//    x: [0], y:[0],
//     marker: {size: 28, color:'850000'},
//     showlegend: false,
//     name: 'speed',
//     text: wfreqNum,
//     hoverinfo: 'text+name'},
//   { values: [50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50
//   rotation: 90,
  
//   text: ['0-1', '1-2', '2-3', '3-4',
//             '4-5','5-6','6-7','7-8','8-9','9-10',''],
//   textinfo: 'text',
//   textposition:'inside',      
//   marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
//                          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
//                          'rgba(210, 206, 145, .5)', 
//                          'rgba(255, 255, 255, 0)','rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
//                          'rgba(170, 202, 42, .5)']},
//   labels: ['0-1', '1-2', '2-3', '3-4',
//           '4-5','5-6','6-7','7-8','8-9','9-10',''],
//   hoverinfo: 'label',
//   hole: .5,
//   type: 'pie',
//   showlegend: false
// }];

// var guagelayout = {
//   shapes:[{
//       type: 'path',
//       path: path,
//       fillcolor: '850000',
//       line: {
//         color: '850000'
//       }
//     }],
//   title: 'Maturity Total Score 1-5',
//   height: 500,
//   width: 600,
//   xaxis: {type:'category',zeroline:false, showticklabels:false,
//              showgrid: false, range: [-1, 1]},
//   yaxis: {type:'category',zeroline:false, showticklabels:false,
//              showgrid: false, range: [-1, 1]}
// };

// Plotly.newPlot("guage", guagedata, guagelayout);

// };


function bubblePlots(id){
  var id_index=(new_object.ids).findIndex(element => parseInt(element)==id);
  var desired_maximum_marker_size = 60;
  var size = sample_value[id_index];
   console.log()
  var trace1 = {
    y: sample_value[id_index],
    x: otu_ids[id_index],
  // text: ['A</br>size: 40</br>sixeref: 1.25', 'B</br>size: 60</br>sixeref: 1.25', 'C</br>size: 80</br>sixeref: 1.25', 'D</br>size: 100</br>sixeref: 1.25'],
    mode: 'markers',
    marker: {
      
      color:[otu_ids[id_index]][0],  //array of ids which determines the color from the colorscale used for the bubbles
      colorscale: 'Viridis',  //range of colors used for the bubbles
      cmin: 0,    //miniumum sample_value
      cmax: 3500, // max samplevalue
      size: size, //array of sample_values used to calculate the size of bubbles
    //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
      sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),
      sizemode: 'area',
      
      opacity: [0.6],
      
      // showscale: true,  
    },
    text :`${ otu_ids[id_index]},${sample_value[id_index]}-
                ${otu_labels}`,
   
  };

    var data1 = [trace1]

  var layout1 = {
    title: 'Bubble Chart Size Scaling',
    showlegend: false,
    // height: 600,
    // width: 600
    xaxis: {
      title: {
        text: 'OTU-ID',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: 'green'
        }
      },
    },
    yaxis: {
      title: {
        text: 'Sample-values',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: 'green'
        }
      }
    }
  };

Plotly.newPlot("bubble", data1, layout1);
};

// create the function for the change event
function optionChanged(id) {
  // console.log(id);
  barPlots(id);
  // guagePlots(id);

  bubblePlots(id);
  guagePlots(id);

};




// create the function for the initial data rendering
function init() {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

  // read the data 
  // data.map((array)=> array.names);
  // console.log(names);
      // get the id data to the dropdwown menu
      (new_object.ids).forEach(function(name) {
      
        dropdown.append("option").text(name)
        // .property("value")
      });

      // call the functions to display the data and the plots to the page
      barPlots(data.names[0]);
      bubblePlots(data.names[0]);
      // guagePlots(data.names[0]);
      guagePlots(data.names[0]);
  
};

init();

