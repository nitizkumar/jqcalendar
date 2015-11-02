$(document).ready(function(){
    $('.get_date').each(function(elem,i){
        create_table(this);
    });
    $(document).click(function(event){
        $('.dropdownMenu').hide();                  
    });
});
//===============================================================    
    function create_table(el){ 
        $(el).empty();
        var d= new Date();
        var month_name=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month=d.getMonth();
        var year=d.getFullYear();
        var first_Date= new Date(year,month,1);
        var first_day=first_Date.getDay();
        var day_name=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var days=new Date(year,month+1,0).getDate();
        $($(el).closest('.inputShell').find('.iconButton')).after($('#cal_tmpl').html());
        
//=====================================================================================
        
        $($(el).closest('.inputShell').find('.iconButton')).click(function(){
           var iconButton=$(el).closest('.inputShell').find('.iconButton');
            iconButton.children(".iconCalendar").animate({height:'14px', width:'14px', margin:'3px'}, function(){
                $(this).animate({height:'12px', width:'12px', margin:'6px'});
            });
            iconButton.siblings(".dropdownMenu").find('.totalCalendar').show();
            iconButton.siblings(".dropdownMenu").find('.totalMonths').hide();
            iconButton.siblings(".dropdownMenu").find('.totalYear').hide();
       
            // event.preventDefault();
            iconButton.siblings(".dropdownMenu").slideToggle();
            //$('.calendar_data').empty(); 
            getCalendar(el,days,first_day,year,month);
            //create_table(days,first_day);  
            event.stopPropagation();
        });  
        
//=======================================================================
        
        $($(el).closest('.inputShell')).on('click','.dt',function(event){ 
           // event.stopPropagation();
            var dt=$(el).closest('.inputShell').find(".dt");
            if(dt.hasClass('selected_dt')){
                dt.removeClass('selected_dt');
              $(event.currentTarget).addClass('selected_dt');
            }else{
               $(event.currentTarget).addClass('selected_dt');
            }
            var date=$('.selected_dt').text();
            var selected_date=date+ "/" + month_name[month]+"/"+ year;
            dt.closest('.inputShell').find(".get_date").val(selected_date);
            
            dt.removeClass('selected_dt');
        });
        
    //=======================================================================
        
        $($(el).closest('.inputShell')).on('click','.old_dt',function(event){ 
            var old_dt=$(el).closest('.inputShell').find(".old_dt");
            month-=1;
            if(month<0){
                month+=12;
                year-=1;
                //$(".switchCalendar").text(month_name[month]+ " " +year);
                days=new Date(year,month+1,0).getDate();
                first_day=new Date(year,month,1).getDay();
                date=old_dt.html();
                if(old_dt.hasClass('selected_dt')){
                    old_dt.removeClass('selected_dt');
                    $(event.currentTarget).addClass('selected_dt');
                }else{
                    $(event.currentTarget).addClass('selected_dt');
                }
                var date=$('.selected_dt').text();
                var selected_date=date+ "/" + month_name[month]+"/"+ year;
                old_dt.closest('.inputShell').find(".get_date").val(selected_date);
                getCalendar(el,days,first_day,year,month);

    //            $('.totalCalendar td').each(function(){
    //                alert($('.dt').text());
    //            });
    //            var table=$('.jQCompleteCalendar table tbody');
    //            table.find('tr').each(function(date){
    //                $(this).find('td').each(function(date){
    //                    alert($(this).html());
    //                })
    //            })
            }else{  
              //  $(".switchCalendar").text(month_name[month]+ " " + year);
                days=new Date(year,month+1,0).getDate();
                first_day=new Date(year,month,1).getDay();
                if(old_dt.hasClass('selected_dt')){
                    old_dt.removeClass('selected_dt');
                    $(event.currentTarget).addClass('selected_dt');
                }else{
                    $(event.currentTarget).addClass('selected_dt');
                }
                var date=$('.selected_dt').text();
                var selected_date=date+ "/" + month_name[month]+"/"+ year;
                old_dt.closest('.inputShell').find(".get_date").val(selected_date);
                getCalendar(el,days,first_day,year,month);
            }
        });
        
//=====================================================================
        
        $($(el).closest('.inputShell')).on('click','.new_dt',function(event){ 
            var new_dt=$(el).closest('.inputShell').find(".new_dt");
            month+=1;
            if(month>11){
                month-=12;
                year=parseInt(year+1);
                //$(".switchCalendar").text(month_name[month]+ " " + year);
                days=new Date(year,month+1,0).getDate();
                first_day=new Date(year,month,1).getDay();
                if(new_dt.hasClass('selected_dt')){
                    new_dt.removeClass('selected_dt');
                    $(event.currentTarget).addClass('selected_dt');
                }else{
                    $(event.currentTarget).addClass('selected_dt');
                }
                var date=$('.selected_dt').text();
                var selected_date=date+ "/" + month_name[month]+"/"+ year;
                new_dt.closest('.inputShell').find(".get_date").val(selected_date);
                getCalendar(el,days,first_day,year,month);
            }else{  
                //$(".switchCalendar").text(month_name[month]+ " " + year);
                days=new Date(year,month+1,0).getDate();
                first_day=new Date(year,month,1).getDay();
                if($('.dt').hasClass('selected_dt')){
                    new_dt.removeClass('selected_dt');
                    $(event.currentTarget).addClass('selected_dt');
                }else{
                    $(event.currentTarget).addClass('selected_dt');
                }
                var date=$('.selected_dt').text();
                var selected_date=date+ "/" + month_name[month]+"/"+ year;
                new_dt.closest('.inputShell').find(".get_date").val(selected_date);
                getCalendar(el,days,first_day,year,month);
            }
        });
        
//=========================================================================        
        $($(el).closest('.inputShell')).on('change','.get_date',function(event){ 
            var input_date=new Date($(el).val());
            var date=input_date.getDate();
            month=input_date.getMonth();
            year=input_date.getFullYear();
             //$(this).parents('.input').siblings('.dropdownMenu').find('.calendar_data').empty();
            //$(this).parents('.input').siblings('.dropdownMenu').find(".switchCalendar").text(month_name[month]+ " " +year);
            days=new Date(year,month+1,0).getDate();
            first_day=new Date(year,month,1).getDay();
            getCalendar(el,days,first_day,year,month);
            /*var dt_entered=$('td:nthchild(date)');
            $('.dt').addClass("selected_dt");
            $('td:nth-child(date)').addClass('selected_dt');*/
            $(el).closest('.input').siblings(".dropdownMenu").slideDown();
        });

//===============================================================================
        $($(el).closest('.inputShell').find(".prev")).click(function(event){ 
            event.stopPropagation();
            var prev=$(el).closest('.inputShell').find(".prev");
            month=month-1;
            if(month<0){
                month+=12;
                year= year-1;
                prev.parent('tr').parent('thead').siblings('.calendar_data').empty();
                prev.siblings(".switchCalendar").text(month_name[month]+ " " +year);
                days=new Date(year,month+1,0).getDate();
                first_day=new Date(year,month,1).getDay();
                getCalendar(el,days,first_day,year,month);
            }else{  
                prev.parent('tr').parent('thead').siblings('.calendar_data').empty();
                prev.siblings(".switchCalendar").text(month_name[month]+ " " + year);
                days=new Date(year,month+1,0).getDate();
                first_day=new Date(year,month,1).getDay();
                getCalendar(el,days,first_day,year,month);
            }
        });

//=====================================================================================
        $(el).closest('.inputShell').find(".next").click(function(event){
            event.stopPropagation();
            var next=$(el).closest('.inputShell').find(".next");
            month+=1;
            if(month>11){
                month-=12;
                year=parseInt(year+1);
                next.parent('tr').parent('thead').siblings('.calendar_data').empty();
                next.siblings(".switchCalendar").text(month_name[month]+ " " + year);
                days=new Date(year,month+1,0).getDate();
                first_day=new Date(year,month,1).getDay();
                getCalendar(el,days,first_day,year,month);        
            }else{
                next.parent('tr').parent('thead').siblings('.calendar_data').empty();
                next.siblings(".switchCalendar").text(month_name[month]+ " " + year);
                days=new Date(year,month+1,0).getDate();
                first_day=new Date(year,month,1).getDay();
                getCalendar(el,days,first_day,year,month);
            }
        });
//=================================================================================
        $(el).closest('.inputShell').find(".month").click(function(event){ 
            event.stopPropagation();
            var month=$(el).closest('.inputShell').find(".month");
            if(month.hasClass('selected_month')){
                month.removeClass('selected_month');
                $(event.currentTarget).addClass('selected_month');
            }else{
                $(event.currentTarget).addClass('selected_month');
            }
            var mon=$(".selected_month").text();
            var i;
            for(i=0;i<=11;i++){
                if(month_name[i]===mon){break;}
            }
            month.removeClass('selected_month');
            month=i;
            //$(this).closest('.jQCalendar').find(".switchCalendar").text(month_name[month]+ " " +year);
            days=new Date(year,month+1,0).getDate();
            first_day=new Date(year,month,1).getDay();
            getCalendar(el,days,first_day,year,month);
            $(this).closest(".totalMonths").hide();
            $(this).closest('.jQCalendar').find(".totalCalendar").show();
        });
        
//==========================================================================================

        $($(el).closest('.inputShell')).on('click','.years',function(event){        
            event.stopPropagation();
            var years=$(el).closest('.inputShell').find(".years");
            if(years.hasClass('selected_years')){
                years.removeClass('selected_years');
                $(event.currentTarget).addClass('selected_years');
            }else{
                $(event.currentTarget).addClass('selected_years');
            }
            year=parseInt($(".selected_years").html());
            years.closest('.jQCalendar').find(".switchMonth").html(year);
            $(this).closest('.jQCalendar').find(".totalMonths").show();
            $(this).closest(".totalYear").hide();
        });
        
//=========================================================================================

        $(el).closest('.inputShell').find(".prev_year").click(function(event){
            event.stopPropagation();
            year=year-10;
            create_year_table(el,year);
        });
//============================================= 
        $(el).closest('.inputShell').find(".next_year").click(function(event){
            event.stopPropagation();
            year=year+10;
            create_year_table(el,year);
        });
//=======================================================
        
        $(el).closest('.inputShell').find(".switchCalendar").click(function(event){
            event.stopPropagation();
            var switchCalendar=$(el).closest('.inputShell').find(".switchCalendar");
            //alert(event.isPropagationStopped());
            switchCalendar.closest(".totalCalendar").hide();
            switchCalendar.closest(".jQCompleteCalendar").find(".switchMonth").text(year);
            switchCalendar.closest(".jQCompleteCalendar").find('.totalMonths').css('display','block');
        });
        
//--------------------------------------------
        
        $(el).closest('.inputShell').find(".switchMonth").click(function(event){
            event.stopPropagation();
            var switchMonth=$(el).closest('.inputShell').find(".switchMonth");
            switchMonth.closest(".totalMonths").hide();
            switchMonth.closest(".jQCalendar").find(".totalYear").css('display','block');
            create_year_table(el,year);
        });

//=================================================================================================
        function create_year_table(el,year){ 
            var calYear= $(el).closest(".inputShell").find('.year_tbl_body');
            calYear.empty();
            var start=parseInt(year/10);
            start=parseInt(start*10);
            $($(el).closest('.inputShell').find(".switchYear")).text(start+"-"+parseInt(start+9));
            calYear.empty();
            calYear.append('<tr></tr>');
            for(var k=0;k<2;k++){
                calYear.append('<tr></tr>');
                for(var j=0;j<=4;j++){
                    calYear.find('tr:last').append('<td class="years">' + start + '</td>');
                    start++;
                }
            }
        };
    
    }
//=================================================================================================
    getCalendar= function(el,days,first_day,yyyy,mmm){
        var month_name=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
         //$($(el).closest('.inputShell').find(".switchCalendar")).empty();
        $($(el).closest('.inputShell').find(".switchCalendar")).text(month_name[mmm]+ " " + yyyy);
        var calDate= $(el).closest(".inputShell").find('.calendar_data');
        calDate.empty();
        calDate.append('<tr></tr>');
        var c;
        var count =1;
        var temp=new Date(yyyy,mmm,0).getDate();
        var pd=(temp+1)-first_day;
        var nd=1
        for(c=0;c<=6;c++){
            if(c<first_day){
                calDate.find('tr:last').append('<td class="old_dt">' + pd + '</td>');
                pd++;
            }else{
                calDate.find('tr:last').append('<td class="dt">' + count + '</td>');
                count++;
            }
        }
        for(var k=0;k<5;k++){
            calDate.append('<tr></tr>');
            for(var j=0;j<=6;j++){
                if(count<=days){
                    calDate.find('tr:last').append('<td class="dt">' + count + '</td>');
                    count++;
                }else{
                    calDate.find('tr:last').append('<td class="new_dt" >' + nd + '</td>'); 
                    nd++;
                }
            }
        }
    }

    

    