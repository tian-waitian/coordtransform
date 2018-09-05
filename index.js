<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Hello, World</title>
    <style type="text/css">
        html{height:100%}
        body{height:90%;width:90%;margin:0px;padding:0px}
        #container{height:90%}
    </style>
    <!--引用百度地图的APi使用-->
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=QFi4I2CETTpbhR8GzGOoUDLB7ix20IXG"></script>
    <!--用于将手机获得的经纬度坐标转换为百度的-->
    <script type="text/javascript" src="./js/map.js"></script>

</head>

<body>
    <p id="demo">点击这个按钮，获得您的坐标：</p>
    <button onclick="getLocation()">试一下</button>
    <div id="container"></div>
    <script type="text/javascript">

        /*
            本来这个样子，手动指定坐标却失败了

        // 创建地图实例
        var map = new BMap.Map("container");
        // 创建默认点坐标，此坐标为北京天安门
        var point = new BMap.Point(116.404, 39.915);
        // 初始化地图，设置中心点坐标和地图级别15
        map.centerAndZoom(point, 15);
        */



        // 百度地图API功能
        //GPS坐标
        var x = 116.32715863448607;
        var y = 39.990912172420714;
        var ggPoint = new BMap.Point(x,y);

        //地图初始化
        var bm = new BMap.Map("container");
        bm.centerAndZoom(ggPoint, 15);
        bm.addControl(new BMap.NavigationControl());

        //添加gps marker和label
        var markergg = new BMap.Marker(ggPoint);
        bm.addOverlay(markergg); //添加GPS marker
        var labelgg = new BMap.Label("未转换的GPS坐标（错误）",{offset:new BMap.Size(20,-10)});
        markergg.setLabel(labelgg); //添加GPS label

        //坐标转换完之后的回调函数
        translateCallback = function (data){
          if(data.status === 0) {
            var marker = new BMap.Marker(data.points[0]);
            bm.addOverlay(marker);
            var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
            marker.setLabel(label); //添加百度label
            bm.setCenter(data.points[0]);
          }
        }

        /*

        本来这里构建，移入定位系统获取的数据中去
        setTimeout(function(){
            var convertor = new BMap.Convertor();
            var pointArr = [];
            pointArr.push(ggPoint);
            convertor.translate(pointArr, 1, 5, translateCallback)
        }, 1000);*/





        //以下为定位功能
        var x=document.getElementById("demo");
        //判断浏览器是否能够使用定位功能
        function getLocation(){
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(showPosition,showError);
            }else{
                x.innerHTML="Geolocation is not supported by this browser.";
            }
        }
        //定位使用成功则调用此方法
        function showPosition(position)
        {
            //调用成功获得经纬度
            x.innerHTML="Latitude: " + position.coords.latitude +
            "<br />Longitude: " + position.coords.longitude;

            //手机通过html5定位获取的经纬度
            var Longitude = position.coords.longitude; //经度
            var Latitude = position.coords.latitude;    //纬度



            //两秒后移动到当前定位位置
            var convertor = new BMap.Convertor();
            var pointArr = [];
            //确认经纬度
            ggPoint = new BMap.Point(Longitude,Latitude);
            //刷新地图？
            pointArr.push(ggPoint);
            convertor.translate(pointArr, 1, 5, translateCallback)
        }
        //定位功能使用失败
        function showError(error){
              switch(error.code)
              {
                case error.PERMISSION_DENIED:
                x.innerHTML="User denied the request for Geolocation."
                break;
                case error.POSITION_UNAVAILABLE:
                x.innerHTML="Location information is unavailable."
                break;
                case error.TIMEOUT:
                x.innerHTML="The request to get user location timed out."
                break;
                case error.UNKNOWN_ERROR:
                x.innerHTML="An unknown error occurred."
                break;
            }
        }

         /*

        需要导入 map.js,但是这个功能没有实现
        //国测局坐标(火星坐标,比如高德地图在用),百度坐标,wgs84坐标(谷歌国外以及绝大部分国外在线地图使用的坐标)
        //百度经纬度坐标转国测局坐标
        var bd09togcj02 = coordtransform.bd09togcj02(116.404, 39.915);
        //国测局坐标转百度经纬度坐标
        var gcj02tobd09 = coordtransform.gcj02tobd09(116.404, 39.915);
        //wgs84转国测局坐标
        var wgs84togcj02 = coordtransform.wgs84togcj02(116.404, 39.915);
        //国测局坐标转wgs84坐标
        var gcj02towgs84 = coordtransform.gcj02towgs84(116.404, 39.915);


        console.log(bd09togcj02);
        console.log(gcj02tobd09);
        console.log(wgs84togcj02);
        console.log(gcj02towgs84);
        //result
        //bd09togcj02:   [ 116.39762729119315, 39.90865673957631 ]
        //gcj02tobd09:   [ 116.41036949371029, 39.92133699351021 ]
        //wgs84togcj02:  [ 116.41024449916938, 39.91640428150164 ]
        //gcj02towgs84:  [ 116.39775550083061, 39.91359571849836 ]
        */
    </script>
</body>
</html>
