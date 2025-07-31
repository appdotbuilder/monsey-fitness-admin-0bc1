<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Session;
use App\Models\Payment;
use App\Models\SessionBooking;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();
        
        // Quick stats
        $stats = [
            'total_clients' => Client::count(),
            'active_clients' => Client::where('status', 'active')->count(),
            'follow_up_clients' => Client::where('status', 'follow_up')->count(),
            'todays_sessions' => Session::whereDate('start_time', $today)->count(),
            'monthly_revenue' => Payment::where('status', 'completed')
                ->where('created_at', '>=', $thisMonth)
                ->sum('amount'),
            'outstanding_balance' => Client::sum('outstanding_balance'),
        ];

        // Recent activities
        $recent_clients = Client::with('assignedTrainer')
            ->latest()
            ->take(5)
            ->get();

        $todays_sessions = Session::with(['sessionType', 'trainer', 'bookings'])
            ->whereDate('start_time', $today)
            ->orderBy('start_time')
            ->take(10)
            ->get();

        $recent_payments = Payment::with('client')
            ->where('status', 'completed')
            ->latest('processed_at')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recent_clients' => $recent_clients,
            'todays_sessions' => $todays_sessions,
            'recent_payments' => $recent_payments,
        ]);
    }
}