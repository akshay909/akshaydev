"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { loginApi } from "@/services/authApi";
import { loginSuccess } from "@/redux/slices/authSlice";
import { showMessage } from "@/redux/slices/messageSlice";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { IconLoader } from "@tabler/icons-react";

export default function Auth() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      router.push("/adminkgr/add-project");
    }
  }, [isAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginApi(login);

      dispatch(loginSuccess(res.data));
      dispatch(
        showMessage({
          message: "Login successful",
          status: "success",
        }),
      );
      router.push("/adminkgr/dashboard");
    } catch (error) {
      console.error(error);
      dispatch(
        showMessage({
          message: "Login Failed",
          status: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-zinc-400">Sign in to manage your projects</p>
        </div>
        <form
          onSubmit={handleLogin}
          className="blur_backg border border-zinc-800 rounded-2xl p-8 shadow-2xl space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={login.username}
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <IconLoader size={18} className="animate-spin" />
                Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
