// 创建地图实例 
var map = new BMap.Map("container2");
//鼠标滚轮改变大小
map.enableScrollWheelZoom(true);








var point0 = new BMap.Point(-118.31829,34.15497);
var marker0 = new BMap.Marker(point0);
map.addOverlay(marker0);
map.centerAndZoom(point0, 16);               // 初始化地图，设置中心点坐标和地图级别