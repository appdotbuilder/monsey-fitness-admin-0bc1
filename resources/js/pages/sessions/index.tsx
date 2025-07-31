import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Sessions',
        href: '/sessions',
    },
];

interface SessionsIndexData extends SharedData {
    sessions: {
        data: Array<{
            id: number;
            title: string;
            start_time: string;
            end_time: string;
            status: string;
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
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
    };
    [key: string]: unknown;
}

export default function SessionsIndex() {
    const { sessions } = usePage<SessionsIndexData>().props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
            case 'no_show':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Sessions - Monsey Fitness" />
            
            <div className="p-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">📅 Sessions</h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Manage training sessions, classes, and appointments.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Link
                            href="/sessions/create"
                            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Schedule Session
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                                                Session
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Date & Time
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Trainer
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Participants
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Status
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900 dark:divide-gray-700">
                                        {sessions.data.map((session) => (
                                            <tr key={session.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="flex items-center">
                                                        <div 
                                                            className="h-4 w-4 rounded-full mr-3"
                                                            style={{ backgroundColor: session.session_type.color }}
                                                        ></div>
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white">
                                                                <Link 
                                                                    href={`/sessions/${session.id}`}
                                                                    className="hover:text-blue-600 dark:hover:text-blue-400"
                                                                >
                                                                    {session.title}
                                                                </Link>
                                                            </div>
                                                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                                                                {session.session_type.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <div>
                                                        <div>{new Date(session.start_time).toLocaleDateString()}</div>
                                                        <div className="text-xs">
                                                            {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                                                            {new Date(session.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {session.trainer.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {session.bookings.length > 0 ? (
                                                        <div>
                                                            <div>{session.bookings.length} booked</div>
                                                            <div className="text-xs">
                                                                {session.bookings.slice(0, 2).map((booking, index) => (
                                                                    <span key={index}>
                                                                        {booking.client.first_name} {booking.client.last_name}
                                                                        {index < Math.min(session.bookings.length, 2) - 1 && ', '}
                                                                    </span>
                                                                ))}
                                                                {session.bookings.length > 2 && ` +${session.bookings.length - 2} more`}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">No bookings</span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(session.status)}`}>
                                                        {session.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <Link 
                                                        href={`/sessions/${session.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}