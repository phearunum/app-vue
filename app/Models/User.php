<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\HasRolesAndPermissions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Hash;
use App\Models\Role;

class User extends Authenticatable
{
    use
    // HasApiTokens, HasFactory,
     Notifiable
    // HasRolesAndPermissions
     ;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
            'email' ,
            'username',
            'password' ,
            'account_type',
            'first_name',
            'last_name',
            'phone',
            'province',
            'address',
            'status',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'account_type' => 'boolean',
    ];

    public function setPasswordAttribute($value)
    {
    $this->attributes['password'] = bcrypt($value);
    }
    public function role()
    {
        return $this->belongsToMany(Role::class);
    }

}
