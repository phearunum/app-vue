<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use DB;
use App\Http\Requests\RegisterRequest;
use Hash;
use Session;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash as FacadesHash;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;

class RegisterController extends Controller
{
    /**
     * Display register page.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $AccountType =DB::table('account_types')->get();

        return view('auth.register')->with('AccountType',$AccountType);
    }

    /**
     * Handle account registration request
     *
     * @param RegisterRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {

        $user = User::create($request->validated());
       // auth()->login($user);
        return redirect('/signup')->with('success', "Account successfully registered.");
    }
    public function registers(Request $request)
    {

        $request->validate([
            'email' => 'required|email:rfc,dns|unique:users,email',
            'username' => 'required|unique:users,username',
            'password' => 'required|min:4',
            'password_confirmation' => 'required|same:password',
            'account_type'=>'required|numeric',
            'phone'=>'required|string|max:255',
            'first_name'=>'required|string|max:255',
            'last_name'=>'required|string|max:255',
        ]);


            DB::beginTransaction();
        try{
            $user = User::create($request);
            DB::commit();
            auth()->login($user);
        }catch(\Exception $e){
            DB::rollback();
            return redirect()->with('error', "Account register error ");
        }


    }



}

