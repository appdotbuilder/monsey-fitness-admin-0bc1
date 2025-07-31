import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Clients',
        href: '/clients',
    },
];

interface ClientsIndexData extends SharedData {
    clients: {
        data: Array<{
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            phone?: string;
            status: string;
            outstanding_balance: string;
            assigned_trainer?: {
                name: string;
            };
            created_at: string;
        }>;
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
    };
    [key: string]: unknown;
}

export default function ClientsIndex() {
    const { clients } = usePage<ClientsIndexData>().props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
            case 'follow_up':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Clients - Monsey Fitness" />
            
            <div className="p-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">👥 Clients</h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Manage your fitness clients, assign trainers, and track their progress.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Link
                            href="/clients/create"
                            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Add Client
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
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Contact
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Status
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Trainer
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                                Balance
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900 dark:divide-gray-700">
                                        {clients.data.map((client) => (
                                            <tr key={client.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                                    <Link 
                                                        href={`/clients/${client.id}`}
                                                        className="hover:text-blue-600 dark:hover:text-blue-400"
                                                    >
                                                        {client.first_name} {client.last_name}
                                                    </Link>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <div>
                                                        <div>{client.email}</div>
                                                        {client.phone && (
                                                            <div className="text-xs">{client.phone}</div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(client.status)}`}>
                                                        {client.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {client.assigned_trainer?.name || 'Unassigned'}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    ${parseFloat(client.outstanding_balance).toFixed(2)}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <Link 
                                                        href={`/clients/${client.id}/edit`}
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
                            
                            {/* Pagination */}
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:bg-gray-900 dark:border-gray-700">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    {clients.links[0]?.url && (
                                        <Link 
                                            href={clients.links[0].url!}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {clients.links[clients.links.length - 1]?.url && (
                                        <Link 
                                            href={clients.links[clients.links.length - 1].url!}
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}