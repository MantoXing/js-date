

window.onload = function(){
//main
(function(inputId){


/**
 * 定义全局变量
 * */ 
var __data = {//用于渲染的总数据
        list:[],//储存日历数据

    };
var __monthNum = 12;//获取几个月的数据 



var __year = '',
    __month = '',
    __day = '';
//调用方法集合
var __main = {
    //获取日历数据
    getDateList:function(){

        var today = new Date();//获取今天日期
        var year  = today.getFullYear();//获取今天年份
        var month = today.getMonth() + 1;//获取今天月份
        var day = today.getDate();//获取今天号
        var toweek = today.getDay();//获取今天星期
        __year = year;
        __month = month;
        __day = day;
        console.log(day)
        for(var j = 0;j<__monthNum;j++){
            if(month>12){
                month = 1;
                year = year + 1;
            }
            
            this.getEveryMonth(year,month);
            month++
        }
        var html = template.render('date-list-temp',__data)
        $('#calendar-date').html(html)
    },
    //获取每个月的数据
    getEveryMonth:function(year,month){
        //获取本月最后一天
        var monthend = new Date(year,month,0);
        var dayend = monthend.getDate();//获取本月最后一天
        var daystart = new Date(year,month-1,1);//本月第一天
        var tostartweek = daystart.getDay();//获取本月第一天星期
        var arr = {};
            arr.list = [];
            arr.year = year;
            arr.month = month;
        var obj = {
            isclick:false,//判断今天是否可以点击 fales为不能 true为可以
            year:'',
            month:'',
            day:'',
            week:'',
            weekCN:''

        }
        for(var k = 0;k < tostartweek;k++){
            arr.list.push(obj);
        }
        for(var i = 0;i < dayend;i++){
            var todayweek = new Date(year,month-1,i+1).getDay();//获取每一天星期
            arr.list.push(this.dealEveryDay(year,month,i,todayweek))

       }
      __data.list.push(arr)
       

    },
    //处理每一天的数据
    dealEveryDay:function(year,month,day,week){
        day = day+1;
        var weekCN = '';
        switch (week){
            case 0:
                weekCN = '日';
                break;
            case 1:
                weekCN = '一';
                break;
            case 2:
                weekCN = '二';
                break;
            case 3:
                weekCN = '三';
                break;
            case 4:
                weekCN = '四';
                break;
            case 5:
                weekCN = '五';
                break;
            default:
                weekCN = '六';
                break;
        }
        var istoday = false;
        var isclick = true;
        if(__year == year && __month == month && __day == day){
            istoday = true
        }
        
        if(year == __year && month == __month && __day > day){
            isclick = false;
        }
        /**
         * chaina
        */
        // if(month<10){
        //     month = '0' + month
        // }
        // if(day<10){
        //     day = '0' + day
        // }
        var obj = {
            isclick:isclick,//判断今天是否可以点击 fales为不能 true为可以
            year:year,
            month:month,
            day:day,
            week:week,
            weekCN:weekCN,
            istoday: istoday

        };
        return obj;

        
    },
    //获取指定日期
    getAssignDate:function(date,step){

    },
    //整理日期格式
    dateFormat:function(date, fmt){
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    	// 例子： 
    	// ns.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2014-01-06 08:09:04.423 
    	// ns.dateFormat(new Date(), "yyyy/M/d") ==> 2014/1/6 
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    dateaction:function(){//点击事件
        $('#calendar-date').on('click','ul li',function(){
            if($(this).hasClass('no-select')){
                return false;
            }
            $(this).closest('.calendar-date').find('li').removeClass('date-begin')
            $(this).addClass('date-begin');
            // 标签内部定义的
            var year = $(this).attr('data-year');
            var month = $(this).attr('data-month');
            var day = $(this).attr('data-day');
            //自定义input
            if(inputId){
                $('#'+inputId).val(year+'-'+month+'-'+day);
            }
            
        })
    }



}


__main.getDateList();
__main.dateaction();

})('inputId')


}

















