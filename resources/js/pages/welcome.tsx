import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Monsey Fitness - Admin Platform">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-lg hover:bg-blue-700 transition-colors"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-6xl flex-col items-center text-center">
                        {/* Hero Section */}
                        <div className="mb-12">
                            <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
                                💪 <span className="text-blue-600">Monsey Fitness</span> Admin Platform
                            </h1>
                            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                                Complete administrative control for your fitness business. Manage clients, schedule sessions, 
                                track payments, and grow your gym with powerful tools designed for fitness professionals.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-50 transition-colors dark:hover:bg-gray-700"
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 w-full max-w-6xl">
                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">👥</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Client Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Add, edit, and track clients with status tags (Active/Inactive/Follow-Up). 
                                    Assign trainers and manage client relationships efficiently.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">📅</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Smart Scheduling</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Professional calendar with drag-and-drop booking, trainer schedules, 
                                    and session type management. Click to create, drag to reschedule.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">💳</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Payment Processing</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Cardknox/Sola integration for one-time sales and recurring memberships. 
                                    Track balances, save payment tokens, and handle ACH payments.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Attendance Tracking</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Monitor class and personal session attendance. Track no-shows, 
                                    completed sessions, and client engagement patterns.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">🏃‍♂️</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Trainer Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Schedule trainers, track commissions, and manage trainer-client assignments. 
                                    Full visibility into trainer performance and earnings.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Communication Hub</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    SMS/Email reminders, WhatsApp broadcasts with templates, 
                                    and automated notifications to keep clients engaged.
                                </p>
                            </div>
                        </div>

                        {/* Additional Features */}
                        <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-4xl mb-12 dark:bg-gray-800">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🚀 Advanced Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">📝</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Digital Waivers</h4>
                                        <p className="text-gray-600 dark:text-gray-300">Upload and e-signature capture for liability waivers</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">🎁</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Referral System</h4>
                                        <p className="text-gray-600 dark:text-gray-300">Manual referral credits and discount application</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">📊</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Bulk Import</h4>
                                        <p className="text-gray-600 dark:text-gray-300">Import clients from CSV/Excel files</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">📱</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Mobile Optimized</h4>
                                        <p className="text-gray-600 dark:text-gray-300">Full admin functionality on mobile devices</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                                    Ready to Transform Your Fitness Business? 💪
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                    Join hundreds of fitness professionals who trust Monsey Fitness for their admin needs.
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4 text-xl font-bold text-white shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
                                >
                                    Start Your Free Trial Today
                                </Link>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}