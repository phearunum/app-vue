let App =function(options){
    var config = {
        post: 'POST',
        get: 'GET',
        put: 'PUT',
        url:null,
        table:null,
        cols:[],
        title:null,
        search: 'search',
    };
    let app = this;
    this.construct = function(options){
        $.extend(config, options);
    };
    app.loadDataTable = () => {
        let factCols = [];
        config.cols.forEach(function (t, index) {
            factCols.push({ data: t, name: t });
        });
        var oDT = $(config.table).DataTable({
            processing: true,
            serverSide: true,
            dom: 'Blfrtip',
            "bDestroy": true,
            "processing": true,
            "jQueryUI": true,
            responsive: true,
            "lengthChange": true,
            "lengthMenu": [[10, 25, 50, 100, 500, 1000], [10, 25, 50, 100, 500, "Max"]],
            "pageLength": 10,
            "bSort": true,
            "bFilter": true,
            order: [
                [1, "asc"]
            ],
            ajax:config.url,
            columns: factCols,
            "oLanguage": {
                "oPaginate": {
                "sFirst":first_page, // This is the link to the first page
                "sPrevious": previous_page, // This is the link to the previous page
                "sNext": next_page, // This is the link to the next page
                "sLast": last_page, // This is the link to the last page
                },
                "sLengthMenu": displays_+" _MENU_ "+records_,
                "sSearch": search,


            },
            "language": {
                "zeroRecords":not_records_found,
                "info": pages_+" _PAGE_ "+ofs_+" _PAGES_"+" Total = _TOTAL_ ",
                "infoEmpty": displays_+"=>"+not_records_found,
                "infoFiltered": "("+filtered_from+" _MAX_ "+total_records+")",

            },
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


            ]

        });

    }

    this.construct(options);
};
