var Globle = function(options) {
    var setting = {
        POST_DATA: 'POST',
        GET_DATA: 'GET',
        table: '',
        base_url: '/api/',
        API_USER_LOGIN: '/api/intraGetLogin/setLogin',
        API_USER_LOGIN_OUTLET: '/api/user/login_outlet',
        REQUEST_URL: null,
        TITEL: null,
        WIDTH: '50%',
        HEIGHT: 400,
        REQUEST_NEW_URL: null,
        FORM: 'FORM',
        IMG: null,
        DATA: {},
        SEARCH:'search',
    };
    var root = this;
    this.construct = function(options) {
        $.extend(setting, options);
    };
    root.JsGet_Data = function() {
        $.ajax({
            url: setting.API_USER_LOGIN + '/' + userID + '/' + password,
            type: setting.POST_DATA,
            dataType: "JSON",
            success: function(data) {
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    };
    this.outlet_login = function(userID, password, license) {
        root.loading('loadingRequest', '<p>Loading....</p>');
        $.ajax({
            url: setting.API_USER_LOGIN_OUTLET + '/' + userID + '/' + password + '?outlet=' + license,
            type: setting.POST_DATA,
            dataType: "JSON",
            success: function(data) {
                if (data.user_name !== undefined) {
                    //window.location.href='/web'
                    console.log(data);
                    if (data.outlet == "") {
                        window.location.href = '/web/index'
                    } else {
                        window.location.href = '/web/terminal/' + data.outlet
                    }
                } else {
                    $('#inputPassword').val('');
                    $('#inputPassword').css({
                        'border': '1px solid red',
                    });
                }
                $('#loadingRequest').dialog("close");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#inputPassword').val('');
                console.log(errorThrown);
            }
        });
    };
    this.login = function(userID, password, prop) {
        root.loading('loadingRequest', '<p>Loading....</p>');
        $.ajax({
            url: setting.API_USER_LOGIN,
            type: setting.POST_DATA,
            dataType: "JSON",
            data:{userid:userID,password:password,prop_id:prop},
            success: function(data) {
                if (data.user_name !== undefined) {
                    window.location.href = '/intra/admin'
                } else {
                    $('#inputPassword').val('');
                    $('#inputPassword').css({
                        'border': '1px solid red',
                    });
                    $('#access_prop').html(data.priorities);
                    $('#txtalert_login').show();
                }
                $('#loadingRequest').dialog("close");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#inputPassword').val('');
                console.log(errorThrown);
            }
        });

    };
    this.loadingRequest__=function (loadingRequest) {
        $( "#"+loadingRequest ).dialog({
            title:'titel',
            resizable: false,
            height:80,
            width: 200,
            borderRadius:30,
            modal: false,
            stack: true,
            sticky: true,
            overlay: "background-color: red; opacity: 0.5",
            buttons:{
                "Loading...": function() {
                },
            },
            open: function(e) {
                $(e.target).parent().css({
                    'background-color':'transparent',
                    'border-radius':20,
                    'border':0,
                });
                $('.ui-widget-content').css({
                    'border-radius':20
                });
            },
            create: function(event, ui) {
                $(event.target).parent().css('position', 'fixed');
            },
        });

        $(".ui-dialog-titlebar").hide();
        $('.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default, .ui-button, html .ui-button.ui-state-disabled:hover, html .ui-button.ui-state-disabled:active').css({
            'background-color':'transparent',
            'border':'none',
        });
        $('.ui-dialog-buttonpane').append('' +
            '' +
            '<img src="https://cdn.shopify.com/s/files/1/0178/0090/files/loader.gif" style="width: 40px"/> ' +
            '');
    }
    this.loadingRequest = function(loadingRequest, txt) {
        $('#' + loadingRequest).append(txt);
        $("#" + loadingRequest).dialog({
            title: 'titel',
            resizable: false,
            zIndex: 10000,
            autoOpen: true,
            height: 80,
            width: 200,
            borderRadius: 30,
            modal: true,
            stack: true,
            sticky: true,
            overlay: "background-color: red; opacity: 0.5",
            open: function(e) {
                $(this).parent().find(".ui-dialog-titlebar-close").hide();
                $(this).parent().find(".ui-dialog-titlebar ").hide();
                $(e.target).parent().css({
                    'background-color': 'transparent',
                    'border-radius': 20,
                    'border': 0,
                });
                $('.ui-widget-content').css({
                    'border-radius': 20
                });
            },
            create: function(event, ui) {
                $(event.target).parent().css('position', 'fixed');
            },
        });
        $(".ui-dialog-titlebar").hide();
        $('.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default, .ui-button, html .ui-button.ui-state-disabled:hover, html .ui-button.ui-state-disabled:active').css({
            'background-color': 'transparent',
            'border': 'none',
        });
        $('.ui-dialog-buttonpane').append('' +
            '' +
            '<img src="/assets/images/loading.gif" style="width: 40px"/> ' +
            '');
    };
    this.closeLoading = function() {
        $('#loadingRequest').dialog("close");
    };
    this.ChangeLanggue = function(code) {
        $.ajax({
            url: '/web/base/lang?set_lang=' + code,
            type: 'get',
            dataType: "JSON",
            error: function(XHR, Status, Thrown) {
                console.log(Thrown);
            },
            success: function(data) {
                location.reload();
            }
        });
    };
    this.loadRep=()=>{
        $("#loadingRequest ,.coverPage").css({
            display:'block'
        });
        $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            dataType: "json",
            async: false,
            data :{},
            success: function(obj) {
               if(obj.permite!==undefined){
                   console.log(obj.permite);

                    new toastr.error(obj.permite +", Please Contact to IT Support ","System Response");

               }
                jsondata = obj;
            }
        });
        setTimeout(function() {
            $("#loadingRequest ,.coverPage").css({display:'none'});
            }, 1500);
        return jsondata;
    };
    this.loadData = function() {
        this.loadingPage();
        $(".ui-dialog-titlebar").show();
        return $.ajax({
            url: setting.REQUEST_URL,
            async: false,
            type: setting.POST_DATA,
            dataType: "JSON",
            error: function(XHR, Status, Thrown) {
                console.log(Thrown);
            },
            success: function(data) {
                return data;
            }
        }).responseJSON;
    };
    this.PostRequest=function (form) {
        var formData = new FormData($('#' + form)[0]);
        this.loadingPage();
        $(".ui-dialog-titlebar").show();
        return $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            processData: false,
            secureuri: false,
            contentType: false,
            async: false,
            dataType: "JSON",
            error: function(XHR, Status, Thrown) {
                console.log(Thrown);
            },
            success: function(data) {
                console.log(data);
                return data;
            }

        }).responseJSON;
    };
    this.postData = function() {
        // root.loading('loadingRequest');
        $(".ui-dialog-titlebar").show();
        return $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            async: false,
            dataType: "JSON",
            data: setting.DATA,
            error: function(XHR, Status, Thrown) {
                console.log(Thrown);
            },
            success: function(data) {
                console.log(data);
                return data;
            }
        }).responseJSON;
    };
    this.loadDataById = function(id) {
        this.loadingPage();
        return $.ajax({
            url: setting.REQUEST_URL + id,
            async: false,
            type: setting.POST_DATA,
            dataType: "JSON",
            error: function() {},
            success: function(data) {
                return data;
            }
        }).responseJSON;
    };
    this.HttpRequest_Object=function (data) {
        return $.ajax({
            url: setting.REQUEST_URL,
            async: false,
            type: setting.POST_DATA,
            dataType: "JSON",
            data:data,
            error: function() {},
            success: function(data) {
                return data;
            }
        }).responseJSON;
    }
    this.sendData = function(form, exstends) {
        var formData = new FormData($('#' + form)[0]);
        return $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            processData: false,
            secureuri: false,
            contentType: false,
            async: false,
            dataType: "JSON",
            success: function(res) {
                return res.status;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        }).responseJSON;
    };

    this.frmSave=function(form){
        var formData = new FormData($('#' + form)[0]);
        return $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
           // dataType: "JSON",
            success: function(data) {
                if(data.permite!==undefined){
                    setTimeout(function() {
                        $("#loadingRequest ,.coverPage").css({display:'none'});
                    }, 100);
                    new toastr.error(data.permite +" !, Please Contact to Administrator","System Response");

                }
                $('.modal').modal('hide');
                $("#" + form)[0].reset();

                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        }).responseJSON;

    }
    this.save = function(form) {
        // root.loading('loadingRequest');
        var formData = new FormData($('#' + form)[0]);
        $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            processData: false,
            secureuri: false,
            contentType: false,
            dataType: "JSON",
            success: function() {

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        $("#" + form)[0].reset();
    };
    this.disable=function (id,status,attr){
        $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            data: {id:id,type:status},
            dataType: "JSON",
            success: function(data) {
                if(data.code==200){
                    $('#default-Modal').modal();
                }else if(data.code=="300"){
                    $('#default-Modal-error').modal();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }

        });
    };
    this.SaveformLog=function (form) {
        var formData = new FormData($('#' + form)[0]);
        if(data.permite!==undefined){
            $('.modal').hide();
            setTimeout(function() {
                $("#loadingRequest ,.coverPage").css({display:'none'});
            }, 100);
            new toastr.error(data.permite +", ! Please Contact to System Administrator ","System Response");
        }
        $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            processData: false,
            secureuri: false,
            contentType: false,
            dataType: "JSON",
            success: function(data) {

                if(data.code=='200'){
                   // new PNotify({title:'System Response ( ç³»ç»Ÿå“åº” ) ',text:' Successful ( æˆåŠŸåœ° ).',icon:'icofont icofont-info-circle',type:'success'});
                }else{
                   // new PNotify({title:'System Response ( ç³»ç»Ÿå“åº” )',text:'Record not any update (è®°å½•æœªæ›´æ–°) .',icon:'icofont icofont-info-circle',type:'error'});
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    };
    this.SearchFrm =function(from){
        var formData = new FormData($('#' + from)[0]);
        return $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            async: false,
            processData: false,
            secureuri: false,
            contentType: false,
            dataType: "JSON",
            success: function(data) {
                if(data.permite!==undefined){
                    setTimeout(function() {
                        $("#loadingRequest ,.coverPage").css({display:'none'});
                    }, 100);
                    new toastr.error(data.permite +" !, Please Contact to Administrator","System Response");
                }
                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        }).responseJSON;

    }
    this.fromSave=function(form){
        var formData = new FormData($('#' + form)[0]);
        return $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data;charset=utf-8',
            data: formData,
            cache: false,
            async: false,
            processData: false,
            secureuri: false,
            contentType: false,
            dataType: "JSON",
            success: function(data) {
                if(data.permite!==undefined){
                    setTimeout(function() {
                        $("#loadingRequest ,.coverPage").css({display:'none'});
                    }, 100);
                    new toastr.error(data.permite +" !, Please Contact to Administrator","System Response");
                }
                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        }).responseJSON;
    }
    this.Saveform=function (form) {

        var formData = new FormData($('#' + form)[0]);
        return $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data;charset=utf-8',
            data: formData,
            cache: false,
            async: false,
            processData: false,
            secureuri: false,
            contentType: false,
            dataType: "JSON",
            success: function(data) {
                console.log(data);
                if(data.permite!==undefined){
                    setTimeout(function() {
                        $("#loadingRequest ,.coverPage").css({display:'none'});
                    }, 100);
                    new toastr.error(data.permite +" !, Please Contact to Administrator","System Response");

                }
                $('.modal').modal('hide');
                $("#" + form)[0].reset();

                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        }).responseJSON;


    };
    this.SaveDataForm=function (form) {

        var formData = new FormData($('#' + form)[0]);
        return $.ajax({
            url: setting.REQUEST_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data;charset=utf-8',
            data: formData,
            cache: false,
            async: false,
            processData: false,
            secureuri: false,
            contentType: false,
            dataType: "JSON",
            beforeSend: function() {
                $('.form-control').removeClass('is-invalid');
                $(".select").each(function() {
                    $(this).siblings(".select2-container").css('border','');
                });
            },
            success: function(data) {
                $.each(data, function(key, value) {
                    if (value) {
                        $('#input-' + key).addClass('is-invalid');
                        $('#input-' + key).parents('.form-group').find('#error').html(value);

                        $('#input-' + key).each(function() {
                            $(this).siblings(".select2-container").css('border', '1px solid red');
                            $(this).siblings(".select2-container").css('border-radius', '5px');
                        });
                    }
                });
                $.each(data, function(key, value) {
                    $('.input-' + key).val(value);
                });
                // if(data.permite!==undefined){
                //     setTimeout(function() {
                //         $("#loadingRequest ,.coverPage").css({display:'none'});
                //     }, 100);
                //     new toastr.error(data.permite +" !, Please Contact to Administrator","System Response");

                // }
                if (data.status) {

                $('.modal').modal('hide');
                $("#" + form)[0].reset();
                }

                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        }).responseJSON;


    };

    this.updateForm = function() {
        var formData = new FormData($('#' + setting.FORM)[0]);
        console.log(formData);
        return $.ajax({
            url: setting.REQUEST_NEW_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            async: false,
            processData: false,
            secureuri: false,
            contentType: false,
            dataType: "JSON",
            success: function(data) {
                if(data.permite!==undefined){
                    new toastr.error(data.permite +"Please Contact to IT Support ","System Response");
                }
                $('.modal').modal('hide');
                $("form")[0].reset();
                $('#' + setting.FORM)[0].reset();
                setTimeout(function() {
                    $("#loadingRequest ,.coverPage").css({display:'none'});
                }, 1500);
                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        }).responseJSON;

    };

    this.update = function() {
        var formData = new FormData($('#' + setting.FORM)[0]);
        $('#dialog').dialog('close');
        this.loadingPage();
        $.ajax({
            url: setting.REQUEST_NEW_URL,
            type: setting.POST_DATA,
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            processData: false,
            secureuri: false,
            contentType: false,
            dataType: "JSON",
            success: function() {
                //$('#loadingRequest').dialog("close");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        $("form")[0].reset();
        $('#' + setting.FORM)[0].reset();
    };
    this.addnew = function(TITELs) {
        $('#dialog').removeClass('this-hide');
        $("#" + setting.FORM)[0].reset();
        $(function() {
            $("#dialog").dialog({
                width: setting.WIDTH,
                height: setting.HEIGHT,
                title: TITELs,
                show: { effect: 'fade', speed: 500 },
            });
        });
    };
    this.getedit = function(TITELs) {
        $('#dialog').removeClass('this-hide');
        $(function() {
            $("#dialog").dialog({
                width: setting.WIDTH,
                height: setting.HEIGHT,
                title: TITELs,
                modal: true,
                show: { effect: 'fade', speed: 100 },
            });
        });
    };
    this.readOnly=function (id){
        $.ajax({
            url: setting.REQUEST_URL + id,
            type: setting.POST_DATA,
            dataType: "JSON",
            success: function(data) {
                $.each(data, function(index, objValue) {
                    if(objValue.promo_img!==undefined){
                        $('#blah').attr('src','/lib/img/slide/'+objValue.promo_img)
                    }
                    $.each(objValue, function(i, vale) {
                        $('[name="' + i + '"]').val("");
                        $('[name="' + i + '"]').val(vale).change();
                        if($('input[name="'+i+'"]').is(':checkbox')){
                            if($('input[name="'+i+'"]').val(vale)){
                                $('input:checkbox').removeAttr('checked');
                                switch($('[name='+i+']').val()){
                                    case "1":
                                        $('input[name="'+i+'"]')[0].checked = true;
                                        break;
                                    case "2":
                                        $('input[name="'+i+'"]')[1].checked = true;
                                        break;
                                    case "3":
                                        $('input[name="'+i+'"]')[2].checked = true;
                                        break;
                                    case "4":
                                        $('input[name="'+i+'"]')[3].checked = true;
                                        break;
                                    case "5":
                                        $('input[name="'+i+'"]')[4].checked = true;
                                        break;
                                }
                            }
                        }
                        if (i == "comp_Comment") {
                            $('#txtComment').html(vale)
                        }
                        if(i=='comp_comments'){
                            $('#comp_comments').html(vale)
                        }
                        $('input[name="'+i+'"]').attr('disabled','disabled');
                        $('textarea[name="'+i+'"]').attr('disabled','disabled');

                    });
                });
                $('input[type="submit"]').attr('disabled','disabled');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    };
    this.Return=function (id) {
        return $.ajax({
            url: setting.REQUEST_URL + id,
            type: setting.POST_DATA,
            async: false,
            dataType: "JSON",
            data: setting.DATA,
            error: function(XHR, Status, Thrown) {
                console.log(Thrown);
            },
            success: function(data) {
                return data;
            }
        }).responseJSON;
    };
    this.CreateForm=(table_name,modal)=>{
       $.ajax({
            url: setting.REQUEST_URL + table_name,
            type: setting.POST_DATA,
            async: false,
            dataType: "JSON",
            data: setting.DATA,
            error: function(XHR, Status, Thrown) {
                console.log(Thrown);
            },
            success: function(data) {
                console.log(data)
            }
        });
    }
    this.ViewForReadInformationEmployee=function (id) {
        $.ajax({
            url: setting.REQUEST_URL + id,
            type: setting.POST_DATA,
            dataType: "JSON",
            success: function(data) {
                if(data)
                $.each(data, function(index, objValue) {
                    if(objValue.promo_img!==undefined){
                        $('#blah').attr('src','/lib/img/slide/'+objValue.promo_img)
                    }
                    if(objValue.emp_photo!==undefined){
                        $('#emp_photo').attr('src','http://10.62.0.67/assets/images/photo/'+objValue.emp_photo)
                    }
                    if ($("#blah").length){
                        if(objValue.emp_img!==undefined){
                            if ($("#blah").length){
                                if(objValue.emp_img!==undefined){
                                    $("#blah").attr('src','/assets/empdocs/'+ objValue.emp_img);
                                }else{
                                    $("#blah").attr('src','/assets/empdocs/avatar-profile-picture.jpeg');
                                }
                            }
                        }
                    }
                    $.each(objValue, function(i, vale) {
                        // $('[name="' + i + '"]').val("");
                        $('[name="' + i + '"]').val(vale)

                    });
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    this.View=function (id) {
        $.ajax({
            url: setting.REQUEST_URL + id,
            type: setting.POST_DATA,
            dataType: "JSON",
            success: function(data) {
                if(data.permite!==undefined){
                    $('.modal').hide();
                    setTimeout(function() {
                        $("#loadingRequest ,.coverPage").css({display:'none'});
                    }, 100);
                    new toastr.error(data.permite +", ! Please Contact to IT Support ","System Response");
                }
                if(data.log!==undefined){
                    $('#list_user_comment'+id).empty();
                    $.each(data.log, function(i, r) {

                        if(r.log_by=='undefined'){
                            $('#smg'+id).remove();
                        }
                        $('#list_user_comment'+id).append('' +
                            '<p> By :'+r. log_by+'</p>' +
                            '<span> On :'+r. log_date+'</span>'+
                            '<p>'+r. log_text+'</p> <hr/>')
                    });
                    $('#list_user_comment').empty();
                    $.each(data.log, function(i, r) {
                        if(r.log_by=='undefined'){
                            $('#smg'+id).remove();
                        }
                        $('#list_user_comment').append('' +
                            '<p> By :'+r. log_by+'</p>' +
                            '<span> On :'+r. log_date+'</span>'+
                            '<p>'+r. log_text+'</p> <hr/>')
                    });
                }else{
                  //  console.log(id);
                }

                $.each(data, function(index, objValue) {
                    if(objValue.promo_img!==undefined){
                        $('#blah').attr('src','/lib/img/slide/'+objValue.promo_img)
                    }
                    if(objValue.emp_photo!==undefined){
                        $('#emp_photo').attr('src','http://10.62.0.67/assets/images/photo/'+objValue.emp_photo)
                    }
                    if ($("#blah").length){
                        if(objValue.emp_img!==undefined){
                            if ($("#blah").length){
                                if(objValue.emp_img!==undefined){
                                    $("#blah").attr('src','/assets/empdocs/'+ objValue.emp_img);
                                }else{
                                    $("#blah").attr('src','/assets/empdocs/avatar-profile-picture.jpeg');
                                 }
                             }
                        }
                    }
                    if($("#blah_items").length){
                      //  console.log(objValue.img_src)
                        if(objValue.img_src!==undefined){

                           if(objValue.img_src!==""){
                                 $("#blah_items").attr('src','/assets/items/'+ objValue.img_src);
                            }else{
                                $("#blah_items").attr('src','/assets/img/no_food_img.jpeg');
                            }
                        }
                         if(objValue.items_image!==undefined){

                           if(objValue.items_image!==""){
                                 $("#blah_items").attr('src','/assets/items/'+ objValue.items_image);
                            }else{
                                $("#blah_items").attr('src','/assets/img/no_food_img.jpeg');
                            }
                        }

                    }
                    $.each(objValue, function(i, vale) {
                       // $('[name="' + i + '"]').val("");
                        $('[name="' + i + '"]').val(vale).change();
                        if($('input[name="'+i+'"]').is(':checkbox')){
                            $('input[name="'+i+'"]')[0].checked = false;
                            if($('input[name="'+i+'"]').val(vale)){
                                $('input:checkbox').removeAttr('checked');
                                switch($('[name='+i+']').val()){
                                    case "Yes":
                                        $('input[name="'+i+'"]')[0].checked = true;
                                        break;
                                    case "0":
                                            $('input[name="'+i+'"]')[0].checked = false;
                                            break;
                                    case "1":
                                        $('input[name="'+i+'"]')[0].checked = true;
                                        break;
                                    case "2":
                                        $('input[name="'+i+'"]')[1].checked = true;
                                        break;
                                    case "3":
                                        $('input[name="'+i+'"]')[2].checked = true;
                                        break;
                                    case "4":
                                        $('input[name="'+i+'"]')[3].checked = true;
                                        break;
                                    case "5":
                                        $('input[name="'+i+'"]')[4].checked = true;
                                        break;
                                    case "YES":
                                        $('input[name="'+i+'"]')[0].checked = true;
                                        break;
                                    case "buyer":
                                        $('input[name="'+i+'"]')[0].checked = true;
                                        break;
                                    case "guarantor":
                                        $('input[name="'+i+'"]')[0].checked = true;
                                        break;
                                }
                               // console.log(vale)
                            }
                        }
                        if($('input[name="'+i+'"]').is(':radio')) {
                            switch($('[name='+i+']').val()){
                                case "agent":

                                    $('input[name="'+i+'"]').prop('checked', true);
                                    break;
                                case "buyer":
                                    $('input[name="'+i+'"]').prop('checked', true);
                                    break;
                                case "guarantor":
                                    $('input[name="'+i+'"]').prop('checked', true);
                                    break;
                            }
                        }

                        if (i == "comp_Comment") {
                            $('#txtComment').html(vale)
                        }
                        if(i=='comp_comments'){
                            $('#comp_comments').html(vale)
                        }
                        $('input[name="'+i+'"]').attr('disabled',false);
                        $('textarea[name="'+i+'"]').attr('disabled',false);
                    });
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    };
    this.callExitFiledName=function (id){
        $("#frm_update_factor")[0].reset();
        $.ajax({
            url: setting.REQUEST_URL + id,
            type: setting.POST_DATA,
            dataType: "JSON",
            success: function(data) {
                $.each(data, function(index, objValue) {
                    $.each(objValue, function(i, vale) {
                       /* $('[name="' + i + '"]').val("");
                        $('[name="' + i + '"]').val(vale).change();*/

                        if($('input[name="'+i+'"]').is(':radio')) {

                            switch (vale) {
                                case "1":
                                    $("#" + i + "1").prop("checked", true);
                                    $("#" + i + "11").prop("checked", true);
                                    break;
                                case "2":
                                    $("#" + i + "2").prop("checked", true);
                                    $("#" + i + "12").prop("checked", true);
                                    break;
                                case "3":
                                    $("#" + i + "3").prop("checked", true);
                                    $("#" + i + "13").prop("checked", true);
                                    break;
                                case "4":
                                    $("#" + i + "4").prop("checked", true);
                                    $("#" + i + "14").prop("checked", true);
                                    break;
                                case "5":
                                    $("#" + i + "5").prop("checked", true);
                                    $("#" + i + "15").prop("checked", true);
                                    break;
                            }

                        }else{
                            $('[name="' + i + '"]').val("");
                            $('[name="' + i + '"]').val(vale).change();
                        }
                        if (i == "comp_Comment") {
                            $('#txtComment').html(vale)
                        }
                        if(i=='comp_comments'){
                            $('#comp_comments').html(vale)
                        }
                        $('input[name="'+i+'"]').attr('disabled',false);
                        $('textarea[name="'+i+'"]').attr('disabled',false);
                    });
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    };
    this.edit = function(id) {
        if (id !== 0)
            $.ajax({
                url: setting.REQUEST_URL + id,
                type: setting.POST_DATA,
                dataType: "JSON",
                success: function(data) {
                    $.each(data, function(index, objValue) {
                        $.each(objValue, function(i, vale) {
                            $('[name="' + i + '"]').val(vale).change();
                            if (i == "emp_photo") {
                                console.log(vale);
                                photo.setAttribute('src', '/assets/images/photo/' + vale);
                                imgCapture.val(vale);
                            }
                            if(i=='promo_img'){
                               $('#blah').attr('src','/lib/img/slide/'+vale)
                            }
                        });
                    });
                    root.getedit(setting.TITEL);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        $('#form').submit(function(e) {
            e.preventDefault();
            root.update();
        });
    };

    this.copy = function(id, PrimaryName, TITELs) {
        if (id !== 0)
            $.ajax({
                url: setting.REQUEST_URL + id,
                type: setting.POST_DATA,
                dataType: "JSON",
                success: function(data) {
                    $.each(data, function(index, objValue) {
                        $.each(objValue, function(i, vale) {
                            $('[name="' + i + '"]').val(vale).change();
                        });
                    });
                    $('[name="' + PrimaryName + '"]').val('');
                    root.getedit(TITELs);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    };
    this.Toselect2 = function(URLs, SelectName,valueSelected) {
        $.ajax({
            url: URLs,
            type: "GET",
            dataType: "JSON",
            success: function(data) {
                $('select[name=' + SelectName + ']').empty();
                $('select[name=' + SelectName + ']').append('<option value="">Find</option>');
                $.each(data, function(index, e) {
                    if(e.id==valueSelected){
                        $('select[name=' + SelectName + ']').append('<option value="' + e.id + '" selected>' + e.name + '</option>');
                    }else{
                    $('select[name=' + SelectName + ']').append('<option value="' + e.id + '">' + e.name + '</option>');
                    }
                    $('select[name=' + SelectName + ']').select2({

                        theme: 'classic',

                    });
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, errorThrown);
            }
        });
    };
    this.Toselect2_lg = function(URLs, SelectName,valueSelected) {
        $.ajax({
            url: URLs,
            type: "GET",
            dataType: "JSON",
            success: function(data) {
                $('select[name=' + SelectName + ']').empty();

                $('select[name=' + SelectName + ']').append('<option value="" style="min-width:150px">Find</option>');
                $.each(data, function(index, e) {
                    if(e.id==valueSelected){
                        $('select[name=' + SelectName + ']').append('<option value="' + e.id + '" selected>' + e.name + '</option>');
                    }else{
                    $('select[name=' + SelectName + ']').append('<option value="' + e.id + '">' + e.name + '</option>');
                    }
                    $('select[name=' + SelectName + ']').select2({ width: '100%'});
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, errorThrown);
            }
        });
    };

    this.Toselect = function(URLs, SelectName,valueSelected) {
        //var defult='<?php  echo $this->lang->line('Please_Select') ?>';
        $.ajax({
            url: URLs,
            type: "GET",
            dataType: "JSON",
            success: function(data) {
                //$('select[name=' + SelectName + ']').empty();
               // $('select[name=' + SelectName + ']').append('<option selected >Select</option>');
                $.each(data, function(index, e) {
                     if(e.id==valueSelected){
                        $('select[name=' + SelectName + ']').append('<option value="' + e.id + '" selected>' + e.name + '</option>');
                    }else{
                        $('select[name=' + SelectName + ']').append('<option value="' + e.id + '">' + e.name + '</option>');
                    }


                })

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, errorThrown);
            }
        });
    };

    this.Delete = function(ID) {
        alert(ID);
    };
    this.Opendialog = function(dialogs, WIDTH, HEIGHT, TITELs) {
        $("#" + dialogs).dialog({
            width: WIDTH,
            height: HEIGHT,
            title: TITELs,
            show: { effect: 'fade', speed: 500 },
        });
    };
    this.loadingPage = function() {
        var customElement = $("<div>", {
            "css": {
                "border": "2px dashed gold",
                "font-size": "17px",
                "text-align": "center",
                "padding": "10px"
            },
            "class": "x-window-default",
            "text": "Loading... "
        });

    };
    this.CreateDataTable = function(table, cols = [], title,childs=[]) {
        var default_name = table;
        var oDT = $("#" + table).DataTable({
            "bDestroy": true,
            "processing": false,
            "jQueryUI": true,
            "aoColumns": cols,
            "lengthChange": true,
            "lengthMenu": [[25, 50, 100, 500, 1000],[25, 50, 100, 500, "Max"]],
            "pageLength": 10,
            "bSort": true,
            "bFilter": true,
            "oLanguage": {
                "oPaginate": {
                "sFirst":first_page, // This is the link to the first page
                "sPrevious": previous_page, // This is the link to the previous page
                "sNext": next_page, // This is the link to the next page
                "sLast": last_page, // This is the link to the last page

                },
                "sLengthMenu": displays_+" _MENU_ "+records_,
                "sSearch": search
            },
            "language": {
                "zeroRecords":not_records_found,
                "info": pages_+" _PAGE_ "+ofs_+" _PAGES_"+" Total = _TOTAL_ ",
                "infoEmpty": displays_+"=>"+not_records_found,
                "infoFiltered": "("+filtered_from+" _MAX_ "+total_records+")"

            },
            "columnDefs": [{
                "targets": [0], //first column / numbering column
                "orderable": false //set not orderable
            }],
            dom: 'Blfrtip',
            order: [[ 1, "asc" ]],
            buttons: [

                {

                    extend: 'print',
                    text: '<i class="fa fa-print"></i> '+prints_,
                    "className": 'btn x-window-default  btn-sm',
                    messageTop: function () {
                            return title==null? '':title;
                    },
                    customize: function ( win ) {
                        $(win.document.body).children("h1:first").remove();
                    }
                },
                {
                    extend: 'pdfHtml5',
                    text: '<i class="fa fa-file-pdf-o"></i> PDF',
                    "className": 'btn btn-default btn-sm x-window-default '
                },
                {
                    extend: 'excel',
                    text: '<i class="fa fa-file-excel-o"></i> '+excels_,
                    filename: "_excel",
                    "className": 'btn btn-default btn-sm x-window-default'
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fa fa-file-code-o"></i>'+csvs_,
                    filename: +"_excel",
                    "className": 'btn btn-default btn-sm x-window-default'
                },
                /*{
                    extend: 'colvis',
                    text: '<i class="fa fa-sliders"></i> Custome',
                    "className": 'btn btn-default btn-sm'
                },*/
                {
                    extend: 'copy',
                    text: '<i class="fa fa-clone"></i>'+copy_table,
                    "className": 'btn-sm btn btn-default x-window-default'
                },
/*
                {
                    extend: 'pageLength',
                    text: '<i class="fa fa-sort-amount-desc"></i> Show',
                    "className": 'btn btn-default btn-sm'
                },
*/

            ]
        });
        $('#'+table+' tfoot th').each( function () {
            var title = $(this).text();
           // $(this).html( '<input type="text" class="form-control " placeholder="'+setting.SEARCH+' '+title+'" style="height: 30px;border-radius: 4px;font-size: 12px" />' );
        } );
      // child row
      $('.show-child-rows tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tableChildRows.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }

    } );

        // DataTable
        oDT.columns().every(function () {
            var that = this;
            // Apply the filter
            $("#"+table+" input").on('keyup change', function () {
                that.column($(this).parent().index() + ':visible')
                    .search(this.value)
                    .draw();
             });
          });
    };
    this.loadDatatableCompondent = function(table) {
        $('#' + table + '_filter').addClass('this-right this-margin-bottom');
        $('#' + table + '_filter').css({
            'margin-top': '-10px',
            'margin-left': 150,
            'left':0
        });
        $('#' + table + '_paginate').addClass(' this-right');
        $('#' + table + '_length').css({
            'width':150,
            'margin-top':-10,
            'font-size':12,
            'margin-left':20
        });
        $('#' + table + '_length').addClass('this-left ')
    };
    this.FormatDataTable=function() {
        // `d` is the original data object for the row
        return '<table cellpadding="7" cellspacing="0" border="0" style="padding-left:50px;">'+
            '<tr>'+
                '<td>Name:</td>'+
                '<td>Text</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Extension:</td>'+
                '<td>0000</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Extra info:</td>'+
                '<td>And any further details here (images etc)...</td>'+
            '</tr>'+
        '</table>';
    };
    this.addRow=function (form){
     $('#'+form).show();
    };
    this.readURL=function (input,taget) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#'+taget).attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    };

    this.construct(options);
};
