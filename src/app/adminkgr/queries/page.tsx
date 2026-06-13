"use client";

import React, { useEffect, useState } from "react";
import SideBar from "@/components/admin/sidebar/page";
import { GetQueries, deleteQuery } from "@/services/contactApi";
import { IconLoader } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { setTotalQueries } from "@/redux/slices/queriesSlice";

interface Query {
  id: number;
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
  createdAt: string;
}

export default function Queries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    setloading(true);
    try {
      const res = await GetQueries();
      setQueries(res.data);
      dispatch(setTotalQueries(res.data.length));
    } catch (err) {
      console.error("Error fetching queries:", err);
    } finally {
      setloading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedQuery) return;
    setloading(true);
    try {
      await deleteQuery(selectedQuery.id);

      setQueries(queries.filter((q) => q.id !== selectedQuery.id));

      setOpen(false);

      console.log("Deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-zinc-950">
        <SideBar />
        <div className="flex-1 flex items-center justify-center">
          <IconLoader className="w-8 h-8 text-indigo-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <SideBar />

      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Clients Queries
                </h1>
                <p className="text-zinc-400 mt-1">
                  {queries.length} total Queries
                </p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-zinc-300">
                <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Project</th>
                    <th className="px-6 py-3">Message</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {queries.map((q, i) => (
                    <tr
                      key={i}
                      onClick={() => {
                        setSelectedQuery(q);
                        setOpen(true);
                      }}
                      className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {q.name}
                      </td>
                      <td className="px-6 py-4">{q.email}</td>
                      <td className="px-6 py-4">{q.phone}</td>
                      <td className="px-6 py-4">{q.project}</td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        {q.message}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(q.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {open && selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 w-full max-w-2xl rounded-2xl shadow-xl border border-zinc-800">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-white">
                Query Details
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 text-sm text-zinc-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-500">Name</p>
                  <p className="text-white">{selectedQuery.name}</p>
                </div>

                <div>
                  <p className="text-zinc-500">Email</p>
                  <p className="text-white">{selectedQuery.email}</p>
                </div>

                <div>
                  <p className="text-zinc-500">Phone</p>
                  <p className="text-white">{selectedQuery.phone}</p>
                </div>

                <div>
                  <p className="text-zinc-500">Project</p>
                  <p className="text-white">{selectedQuery.project}</p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-zinc-500">Message</p>
                  <p className="text-white leading-relaxed">
                    {selectedQuery.message}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500">Date</p>
                  <p className="text-white">
                    {new Date(selectedQuery.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-5 border-t border-zinc-800">
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
              >
                Delete
              </button>

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
