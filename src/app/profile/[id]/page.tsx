interface UserProfileProps {
  params: {
    id: string; // your dynamic route parameter
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
            {params.id.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-3">User Profile</h1>
          <p className="text-gray-600 text-sm">Detailed information about this user</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 text-left">
          <p className="text-sm text-gray-600 mb-1">User ID</p>
          <p className="text-lg font-mono font-medium text-gray-800 break-words">
            {params.id}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
            Message User
          </button>
          <button className="w-full py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition">
            Back to Profiles
          </button>
        </div>
      </div>
    </div>
  );
}
