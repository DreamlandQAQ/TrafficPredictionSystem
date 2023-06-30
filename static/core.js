//结果地图=中地图 预测地图=右地图 

var mid_map//结果地图
var right_map//预测地图
var dcrnn_map
var predict_result//stgcn预测结果
var predict_result_dcrnn//stgcn预测结果
var nodes_location//节点坐标
var real_result//实际情况
var comparison_map

window.onload = function () {
    // 创建中地图实例 
    mid_map = new BMap.Map("container1");
    //鼠标滚轮改变大小
    mid_map.enableScrollWheelZoom(true);


    // 创建地图实例 
    right_map = new BMap.Map("container2");
    //鼠标滚轮改变大小
    right_map.enableScrollWheelZoom(true);

    dcrnn_map = new BMap.Map("container3");
    dcrnn_map.enableScrollWheelZoom(true);


    // 初始化地图，设置中心点坐标和地图级别
    var point0 = new BMap.Point(-118.31829, 34.15497);
    mid_map.centerAndZoom(point0, 16);
    right_map.centerAndZoom(point0, 16);
    dcrnn_map.centerAndZoom(point0, 16);

    //34.14929, -118.23182
    //drawPointInPredictMap(-118.23182, 34.14929)
}

//通过经纬度描点结果地图
function drawPointInResultMap(lat, lon) {
    var point = new BMap.Point(lat, lon);
    var marker = new BMap.Marker(point);
    mid_map.addOverlay(marker);
}

//通过经纬度描点预测地图
function drawPointInPredictMap(lat, lon) {
    var point = new BMap.Point(lat, lon);
    var marker = new BMap.Marker(point);
    right_map.addOverlay(marker);
}

//通过经纬度描点结果地图,并根据拥挤度设置颜色 right_map
function drawPointInResultMapByCD(lat, lon, CrowdingDegree, id) {
    var point = new BMap.Point(lat, lon);

    var blueIcon = new BMap.Icon("../icons/blue_mark_20_27.png", new BMap.Size(20, 27), { "anchor": new BMap.Size(10, 27) });
    var greenIcon = new BMap.Icon("../icons/green_mark_19_28.png", new BMap.Size(19, 28), { "anchor": new BMap.Size(10, 28) });
    var pinkIcon = new BMap.Icon("../icons/pink_mark_19_27.png", new BMap.Size(19, 27), { "anchor": new BMap.Size(10, 27) });
    var purpleIcon = new BMap.Icon("../icons/purple_mark_18_27.png", new BMap.Size(18, 27), { "anchor": new BMap.Size(10, 27) });
    var redIcon = new BMap.Icon("../icons/red_mark_19_27.png", new BMap.Size(19, 27), { "anchor": new BMap.Size(10, 27) });
    var yellowIcon = new BMap.Icon("../icons/yellow_mark_19_27.png", new BMap.Size(19, 27), { "anchor": new BMap.Size(10, 27) });

    var icon;

    var cd = Math.abs(CrowdingDegree);

    if (cd >= 0 && cd < 1 / 3)
        icon = greenIcon;
    else if (cd >= 1 / 3 && cd < 2 / 3)
        icon = yellowIcon;
    else
        icon = redIcon;

    var marker = new BMap.Marker(point, { icon: icon });
    marker.addEventListener("click", function () {
        alert("id:" + id + "\n" + "经度:" + lon + "\n" + "纬度:" + lat + "\n" + "拥挤度:" + CrowdingDegree);


    });
    right_map.addOverlay(marker);
    //right_map.centerAndZoom(point, 16);

}

//通过经纬度描点预测地图,并根据拥挤度设置颜色
function drawPointInPredictMapByCD(lat, lon, CrowdingDegree, id) {
    var point = new BMap.Point(lat, lon);

    var blueIcon = new BMap.Icon("../icons/blue_mark_20_27.png", new BMap.Size(20, 27), { "anchor": new BMap.Size(10, 27) });
    var greenIcon = new BMap.Icon("../icons/green_mark_19_28.png", new BMap.Size(19, 28), { "anchor": new BMap.Size(10, 28) });
    var pinkIcon = new BMap.Icon("../icons/pink_mark_19_27.png", new BMap.Size(19, 27), { "anchor": new BMap.Size(10, 27) });
    var purpleIcon = new BMap.Icon("../icons/purple_mark_18_27.png", new BMap.Size(18, 27), { "anchor": new BMap.Size(10, 27) });
    var redIcon = new BMap.Icon("../icons/red_mark_19_27.png", new BMap.Size(19, 27), { "anchor": new BMap.Size(10, 27) });
    var yellowIcon = new BMap.Icon("../icons/yellow_mark_19_27.png", new BMap.Size(19, 27), { "anchor": new BMap.Size(10, 27) });

    var icon;

    var cd = Math.abs(CrowdingDegree);

    if (cd >= 0 && cd < 1 / 3)
        icon = greenIcon;
    else if (cd >= 1 / 3 && cd < 2 / 3)
        icon = yellowIcon;
    else
        icon = redIcon;

    var marker = new BMap.Marker(point, { icon: icon });
    marker.addEventListener("click", function () {
        alert("id:" + id + "\n" + "经度:" + lon + "\n" + "纬度:" + lat + "\n" + "拥挤度:" + CrowdingDegree);


    });
    mid_map.addOverlay(marker);
    //right_map.centerAndZoom(point, 16);
}

//通过经纬度描点预测地图,并根据拥挤度设置颜色
function drawPointInDCRNNMapByCD(lat, lon, CrowdingDegree, id) {
    var point = new BMap.Point(lat, lon);

    var blueIcon = new BMap.Icon("../icons/blue_mark_20_27.png", new BMap.Size(20, 27), { "anchor": new BMap.Size(10, 27) });
    var greenIcon = new BMap.Icon("../icons/green_mark_19_28.png", new BMap.Size(19, 28), { "anchor": new BMap.Size(10, 28) });
    var pinkIcon = new BMap.Icon("../icons/pink_mark_19_27.png", new BMap.Size(19, 27), { "anchor": new BMap.Size(10, 27) });
    var purpleIcon = new BMap.Icon("../icons/purple_mark_18_27.png", new BMap.Size(18, 27), { "anchor": new BMap.Size(10, 27) });
    var redIcon = new BMap.Icon("../icons/red_mark_19_27.png", new BMap.Size(19, 27), { "anchor": new BMap.Size(10, 27) });
    var yellowIcon = new BMap.Icon("../icons/yellow_mark_19_27.png", new BMap.Size(19, 27), { "anchor": new BMap.Size(10, 27) });

    var icon;

    var cd = Math.abs(CrowdingDegree);

    if (cd >= 0 && cd < 1 / 3)
        icon = greenIcon;
    else if (cd >= 1 / 3 && cd < 2 / 3)
        icon = yellowIcon;
    else
        icon = redIcon;

    var marker = new BMap.Marker(point, { icon: icon });
    marker.addEventListener("click", function () {
        alert("id:" + id + "\n" + "经度:" + lon + "\n" + "纬度:" + lat + "\n" + "拥挤度:" + CrowdingDegree);


    });
    dcrnn_map.addOverlay(marker);
    //right_map.centerAndZoom(point, 16);
}


//5分钟后按钮
function fiveMinButtonClick() {
    right_map.clearOverlays();
    mid_map.clearOverlays();
    //console.log(nodes_location);
    for (var i = 0; i < nodes_location.length; i++) {
        var CrowdingDegree = predict_result[0][i][0];
        var CrowdingDegree_dcrnn = predict_result_dcrnn[0][i][0];
        var realCrowdingDegree = Math.abs(real_result[i][0][0]);
        //console.log(real_result[i][0][0] + " " + real_result[i][0][1]);
        drawPointInResultMapByCD(nodes_location[i][1], nodes_location[i][0], CrowdingDegree, i);
        drawPointInPredictMapByCD(nodes_location[i][1], nodes_location[i][0], realCrowdingDegree, i);
        drawPointInDCRNNMapByCD(nodes_location[i][1], nodes_location[i][0], CrowdingDegree_dcrnn, i);
    }
    alert("done!");
}

//10分钟后按钮
function tenMinButtonClick() {
    right_map.clearOverlays();
    mid_map.clearOverlays();
    //console.log(nodes_location);
    for (var i = 0; i < nodes_location.length; i++) {
        var CrowdingDegree = predict_result[0][i][1];
        var CrowdingDegree_dcrnn = predict_result_dcrnn[0][i][1];
        var realCrowdingDegree = Math.abs(real_result[i][1][0]);
        //console.log(nodes_location[i][1] + " " + nodes_location[i][0]);
        drawPointInResultMapByCD(nodes_location[i][1], nodes_location[i][0], CrowdingDegree, i);
        drawPointInPredictMapByCD(nodes_location[i][1], nodes_location[i][0], realCrowdingDegree, i);
        drawPointInDCRNNMapByCD(nodes_location[i][1], nodes_location[i][0], CrowdingDegree_dcrnn, i);
    }
    alert("done!");
}

//15分钟后按钮
function fifteenMinButtonClick() {
    right_map.clearOverlays();
    mid_map.clearOverlays();
    //console.log(nodes_location);
    for (var i = 0; i < nodes_location.length; i++) {
        var CrowdingDegree = predict_result[0][i][2];
        var CrowdingDegree_dcrnn = predict_result_dcrnn[0][i][2];
        var realCrowdingDegree = Math.abs(real_result[i][2][0]);
        //console.log(nodes_location[i][1] + " " + nodes_location[i][0]);
        drawPointInResultMapByCD(nodes_location[i][1], nodes_location[i][0], CrowdingDegree, i);
        drawPointInPredictMapByCD(nodes_location[i][1], nodes_location[i][0], realCrowdingDegree, i);
        drawPointInDCRNNMapByCD(nodes_location[i][1], nodes_location[i][0], CrowdingDegree_dcrnn, i);
    }
    alert("done!");
}
//向后端传送用户的json文件
function getPredictResult(obj) {
    if (!obj.files[0]) {
        return;
    }

    var reader = new FileReader();
    reader.onload = async function (e) {
        var data = e.target.result;
        //console.log(data);
        var response = await fly.post('http://127.0.0.1:8080/stgcn', data);
        var response_dcrnn = await fly.post('http://127.0.0.1:8080/dcrnn', data);


        predict_result = await response.data.result;
        predict_result_dcrnn = await response_dcrnn.data.result;
        //console.log('predict_result' + await predict_result)
        var input_json = JSON.parse(data);
        nodes_location = input_json.cor;
        real_result = input_json.reality;
    }
    reader.readAsText(obj.files[0]);
}




function comparison_button() {
    var input_node = document.getElementById("getnodeid");

    var i = Number(input_node.value);
    
    comparison_map = new BMap.Map("container4");
    comparison_map.enableScrollWheelZoom(true);


    // 初始化地图，设置中心点坐标和地图级别
    var point = new BMap.Point(nodes_location[i][1], nodes_location[i][0]);
    comparison_map.centerAndZoom(point, 16);

    var blueIcon = new BMap.Icon("../icons/blue_mark_20_27.png", new BMap.Size(20, 27), { "anchor": new BMap.Size(10, 27) });


    var icon = blueIcon;




    var marker = new BMap.Marker(point, { icon: icon });
    marker.addEventListener("click", function () {
        alert("id:" + i + "\n" + "经度:" + nodes_location[i][0] + "\n" + "纬度:" + nodes_location[i][1] + "\n" + "实际拥挤度:" + real_result[i][0][0] + "\n" + "stgcn预测拥挤度:" + predict_result[0][i][0] + "\n" + "dcrnn预测拥挤度:" + predict_result_dcrnn[0][i][0]);

    });
    comparison_map.addOverlay(marker);


    var modelMAE = document.getElementById("modelMAE");
    var stgcn_MAE = 0;
    var dcrnn_MAE = 0;
    var nodes_num = 207;
    for (var k = 0; k < nodes_num; k++) {
        stgcn_MAE += Math.abs(real_result[k][0][0] - predict_result[0][k][0]);
    }
    stgcn_MAE = stgcn_MAE/nodes_num;
    for (var k = 0; k < nodes_num; k++) {
        dcrnn_MAE += Math.abs(real_result[k][0][0] - predict_result_dcrnn[0][k][0]);
    }
    dcrnn_MAE = dcrnn_MAE/nodes_num;

    modelMAE.value = "stgcn MAE: " + stgcn_MAE + "\n" + "dcrnn MAE: " + dcrnn_MAE;
}

