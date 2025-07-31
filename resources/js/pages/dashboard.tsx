import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardData extends SharedData {
    stats: {
        total_clients: number;
        active_clients: number;
        follow_up_clients: number;
        todays_sessions: number;
        monthly_revenue: string;
        outstanding_balance: string;
    };
    recent_clients: Array<{
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        status: string;
        created_at: string;
        assigned_trainer?: {
            name: string;
        };
    }>;
    todays_sessions: Array<{
        id: number;
        title: string;
        start_time: string;
        session_type: {
            name: string;
            color: string;
        };
        trainer: {
            name: string;
        };
        bookings: Array<{
            client: {
                first_name: string;
                last_name: string;
            };
        }>;
    }>;
    recent_payments: Array<{
        id: number;
        amount: string;
        type: string;
        method: string;
        processed_at: string;
        client: {
            first_name: string;
            last_name: string;
        };
    }>;
    [key: string]: unknown;
}

export default function Dashboard() {
    const { stats, recent_clients, todays_sessions } = usePage<DashboardData>().props;

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard - Monsey Fitness" />
            
            <div className="p-6 space-y-8">
                {/* Header */}
                <div className="border-b border-gray-200 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">💪 Monsey Fitness Admin</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Your complete fitness business management dashboard
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">👥</div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                            Total Clients
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                            {stats.total_clients}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <Link href="/clients" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                    View all clients
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">✅</div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                            Active Clients
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                            {stats.active_clients}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                    {stats.follow_up_clients} need follow-up
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">📅</div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                            Today's Sessions
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                            {stats.todays_sessions}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <Link href="/sessions" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                    View schedule
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">💰</div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                            Monthly Revenue
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                            ${parseFloat(stats.monthly_revenue).toLocaleString()}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">⚠️</div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                            Outstanding Balance
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                            ${parseFloat(stats.outstanding_balance).toLocaleString()}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700">
                            <div className="text-sm">
                                <Link href="/payments" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400">
                                    Manage payments
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-800">
                        <div className="p-5">
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🚀</div>
                                    <Link 
                                        href="/clients/create" 
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Add New Client
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Clients */}
                    <div className="bg-white shadow rounded-lg dark:bg-gray-800">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">📋 Recent Clients</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recent_clients.map((client) => (
                                    <div key={client.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {client.first_name} {client.last_name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {client.email}
                                                {client.assigned_trainer && (
                                                    <span className="ml-2">• Trainer: {client.assigned_trainer.name}</span>
                                                )}
                                            </p>
                                        </div>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            client.status === 'active' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                : client.status === 'follow_up'
                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                        }`}>
                                            {client.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <Link 
                                    href="/clients" 
                                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                >
                                    View all clients →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Today's Sessions */}
                    <div className="bg-white shadow rounded-lg dark:bg-gray-800">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">🏃‍♂️ Today's Sessions</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {todays_sessions.map((session) => (
                                    <div key={session.id} className="border-l-4 pl-4" style={{ borderColor: session.session_type.color }}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {session.title}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                                                    • {session.trainer.name}
                                                </p>
                                                {session.bookings.length > 0 && (
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                                        {session.bookings.length} client(s) booked
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                {session.session_type.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <Link 
                                    href="/sessions" 
                                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                >
                                    View full schedule →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white shadow rounded-lg dark:bg-gray-800">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">⚡ Quick Actions</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <Link 
                                href="/clients/create"
                                className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl mb-2">👤</div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Add Client</span>
                            </Link>
                            <Link 
                                href="/sessions/create"
                                className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl mb-2">📅</div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Schedule Session</span>
                            </Link>
                            <Link 
                                href="/payments"
                                className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl mb-2">💳</div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Process Payment</span>
                            </Link>
                            <Link 
                                href="/reports"
                                className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl mb-2">📊</div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">View Reports</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}