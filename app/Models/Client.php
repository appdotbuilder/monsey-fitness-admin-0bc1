<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Client
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string|null $phone
 * @property string|null $address
 * @property \Illuminate\Support\Carbon|null $date_of_birth
 * @property string|null $emergency_contact
 * @property string|null $medical_notes
 * @property string $status
 * @property int|null $assigned_trainer_id
 * @property string $outstanding_balance
 * @property bool $waiver_signed
 * @property \Illuminate\Support\Carbon|null $waiver_signed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $assignedTrainer
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Membership> $memberships
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Payment> $payments
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\SessionBooking> $sessionBookings
 * @property-read string $full_name
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Client newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Client newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Client query()
 * @method static \Illuminate\Database\Eloquent\Builder|Client active()
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereStatus($value)
 * @method static \Database\Factories\ClientFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Client extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'date_of_birth',
        'emergency_contact',
        'medical_notes',
        'status',
        'assigned_trainer_id',
        'outstanding_balance',
        'waiver_signed',
        'waiver_signed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'waiver_signed' => 'boolean',
        'waiver_signed_at' => 'datetime',
        'outstanding_balance' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the assigned trainer for this client.
     */
    public function assignedTrainer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_trainer_id');
    }

    /**
     * Get all session bookings for this client.
     */
    public function sessionBookings(): HasMany
    {
        return $this->hasMany(SessionBooking::class);
    }

    /**
     * Get all payments for this client.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get all memberships for this client.
     */
    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    /**
     * Get the client's full name.
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * Scope a query to only include active clients.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}