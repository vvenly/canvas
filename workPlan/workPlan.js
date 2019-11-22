var em=1;
window.bW=8;  //borderWidth
window.dataCanvas=$("#d3");window.bodyDiv=$("html");
window.cTop=40;

window.overX=235-dataCanvas.scrollLeft()-bodyDiv.scrollLeft();
window.overY=131-dataCanvas.scrollTop()-bodyDiv.scrollTop()+cTop;

window.checkLineType=1;//线别选择, 1上行线  0 下行线

window.planShowData=[]; //当前显示的数据

window.conflictData=[]; //冲突数据
window.configNew=[];

window.sub_data=[]; //修改后要传输的数据
window.postData=[];window.arrJd=0;  //修改的数据
window.postArr=[];

window.dwHeight=30;
window.dwMoM=2;



function ruleTransform(rid){
    var text="";

    switch(rid){
        case 1:
            text="作业类型冲突";
            break;
        case 2:
            text="行车区域控制";
            break;
        case 3:
            text="供电冲突";
            break;
        case 4:
            text="配合作业冲突";
            break;
    }

    return text;
}


window.stationData=[];  //车站数据

window.timeType=18;      //时间切换


window.nstaHtml="";

window.yesterdayStr=timeConvert(new Date(new Date().getTime() - 86400000));

function timeConvert(date) {
    var data3 = date;

    var y=data3.getFullYear(),
        month=data3.getMonth() + 1,
        m=month<10 ? "0"+month : month,
        d=(data3.getDate()<10) ? "0"+data3.getDate() : data3.getDate();

    var times=y + "-" +m + "-" +d;

    return times;
}

function staAjax() {
    $.ajax({
        // async:false,
        type: "GET",
        url: serIp2+"/interface/planData/stationAllInfo?metroLineId=8",
        dataType: "json",
        success: function (json) {
            
            if(json.code==200){

                stationData=json.data;

                var staL=stationData.length,  JdName="",cd;
                // stationData=stationDataS.data;  //本地测试数据

                if(stationData[staL-1].name=="11号线碧头末端"){
                    stationData.splice(staL-1,1);

                    // console.log(staL);
                    if(stationData[0].name=="11号线福田末端"){
                        stationData.splice(0,1);
                    }
                }
                

                // console.log(stationData);


                var height=0;

                var sHtml="",stationPx=[];   //车站选项框, 车站显示Y轴坐标

                for(var i=0;i<stationData.length;i++){
                    cd=stationData[i];

                    // sHtml+="<option value='" +cd.id+ "'>" +cd.name+"</option>";
                    
                    JdName=cd.name.slice(-1);

                    if(JdName=="B"){    //A端
                        height+=dwHeight;
                        
                    }else{  //B端或区间
                        height+=dwHeight*dwMoM;
                    }

                    stationPx.push(height);
                }

                var stationHeight=height + dwHeight*dwMoM;

                // console.log(height);

                // $("select.staHtml").html(sHtml).selectpicker("refresh");

                // console.log(stationPx);
                // console.log(stationData);

                drawMain.stationPx=stationPx;

                drawMain.Height=stationHeight;

                document.getElementById("backstageCtx").height =stationHeight;
                document.getElementById("configCtx").height =stationHeight;
                document.getElementById("dataCtx").height =stationHeight;
                document.getElementById("backstage7Ctx").height =stationHeight;
                document.getElementById("config7Ctx").height =stationHeight;
                document.getElementById("data7Ctx").height =stationHeight;
                

                drawMain.backstage('backstageCtx',stationPx);

                setTimeout(function () {
                    drawMain.backstage('backstage7Ctx',stationPx);  //第2个背景

                },1000)


                // $("#loading").css("display","none");
            }else{
                $("#loading").fadeIn(400);

                $("#load_alert").html("网络错误，<br/> 请刷新后重试");
            }

        },
        error: function () {
            console.log("请求失败");
        }
    })

}



function comJudgeStaPx(id){     //PointId 转成像素
    var py=0,arr=drawMain.stationPx;

    // console.log(arr);

    $.each(stationData,function(i,ds){
        if(id == ds.id){
            py= arr[i];
        }
    })

    return py;
}


function comStaPxJudge(val,arrType){
    var v=+val;

    var currentX;

    var index = 0; // 保存最接近数值在数组中的索引
    var d_value = Number.MAX_VALUE;
    for (var i=0,len=stationData.length;i<len;i++) {

        currentX=stationData[i].centerPix;
        var new_d_value = Math.abs(currentX - v);
        if (new_d_value <= d_value) {
            if (new_d_value === d_value && currentX < stationData[index].centerPix) {
                continue;
            }
            index = i;
            d_value = new_d_value;
        }
    }
    // console.log(stationData[index]);
    // var result=(arrType)?stationData[index].stationId: +stationData[index].centerPix;
    var result=0;
    if(!arrType){
        result= Number(stationData[index].centerPix);
    }else if(arrType==1){
        result=stationData[index].stationId;

    }else if(arrType==2){
        result=stationData[index].stationName;
    }

    return result // 返回最接近的数值
}

function timeLineCom(MoM,length){   //时间线
    var timeArr=[];

    for(var i=1;i<length;i++){ timeArr.push(i*MoM); }

    return timeArr;
}

window.timeEighteen=timeLineCom(11,145);

window.timeSeven=timeLineCom(37,43);

function timePxCom(st,et){

    var obj={"px1":0,"px2":0};

    var timeFrom="";   // x 0点  昨天18：00 
    var mom="";

    if(timeType == 18){
        timeFrom=yesterdayStr + " 18:00";
        mom= 1.1;
    }else{
        timeFrom=yesterdayStr + " 24:00";
        mom= 3.7;
    }

    
    // console.log("time1: "+ timeFrom +" s: "+st + " et: "+et);


    var px0=new Date(Date.parse(timeFrom.replace(/-/g, "/"))).getTime();   // x 0点  昨天18：00 

    var start=new Date(Date.parse(st.replace(/-/g, "/"))).getTime(), 
        end=new Date(Date.parse(et.replace(/-/g, "/"))).getTime();


        // console.log((start - px0)*0.000016 , end);

    

    obj.px1=Math.round((start - px0)*0.0000167 ) * mom ; obj.px2=Math.round((end - px0)*0.0000167 ) * mom;

    return obj;
}

window.lineData=[{"id":1,"trackLineName":"十一号线下行线","prefix":"DK","startMil":0,"endMil":51517},];
function lineAjax() {
    $.ajax({
        type: "GET",
        url: serIp2+"/interface/car/getLineList",
        dataType: "json",
        success: function (json) {
            if(json.code===0){
                lineData=json.data;
            }
        },
        error: function () {
            console.log("请求失败");
        }
    })
}



function weekInit(time) {
    var weekday = time.getDay();
    var c_word="";

    switch (weekday){
        case 1:
            c_word="一";
            break;
        case 2:
            c_word="二";
            break;
        case 3:
            c_word="三";
            break;
        case 4:
            c_word="四";
            break;
        case 5:
            c_word="五";
            break;
        case 6:
            c_word="六";
            break;
        case 0:
            c_word="天";
            break;
    }

    return c_word;
}

function timeInit() {

    var data3 = new Date();

    var time=timeConvert(data3);

    $("#timeKey").val(time);

    $("#weekDay").html(weekInit(data3));

}
timeInit();

function timeChange(type) {

    if(arrJd){
        $("#update-alert").modal("show");

        subData(0,'alertTBody');

        return;
    }

    var val=$("#timeKey").val();

    var time1=new Date(Date.parse(val.replace(/-/g, "/"))).getTime();       //当前时间戳

    if(type){   //明天
        time1+=86400000;

    }else{
        time1-=86400000;
    }

    var n_time=timeConvert(new Date(time1));


    yesterdayStr=timeConvert(new Date(time1 - 86400000));   //更新昨天日期

    // console.log("yesterdayStr : "+yesterdayStr);

    $("#timeKey").val(n_time);

    $("#weekDay").html(weekInit(new Date(time1)));

    planAjax();
}

function planAjax(line) {
    $("#loading").fadeIn(400);
    var timeVal=$("#timeKey").val();
    var type=($("#time18").prop("checked"))?"00":"01";
    // var lineType= (line) ? "&lineType=" + line.value : "";
    var lineType=  "",timeQuery={};

    if(type=="00"){   //18:00
        timeType=18;
        moveX=8;

        timeQuery={
            "startDate":yesterdayStr+" 18:00:00",
            "endDate":timeVal+" 18:00:00"
        }

        // timeQuery="startDate="+yesterdayStr+" 18:00"+"&endDate="+timeVal+" 18:00";

        $("#title7Main").fadeOut(500);
        $("#titleMain").fadeIn(500);

        drawMain.brushId="dataCtx";

        drawMain.canM=document.getElementById("dataCtx");

        dataCanvas=$("#d3");
        drawMain.configBrush="configCtx";  //冲突画板切换

    }else{  //7:00
        timeType=0;
        moveX=18;

        // timeQuery="startDate="+timeVal+" 00:00"+"&endDate="+timeVal+" 07:00";
        timeQuery={
            "startDate":timeVal+" 00:00:00",
            "endDate":timeVal+" 07:00:00"
        }

        $("#titleMain").fadeOut(500);
        $("#title7Main").fadeIn(500);

        drawMain.brushId="data7Ctx";

        drawMain.canM=document.getElementById("data7Ctx");

        dataCanvas=$("#d73");

        drawMain.configBrush="config7Ctx";  //冲突画板切换
    }


    $.ajax({
        type: "GET",
        // url: serIp2+"/interface/spaceTime/getPlanListBySpecifiedTimeRange?"+timeQuery+lineType,
        url: serIp2+"/interface/spaceTime/getPlanListBySpecifiedTimeRange",
        dataType: "json",
        data:timeQuery,
        success: function (json) {
            // console.log(json);
            if(json.code==200){
                
                // $("#myModal-change").hide();

                // $("#subBtn").prop("disabled",true); //批量修改按钮

                postData=[];arrJd=0;sub_data=[],configNew=[];    //清空之前修改过的数据

                arrJd=0;
                postData=[];

                // var workPlans=(json.data.workPlans)?json.data.workPlans:[];
                // planShowData=planDataSS.data;    //测试本地数据

                planShowData=json.data;

                window.conDS=[];window.conDX=[];

                // planShowData=arrSort(workPlans);


                var timePx={},configData=[],lineSX=0,lineS=0;lineX=0;
                $.each(planShowData,function(i,item){
                    item.pixY1=comJudgeStaPx(item.startEndPointId);
                    item.pixY2=comJudgeStaPx(item.endEndPointId);

                    //timeType

                    timePx=timePxCom(item.workStartDateTime,item.workEndDateTime);

                    item.pixX1=timePx.px1;
                    item.pixX2=timePx.px2;

                    // if(item.conflicts){         //冲突数据

                    //     item.conflicts[0].planWorkCode=item.planWorkCode;
                    //     configData.push(item.conflicts);   
                    //     // configData
                    
                    // }

                    if(item.lineType=="SX"){ lineSX++ }
                    else if(item.lineType=="S"){   lineS++ }
                    else if(item.lineType=="X"){   lineX++ }
                })

                var configNum=configData.length;
            
                $("#configNum").html(configNum);
                $("#line1typeNum").html(lineS);
                $("#line2typeNum").html(lineX);
                $("#line3typeNum").html(lineSX);
                // console.log(planShowData);

                //冲突数量大于0  背景闪烁
                // if(configNum>0){$("#configNum").parent().addClass("bgBlink")}
                // else{$("#configNum").parent().attr("class","showLabel")}

                checkLineType=(lineType==2)?1:0;


                drawMain.drawData();


                $("#loading").fadeOut(400);

                // drawMain.configInit();

            }else{

                $("#loading").fadeIn(400);

                $("#load_alert").html("网络错误，<br/> 请刷新后重试");
            }
        },
        error: function () {
            $("#loading").fadeIn(400);

            $("#load_alert").html("网络错误，<br/> 请刷新后重试");
        }
    })
}

function sevenHours(das) {
    var data=das;
    var x1,x2,arr=[];
    for(var i=0,len=data.length;i<len;i++){
        x1=Number(data[i].pixX1);
        x2=Number(data[i].pixX2);
        if(x2>396 && x1<858){
            // data[i].pixX1/=3.3636;
            // data[i].pixX2*=3.3636;
            arr.push(data[i]);
        }
    }

    return arr;
}

function arrSort(arr){
    var length=arr.length;
    var x1,x2,y1,y2;
    var width1=0,height1=0,sum1=0;

    var nx1,nx2,ny1,ny2;
    var width2=0,height2=0,sum2=0;

    for(var i=0; i<length; i++){
        arr[i].xz=0;
        if(i===length-1){break;}
        for(var j=i; j<length;j++){

            data1=arr[i];data2=arr[j];

            x1=(data1.pixX1<0)?0:data1.pixX1;
            x2=(data1.pixX2>1584)?1584:data1.pixX2;
            y1=data1.pixY1;
            y2=data1.pixY2;
            width1=x2-x1;
            height1=y2-y1;
            sum1=width1*height1;

            if(y1==y2){     //里程相同
                data1.pixY1= +data1.pixY1 -5;
                data1.pixY2= +data1.pixY2 +2;
            }


            nx1=(data2.pixX1<0)?0:data2.pixX1;
            nx2=(data2.pixX2>1584)?1584:data2.pixX2;
            ny1=data2.pixY1;
            ny2=data2.pixY2;
            width2=nx2-nx1;
            height2=ny2-ny1;
            sum2=width2*height2;

            if(sum1>sum2){
                min=arr[j];
                arr[j]=arr[i];
                arr[i]=min;
            }
        }
    }

    return arr
}

function lineShowName(num) {
    var lineName="";
    switch (num) {
        case "1":
            lineName="上下行线";
            break;
        case "2":
            lineName="上行线";
            break;
        case "3":
            lineName="下行线";
            break;
    }

    return lineName;
}

function timeFmt(v) {
    var timeN=v.substring(5,10)+" "+v.substring(11,16);

    return timeN;
}


var seli = -1;
var dx=0,dy=0;

window.moveX=8; //移动时间自动对齐
window.moveY=20;//移动里程自动对齐


// var divStatus=true;

var c_status=0;     //鼠标按下 1  抬起 0
window.changeStatus=0;     //选中状态

var descDiv1=$("#myModalDesc");

function SelectedShape(ctx, x, y,gapX,gapY) {

    // console.log(x, y);

    // return;

    var plan=planShowData;

    if(plan[seli]){if(seli !== -1){plan[seli].xz = 0;}}

    var brushCtx=drawMain.canM;

    var x1=0,x2=0,y1=0,y2=0;

    var pln=plan.length;

    for(var i=0;i<pln;i++) {
        x1=Number(plan[i].pixX1); x2=Number(plan[i].pixX2);
        y1=Number(plan[i].pixY1);  y2=Number(plan[i].pixY2);

        if(x > x1 && x < x2 && y >= y1 && y <= y2){

            c_status = 1;  seli = i;

            var cpl=plan[i];

            // console.log(cpl);
            if(changeStatus==1){  plan.splice(i,1);plan.splice(0,0,cpl); }

            // drawMain.drawData();

            // var brashParent=$("#"+drawMain.brushId).parent();

            dx=x-x1;
            dy=y-y1;

            // var staY1=0;

            arrJd=0;        //初次点击为0；

            // console.log(111);

            // console.log(x,y);

            descDiv1.show().css({ "left":x, "top":y })
            descDiv1.find("#s-plan-code").html(cpl.workCode);
            descDiv1.find("#s-plan-company").html(cpl.deptName);
            descDiv1.find("#s-plan-power").html(cpl.powerSupplyPlanStr);
            descDiv1.find("#s-plan-guardMeasure").html(cpl.guardMeasure);
            descDiv1.find("#s-plan-user").html(cpl.dutyUserInfo);
            descDiv1.find("#s-plan-type").html(cpl.workTypeCode);
            descDiv1.find("#s-plan-content").html(cpl.workContent);

            return;

        }
        else{

            resetDesc();
            // plan[i].xz = 0;

            // resetDesc();
        //     seli = -1;


        //     if(i===plan.length-1){
        //         // console.log(110);
        //         drawMain.drawData();

        //         // console.log(987);
        //         changeStatus=0;
        //         $("#myModal-change").hide();
        //         plan=arrSort(planShowData);

        //         brushCtx.onmousemove = null;
        //     }
        }
    };
}

function resetDesc(){
    // console.log(234);
    descDiv1.hide();
    descDiv1.find("#s-plan-code").html("");
    descDiv1.find("#s-plan-company").html("");
    descDiv1.find("#s-plan-power").html("");
    descDiv1.find("#s-plan-guardMeasure").html("");
    descDiv1.find("#s-plan-user").html("");
    descDiv1.find("#s-plan-type").html("");
    descDiv1.find("#s-plan-content").html("");
}

$("#dataCtx,#data7Ctx").mouseleave(function () {
    drawMain.canM.onmousemove = null;
    drawMain.canM.onmouseup = null;
});

window.mileageShow=function (num) {

    var currentNum=(num>=0)?num: Math.abs(num);

    var pointNum=currentNum%1000;
    var pointLength=pointNum.toString().split(".").length;

    var meter, km;

    meter=(pointLength>=2)?pointNum.toFixed(2):pointNum;km=Math.floor(currentNum/1000);

    if( meter>=10 && meter<100){
        meter="0"+meter;
    }else if(meter<10){
        meter="00"+meter;
    }

    if(num<0){
        return "DK -"+km+"+"+meter;
    }else{
        return "DK"+km+"+"+meter;
    }

};