export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-black text-gray-200">404</h1>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Page not found
                </h2>

                <p className="text-gray-600 mb-8">
                    Sorry, we couldn't find the page you're looking for.
                </p>

                <div className="space-y-4">
                    <a
                        href="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Go back home
                    </a>
                </div>
            </div>
        </div>
    );
}
