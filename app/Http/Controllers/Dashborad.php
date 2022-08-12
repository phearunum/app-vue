<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
class Dashborad extends Controller
{
    public function index(Request $request)
    {
        if (!Auth::check() && $request->path() != 'login') {
            return redirect('/login');
        }
        if (!Auth::check() && $request->path() == 'login') {

            return view('app');
        }
        $user = Auth::user();
     
        if ($user->account_type==0) {
            return redirect('/login');
        }
        if ($request->path() == 'login') {
            return redirect('/dashboard');
        }
        return $this->checkForPermission($user, $request);
    }
    public function checkForPermission($user, $request)
    {
        $permission = json_decode($user->role->permission);
        var_dump($permission);
        $hasPermission = false;
        if (!$permission) {
            return view('app');
        }

        foreach ($permission as $p) {
            if ($p->name == $request->path()) {
                if ($p->read) {
                    $hasPermission = true;
                }
            }
        }
        if ($hasPermission) {
            return view('dashboard.page.index');
        }

        return view('dashboard.page.index');
        return view('notfound');
    }
    public function home()
    {
        return view('dashboard.page.index');
    }
}