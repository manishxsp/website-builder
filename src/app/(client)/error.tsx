'use client';

export default function ClientError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Site Error
                </h2>
                <p className="text-gray-600 mb-8">
                    {error.message || 'Unable to load this site'}
                </p>
                <button
                    onClick={reset}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
