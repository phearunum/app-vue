<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
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
        if ($user->userType == '') {
            return redirect('/login');
        }
        if ($request->path() == 'login') {
            return redirect('/');
        }
        return view('app');
       // $user=User::find(Auth::user()->id)->roles;
       // return $this->checkForPermission($user, $request);
    }
    public function checkForPermission($user, $request)
    {
        return json_decode($user);
        $permission = json_decode($user->role->permission);
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
            return view('app');
        }

        return view('app');

    }


    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }


}
