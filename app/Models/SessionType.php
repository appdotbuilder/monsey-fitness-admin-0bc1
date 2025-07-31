<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\SessionType
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int $duration_minutes
 * @property string $price
 * @property int|null $max_participants
 * @property bool $is_class
 * @property bool $is_active
 * @property string $color
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Session> $sessions
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SessionType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SessionType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SessionType query()
 * @method static \Illuminate\Database\Eloquent\Builder|SessionType active()
 * @method static \Database\Factories\SessionTypeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class SessionType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'duration_minutes',
        'price',
        'max_participants',
        'is_class',
        'is_active',
        'color',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_class' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all sessions of this type.
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }

    /**
     * Scope a query to only include active session types.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}