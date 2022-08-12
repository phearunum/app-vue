<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUsersRequest;
use App\Http\Requests\Admin\UpdateUsersRequest;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResources;
use DataTables;
use DB;
class UsersController extends Controller
{
    /**
     * Display a listing of User.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }

        $users = User::all();

        return view('admin.users.index', compact('users'));
    }
    public function create()
    {
        $AccountType =DB::table('account_types')->get();
        return view('dashboard.page.users.create_user')->with('AccountType',$AccountType);
    }
    
    
    public function register(RegisterRequest $request)
    {
            DB::beginTransaction();
        try{
            $user = User::create($request->validated());
            DB::commit();
            return response()->json([
                'status'=>200,
                'data'=>$user,
                'smg'=>"create successfully",
                'error'=>[]
                 ]);
        }catch(\Exception $e){
            DB::rollback();
            return response()->json(['status'=>302,
           'data'=>[],
           'smg'=>"Something went to wrong",
           'error'=>$e
        ]
           
            );
        }


    }
 
    public function store(StoreUsersRequest $request)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }
        $user = User::create($request->all());
        $roles = $request->input('roles') ? $request->input('roles') : [];
        $user->assignRole($roles);

        return redirect()->route('admin.users.index');
    }
   public function lists()
   {

    return view('dashboard.page.users.list_users');
   }

  public function getList__(Request $request)
  {
  

    if ($request->ajax()) {
        $data = User::latest()->get();

        return Datatables::of($data)
            ->addIndexColumn()
            ->addColumn('action', function($row){
                $actionBtn = '<button @click="RowEdit()" class="edit btn btn-success btn-sm"> <i class="bx bx-edit"></i>'.trans('lang.edit').'</button> <button  class="delete btn btn-danger btn-sm"> <i class="bx bx-trash"></i>'.trans('lang.delete').'</button>';
                return $actionBtn;
            })
            ->rawColumns(['action'])
            ->make(true);
    }

  }
  public  function getList()
  {
    $paginate = request('paginate',1);

    $user = User::latest()->paginate($paginate);
    //User::with(['class','section'])->paginate($paginate);
    return UserResources::collection($user);
  }

    /**
     * Show the form for editing User.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }
        $roles = Role::get()->pluck('name', 'name');

        return view('admin.users.edit', compact('user', 'roles'));
    }

    /**
     * Update User in storage.
     *
     * @param  \App\Http\Requests\UpdateUsersRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUsersRequest $request, User $user)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }

        $user->update($request->all());
        $roles = $request->input('roles') ? $request->input('roles') : [];
        $user->syncRoles($roles);

        return redirect()->route('admin.users.index');
    }

    public function show(User $user)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }

        $user->load('roles');

        return view('admin.users.show', compact('user'));
    }

    /**
     * Remove User from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }

        $user->delete();

        return redirect()->route('admin.users.index');
    }

    /**
     * Delete all selected User at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (! Gate::allows('users_manage')) {
            return abort(401);
        }
        User::whereIn('id', request('ids'))->delete();

        return response()->noContent();
    }

}
