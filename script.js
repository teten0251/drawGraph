function drawChart() {

    let chartBox = document.getElementById("chartBox");
    chartBox.innerHTML = "";

    let canvas = document.createElement("canvas");
    canvas.id = "myChart";
    chartBox.appendChild(canvas);

    const text = document.getElementById("text").value,
        inputData = text.split('\n'),
        cleanData = inputData.filter(Boolean);

    if (!text) {
        return;
    }

    const graphType = document.getElementById("graphType").value;

    let formattedData = createKeyValue(cleanData),
        labels = Object.keys(formattedData);
    let chartData = [];
    for (let n = 0; n < labels.length; n++) {
        chartData.push(formattedData[labels[n]]);
    }
    const colors = createColors(chartData.length);
    let data, config, myChart;

    switch (graphType) {
        case "円グラフ":
            data = {
                labels: labels,
                datasets: [{
                    label: '出力',
                    data: chartData,
                    backgroundColor: colors,
                    hoverOffset: 4
                }]
            };
            config = {
                type: 'pie',
                data: data,
            };
            myChart = new Chart(
                document.getElementById('myChart'),
                config
            );
            break;
        case "棒グラフ":
            data = {
                labels: labels,
                datasets: [{
                    axis: 'y',
                    label: 'データ',
                    data: chartData,
                    fill: false,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            };
            config = {
                type: 'bar',
                data,
                options: {
                    indexAxis: 'y',
                }
            };
            myChart = new Chart(
                document.getElementById('myChart'),
                config
            );
            break;
        case "鶏頭図":
            data = {
                labels: labels,
                datasets: [{
                    label: 'データ',
                    data: chartData,
                    backgroundColor: colors
                }]
            };
            config = {
                type: 'polarArea',
                data: data,
                options: {}
            };
            myChart = new Chart(
                document.getElementById('myChart'),
                config
            );
            break;
    }
}

function createKeyValue(inputData) {
    let keyValueData = {};
    for (let n = 0; n < inputData.length; n++) {
        if (n === 0) {
            keyValueData[inputData[n]] = 1;
        } else {
            if (inputData[n] in keyValueData) {
                keyValueData[inputData[n]]++;
            } else {
                keyValueData[inputData[n]] = 1;
            }
        }
    }
    let array = Object.keys(keyValueData).map((k) => ({ key: k, value: keyValueData[k] }));
    array.sort((a, b) => b.value - a.value);
    let newKeyValueData = Object.assign({}, ...array.map((item) => ({
        [item.key]: item.value,
    })));
    return newKeyValueData;
}

function createColors(count) {
    let colors = [];
    for (let n = 0; n < count; n++) {
        colors.push("rgb("
            + getRandomIntInclusive(0, 255) + ","
            + getRandomIntInclusive(0, 255) + ","
            + getRandomIntInclusive(0, 255) + ")");
    }
    return colors;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}