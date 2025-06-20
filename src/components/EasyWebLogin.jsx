import React from "react";

const EasyWebLogin = ({ onLogin, onRegister }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          EasyWeb Login
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Welcome to the online banking portal.
        </p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={onLogin}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Login with Google
          </button>

          <button
            onClick={onRegister}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl"
          >
            Register with Email
          </button>
        </div>

        <div className="mt-6 text-sm text-center text-gray-500">
          <p>
            Need help?{" "}
            <a href="/support" className="text-blue-600 hover:underline">
              Contact support
            </a>
          </p>
          <p>
            <a
              href="/privacy"
              className="text-blue-600 hover:underline block mt-1"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EasyWebLogin;
