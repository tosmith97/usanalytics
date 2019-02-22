
export function DataWrapper(dataX, dataY, color) {
  let line_color = null;
  let border_color = null;
  if (color == "green") {
    line_color = "rgba(0,242,195";
    border_color = "#00d6b4"
  } else if (color == "pink") {
    line_color = "rgba(225,78,202";
    border_color = "#d048b6"
  } else{
    line_color = "rgba(29,140,248";
    border_color = "#1f8ef1"
  }


  let data_fn =  canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, line_color + ",0.2)"); // this changes
      gradientStroke.addColorStop(0.4, line_color + ",0.0)"); // this changes
      gradientStroke.addColorStop(0, line_color + ",0)"); //this changes

    return {
      labels: dataX,
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: border_color,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: border_color,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: border_color,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: dataY
        }
      ]
    };
  }

  return data_fn
}
