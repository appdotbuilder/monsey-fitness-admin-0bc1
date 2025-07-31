<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\SessionBooking
 *
 * @property int $id
 * @property int $session_id
 * @property int $client_id
 * @property string $status
 * @property \Illuminate\Support\Carbon $booked_at
 * @property \Illuminate\Support\Carbon|null $cancelled_at
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Session $session
 * @property-read \App\Models\Client $client
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SessionBooking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SessionBooking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SessionBooking query()

 * 
 * @mixin \Eloquent
 */
class SessionBooking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'session_id',
        'client_id',
        'status',
        'booked_at',
        'cancelled_at',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'booked_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the session for this booking.
     */
    public function session(): BelongsTo
    {
        return $this->belongsTo(Session::class);
    }

    /**
     * Get the client for this booking.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}