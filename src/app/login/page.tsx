"use client";

import { login } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.append("next", next);

    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="mx-auto mt-12 max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Login
      </h1>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-center text-sm text-red-500">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Username:
          </label>
          <input
            name="username"
            type="text"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
