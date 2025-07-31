<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Session
 *
 * @property int $id
 * @property int $session_type_id
 * @property int $trainer_id
 * @property string $title
 * @property string|null $description
 * @property \Illuminate\Support\Carbon $start_time
 * @property \Illuminate\Support\Carbon $end_time
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\SessionType $sessionType
 * @property-read \App\Models\User $trainer
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\SessionBooking> $bookings
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Session newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Session newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Session query()
 * @method static \Illuminate\Database\Eloquent\Builder|Session scheduled()
 * @method static \Database\Factories\SessionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Session extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'fitness_sessions';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'session_type_id',
        'trainer_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'status',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the session type for this session.
     */
    public function sessionType(): BelongsTo
    {
        return $this->belongsTo(SessionType::class);
    }

    /**
     * Get the trainer for this session.
     */
    public function trainer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'trainer_id');
    }

    /**
     * Get all bookings for this session.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(SessionBooking::class);
    }

    /**
     * Scope a query to only include scheduled sessions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled');
    }
}