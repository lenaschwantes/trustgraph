export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">TrustGraph</h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional network with verified connections
        </p>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Coming soon:</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Backend API running</li>
            <li>🔄 Graph visualization</li>
            <li>🔄 Profile pages</li>
            <li>🔄 GitHub verification</li>
          </ul>
        </div>
      </div>
    </main>
  );
}