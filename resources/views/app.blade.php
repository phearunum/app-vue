<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
   
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="description" content="">
    <meta name="author" content="Phearun">
    <meta name="generator" content="Hugo 0.87.0">
    <title>{{env('APP_NAME')}}</title>
    @if(Auth::check())
      <!-- FAVICONS ICON -->
    <link href="/assets/css/jquery-jvectormap-2.0.2.css" rel="stylesheet" />
    <link href="/assets/css/simplebar.css" rel="stylesheet" />
    <link href="/assets/css/perfect-scrollbar.css" rel="stylesheet" />
    <link href="/assets/css/metisMenu.min.css" rel="stylesheet" />
    <!-- loader-->
    <link href="/assets/css/pace.min.css" rel="stylesheet" />
    <script src="/assets/js/pace.min.js"></script>
    <!-- Bootstrap CSS -->
    <link href="/assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/css/bootstrap-extended.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link href="{!! url('assets/css/app.css') !!}" rel="stylesheet">
    <link href="/assets/css/icons.css" rel="stylesheet">
    <!-- Theme Style CSS -->
    <link rel="stylesheet" href="/assets/css/dark-theme.css" />
    <link rel="stylesheet" href="/assets/css/semi-dark.css" />
    <link rel="stylesheet" href="/assets/css/header-colors.css" />
    <!-- endinject -->
    <link rel="shortcut icon" href="/images/favicon.png" />
    <link rel="stylesheet" href="https://cdn.rawgit.com/tonystar/bootstrap-float-label/v1.0.0/dist/bootstrap-float-label.min.css" />

    <script src="{!! url('assets/comm/App.js') !!}"></script>
    @else
        <link href="{!! url('assets/css/app.css') !!}" rel="stylesheet">
        <link href="{!! url('assets/css/km.css') !!}" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="{!! url('assets/comm/App.js') !!}"></script>
        <link rel="icon" href="/website/img/favicon.ico" type="image/x-icon">
        <title>Login </title>
        <link rel="stylesheet" href="/website/css/all.min.css">
        <link rel="stylesheet" href="/website/css/avio-style.css">
        <script src="/website/js/plugins.js"></script>
    <!-- <link href="{!! url('css/app.css') !!}" rel="stylesheet"> -->
    <link rel="stylesheet" href="/css/app_them.css">
    @endif
    <script>
       
        /* DataTable Config */
        const edit="{{__('lang.edit')}}";
        const del='លុប';
        const search='ស្វែងរក';
        const prints_='បោះពុម្ភ';
        const excels_='អុិចសែល';
        const csvs_='ស៊ីអេវី';
        const copy_table='ចំងលតារាង';
        const previous_page='ត្រឡប់ក្រោយ';
        const first_page='ទំព័រដំបូង';
        const next_page='ទំព័របន្ទាប់';
        const last_page='ទំព័រក្រោយ';
        const displays_='បង្ហាញ';
        const records_='ជួរ';
        const pages_='ទំព័រទី';
        const ofs_='នៃទំព័រ ';
        const not_records_found='សុំទោស ទិន្ន័យស្វែងរកមិនមានក្នុងប្រព័ន្ធទេ';
        const filtered_from='បានស្វែងរកក្នុង';
        const total_records='ចំនួនជួរសរុប';
        const lg="kh";
    </script>

    <style>
        .paginate_button,
        .buttons-print,
        .buttons-html5 {
            padding: 2px !important;
            height: 30px;
            width: 50px;
            font-size: 0.8rem;
            margin-bottom: 10px;
        }

        .form-control {
            width: 100%;
            padding: 9px 20px;
            text-align: left;
            outline: 0;
            border-radius: 4px;
            background-color: #fff;
            font-size: 15px;
            font-weight: 300;
            color: #8D8D8D;
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
            margin-top: 16px;
            height: calc(1.5em + 1.2rem + 2px) !important;
            font-family: 'Khmer OS Siemreap';
        }

        table.dataTable.dtr-inline.collapsed>tbody>tr>td:first-child:before,
        table.dataTable.dtr-inline.collapsed>tbody>tr>th:first-child:before {
            left: 4px;
            height: 16px;
            width: 16px;
            display: block;
            position: absolute;
            color: white;
            border: 2px solid white;
            border-radius: 16px;
            box-shadow: 0 0 3px #444;
            box-sizing: content-box;
            text-align: left;
            font-family: 'Courier New', Courier, monospace;
            text-indent: 4px;
            line-height: 16px;
            content: '+';
            background-color:  #2b85e4;
        }

        table.dataTable.dtr-inline.collapsed>tbody>tr.parent>td:first-child:before,
        table.dataTable.dtr-inline.collapsed>tbody>tr.parent>th:first-child:before {
            content: '-';
            background-color: #d33333;
        }

        .sidebar-wrapper {
            background-color:  #2b85e4 !important;
            color: white !important;
        }

        .sidebar-wrapper .metismenu a {
            background-color:  #2b85e4 !important;
            color: white !important;
        }

        .sidebar-wrapper .metismenu ul {
            background-color:  #2b85e4 !important;
            color: white !important;
        }

        .topbar {
            background-color:  #2b85e4 !important;
            color: white !important;
        }

        .topbar .navbar .navbar-nav .nav-link {
            background-color:  #2b85e4 !important;
            color: white !important;
        }

        .user-info .user-name {
            background-color:  #2b85e4 !important;
            color: white !important;
        }
    </style>
</head>

<body data-avio="theme-indigo">

    <script>
        (function() {
            window.Laravel = {
                csrfToken: '{{ csrf_token() }}'
            };
        })();
    </script>

    
            @if(Auth::check())
            <div class="wrapper">
                <div id="app">
                    <script>
                        window.authUser = @json(Auth::user());
                    </script>
                      <mainapp :prop="{{Auth::user()}}"></mainapp>
                </div>
            </div>
            @else
            <div class="avio">
                <div class="page-body" id="app">
                    <script>
                        window.authUser = @json(Auth::user());
                    </script>
                       <mainapp :user="false"></mainapp>
                </div>
            </div>
          
            @endif
    
    @if(Auth::check())
    <script src="/assets/js/bootstrap.bundle.min.js"></script>
    <!--plugins-->
    <script src="/assets/js/jquery.min.js"></script>
    <script src="/assets/js/simplebar.min.js"></script>
    <script src="/assets/js/metisMenu.min.js"></script>
    <script src="/assets/js/perfect-scrollbar.js"></script>

    <!-- Bootstrap 5 JavaScript Bundle with Popper -->
    <script src="/assets/js/app.js"></script>
    <script src="/assets/js/popper.min.js"></script>
    <script src="/assets/js/bootstrap.min.js"></script>
  
    <script>
        (function($) {
            "use strict";

            const asideBody = new PerfectScrollbar('.header-message-list', {
              //  suppressScrollX: true
            });
            const headerScroll = new PerfectScrollbar(".header-notifications-list", {
              //  suppressScrollX: true
            })

        });
    </script>
    @endif

    <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
</body>

</html>
