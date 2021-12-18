function drawChart() {
    const text = document.getElementById("text").value,
        inputData = text.split('\n'),
        cleanData = inputData.filter(Boolean);

    if (!text) {
        return;
    }

    let formattedData = createKeyValue(cleanData),
        labels = Object.keys(formattedData);
    let chartData = [];
    for (let n = 0; n < labels.length; n++) {
        chartData.push(formattedData[labels[n]]);
    }
    let colors = createColors(chartData.length);

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: chartData,
            backgroundColor: colors,
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'pie',
        data: data,
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function createKeyValue(inputData) {
    let keyValueData = {};
    for (let n = 0; n < inputData.length; n++) {
        if (n === 0) {
            keyValueData[inputData[n]] = 0;
        } else {
            if (inputData[n] in keyValueData) {
                keyValueData[inputData[n]]++;
            } else {
                keyValueData[inputData[n]] = 0;
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