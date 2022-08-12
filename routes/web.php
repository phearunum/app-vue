<?php
use App\Http\Middleware\Admin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\admin\UsersController;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::prefix('api')->middleware([Admin::class])->group(function(){

    Route::post('/login',[LoginController::class, 'login']);
    Route::post('/register',[RegisterController::class,'register']);
    Route::get('/users/lists',[UsersController::class,'getList']);


});
Route::get('/logout',[LogoutController::class, 'perform']);
Route::get('/slug',[AdminController::class, 'slug']);
Route::get('/',[AdminController::class, 'index']);

//Route::get('/',[AdminController::class, 'index']);
//Route::any('{slug}',[AdminController::class, 'slug'])->where('slug', '([A-z\d-\/_.]+)?');

Route::get('{any}', function () {
    return view('app');
})->where('any','.*');
