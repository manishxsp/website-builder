export default function ClientLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 text-lg">Loading site...</p>
            </div>
        </div>
    );
}
