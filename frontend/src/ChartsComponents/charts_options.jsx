// Base Options


let base_options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: null,
        gridLines: {
          drawBorder: false,
          color: null, // this changes
          zeroLineColor: "transparent"
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: null //Font color
        }
      }
    ],
    xAxes: [
      {
        barPercentage: null,
        gridLines: {
          drawBorder: false,
          color: null, // Another Color
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ]
  }
};


// Passed in the color of the grid lines
export function GetGraphOptions(type, color) {
  let line_color = null;
  let tick = null;
  if (color == "green") {
    line_color = "rgba(0,242,195,0.1)";
    tick ="#9e9e9e";
  } else if (color == "pink") {
    line_color = "rgba(225,78,202,0.1)";
    tick = "#9e9e9e";
  } else{
    line_color = "rgba(29,140,248,0.1)";
    tick = "#9a9a9a";
  }
  let new_options = base_options
  new_options["scales"]["xAxes"][0]["gridLines"]["color"] = line_color;
  new_options["scales"]["yAxes"][0]["ticks"]["fontColor"] = tick;
  new_options["scales"]["xAxes"][0]["ticks"]["fontColor"] = tick;

  // if (type == "line"){
  //   new_options["scales"]["xAxes"][0]["barPercentage"] = 1.6
  //   new_options["scales"]["yAxes"][0]["barPercentage"] = 1.6
  //   new_options["scales"]["yAxes"][0]["gridLines"]["color"] = "rgba(29,140,248,0.0)";
  // } else if (type == "bar"){
  //   new_options["scales"]["yAxes"][0]["gridLines"]["color"] = line_color;
  // }
  return new_options
}

//export default GetBarGraphOptions;
