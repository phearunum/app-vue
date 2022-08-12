<?php

namespace App\Models;;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name', 'permission'];
    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user');
    }
}
