import Chart from '../node_modules/chart.js/src/chart';

export default class SimpleChart {

  constructor() {

    let amsterdamEL   = document.getElementById("amsterdam");
    let netherlandsEL = document.getElementById("netherlands");
    let usEL = document.getElementById("us");
    let allEL = document.getElementById("all");

    if (amsterdamEL) {
      let myChart = new Chart(amsterdamEL,{
        type: 'pie',
        data: {
          labels: [
            "Less than 1 year",
            "1 to 2 years",
            "3 to 5 years",
            "6 to 10 years",
            "More than 10 years",
          ],
          datasets: [
            {
              data: [7, 86, 340, 782, 674],
              backgroundColor: [
                "#d84b2a",
                "#ee9586",
                "#e4b7b2",
                "#9caf84",
                "#7aa25c"
              ],
              hoverBackgroundColor: [
                "#c73e1e",
                "#c73e1e",
                "#cf9d98",
                "#688b4d",
                "#688b4d"
              ]
            }]
        }
      });
    }

    if (netherlandsEL) {
      let myChart = new Chart(netherlandsEL,{
        type: 'pie',
        data: {
          labels: [
            "Less than 1 year",
            "1 to 2 years",
            "3 to 5 years",
            "6 to 10 years",
            "More than 10 years",
          ],
          datasets: [
            {
              data: [13, 118, 420, 974, 844],
              backgroundColor: [
                "#d84b2a",
                "#ee9586",
                "#e4b7b2",
                "#9caf84",
                "#7aa25c"
              ],
              hoverBackgroundColor: [
                "#c73e1e",
                "#c73e1e",
                "#cf9d98",
                "#688b4d",
                "#688b4d"
              ]
            }]
        }
      });
    }

    if (usEL) {
      let myChart = new Chart(usEL,{
        type: 'pie',
        data: {
          labels: [
            "Less than 1 year",
            "1 to 2 years",
            "3 to 5 years",
            "6 to 10 years",
            "More than 10 years",
          ],
          datasets: [
            {
              data: [10, 82, 288, 467, 370],
              backgroundColor: [
                "#d84b2a",
                "#ee9586",
                "#e4b7b2",
                "#9caf84",
                "#7aa25c"
              ],
              hoverBackgroundColor: [
                "#c73e1e",
                "#c73e1e",
                "#cf9d98",
                "#688b4d",
                "#688b4d"
              ]
            }]
        }
      });
    }

    if (allEL) {
      let myChart = new Chart(allEL,{
        type: 'pie',
        data: {
          labels: [
            "Less than 1 year",
            "1 to 2 years",
            "3 to 5 years",
            "6 to 10 years",
            "More than 10 years",
          ],
          datasets: [
            {
              data: [74, 484, 1827, 3715, 2506],
              backgroundColor: [
                "#d84b2a",
                "#ee9586",
                "#e4b7b2",
                "#9caf84",
                "#7aa25c"
              ],
              hoverBackgroundColor: [
                "#c73e1e",
                "#c73e1e",
                "#cf9d98",
                "#688b4d",
                "#688b4d"
              ]
            }]
        }
      });
    }

  }

}
