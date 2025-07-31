<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSessionRequest;
use App\Http\Requests\UpdateSessionRequest;
use App\Models\Session;
use App\Models\SessionType;
use App\Models\User;
use Inertia\Inertia;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sessions = Session::with(['sessionType', 'trainer', 'bookings.client'])
            ->orderBy('start_time')
            ->paginate(20);
        
        return Inertia::render('sessions/index', [
            'sessions' => $sessions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $sessionTypes = SessionType::active()->get();
        $trainers = User::trainers()->active()->get();
        
        return Inertia::render('sessions/create', [
            'sessionTypes' => $sessionTypes,
            'trainers' => $trainers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSessionRequest $request)
    {
        $session = Session::create($request->validated());

        return redirect()->route('sessions.show', $session)
            ->with('success', 'Session created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Session $session)
    {
        $session->load(['sessionType', 'trainer', 'bookings.client']);
        
        return Inertia::render('sessions/show', [
            'session' => $session
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Session $session)
    {
        $sessionTypes = SessionType::active()->get();
        $trainers = User::trainers()->active()->get();
        
        return Inertia::render('sessions/edit', [
            'session' => $session,
            'sessionTypes' => $sessionTypes,
            'trainers' => $trainers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSessionRequest $request, Session $session)
    {
        $session->update($request->validated());

        return redirect()->route('sessions.show', $session)
            ->with('success', 'Session updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Session $session)
    {
        $session->delete();

        return redirect()->route('sessions.index')
            ->with('success', 'Session deleted successfully.');
    }
}