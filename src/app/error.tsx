'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <svg
                        className="mx-auto h-24 w-24 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Something went wrong!
                </h2>

                <p className="text-gray-600 mb-8">
                    {error.message || 'An unexpected error occurred'}
                </p>

                <div className="space-y-4">
                    <button
                        onClick={reset}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Try again
                    </button>

                    <a
                        href="/"
                        className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Go home
                    </a>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-8 text-left">
                        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                            Error details (development only)
                        </summary>
                        <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
                            {error.stack}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
}
