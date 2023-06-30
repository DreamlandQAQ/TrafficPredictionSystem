var comparison_map


window.onload = function () {

    comparison_map = new BMap.Map("container1");
    comparison_map.enableScrollWheelZoom(true);


    // 初始化地图，设置中心点坐标和地图级别
    var point0 = new BMap.Point(-118.31829, 34.15497);
    comparison_map.centerAndZoom(point0, 16);
}

function comparison_button(){
    console.log(predict_result)
}