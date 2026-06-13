"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import {
  IconMenu2,
  IconChevronLeft,
  IconChevronDown,
  IconFolderPlus,
  IconMessage,
  IconLoader,
  IconLogout,
} from "@tabler/icons-react";
import { logout, loginSuccess } from "@/redux/slices/authSlice";
import { showMessage } from "@/redux/slices/messageSlice";
import { meApi } from "@/services/authApi";
import { GetQueries } from "@/services/contactApi";
import { useSelector } from "react-redux";

export default function SideNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const total = useSelector((state: any) => state.queries.totalQueries);

  useEffect(() => {
    menuItems.forEach((item, index) => {
      const match = item.dropdown?.some((sub) => sub.href === pathname);
      if (match) {
        setOpenDropdown(index);
      }
    });
  }, [pathname]);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await GetQueries();
      setMessageCount(res.data.length);
    } catch (err) {
      console.error("Error fetching queries:", err);
    }
  };

  useEffect(() => {
    const checkScreen = () => {
      setIsCollapsed(window.innerWidth < 786);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await meApi();

        if (!res.data) throw new Error("Unauthorized");

        dispatch(
          loginSuccess({
            user: res.data.user,
          }),
        );
      } catch (err) {
        dispatch(logout());
        router.push("/adminkgr/auth");
      }
    };

    checkAuth();
  }, []);

  const menuItems = [
    {
      label: "Projects",
      icon: <IconFolderPlus size={18} className="text-white" />,
      dropdown: [
        {
          label: "Add Project",
          href: "/adminkgr/add-project",
          icon: <IconFolderPlus size={16} className="text-white" />,
        },
      ],
    },
    {
      label: "Queries",
      icon: <IconMessage size={18} className="text-white" />,
      total: messageCount || total,
      dropdown: [
        {
          label: "Form Queries",
          href: "/adminkgr/queries",
          icon: <IconMessage size={16} className="text-white" />,
        },
      ],
    },
  ];

  const toggleDropdown = (index: number) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/portfolio-backend/public/index.php/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      dispatch(logout());
      dispatch(
        showMessage({
          message: "Logged out successfully.",
          status: "success",
        }),
      );
      router.push("/adminkgr/auth");
    } catch (error) {
      dispatch(
        showMessage({
          message: "Somethink went wrong.",
          status: "error",
        }),
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-screen sticky top-0 border-r bg-black  transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-[70px]" : "w-[280px]"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <Link
            aria-label="Admin Panel"
            href="/adminkgr/add-project"
            className="font-semibold text-xl text-white"
          >
            Admin Panel
          </Link>
        )}

        <button
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-primary text-white "
        >
          {isCollapsed ? (
            <IconMenu2 size={22} />
          ) : (
            <IconChevronLeft size={22} />
          )}
        </button>
      </div>

      <div className="flex flex-col justify-between h-full gap-2">
        <ul
          className={`flex flex-col gap-2 px-2 ${isCollapsed ? "w-full items-center justify-center" : ""}`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className={isCollapsed ? "w-fit" : "w-full"}>
              <div
                onClick={() => toggleDropdown(index)}
                className="flex items-center justify-between cursor-pointer px-3 py-3 rounded-lg hover:bg-primary text-white"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
                {item.total !== 0 && !isCollapsed && (
                  <p className="bg-primary rounded-full py-0 px-4 text-sm">
                    {item.total}
                  </p>
                )}
                {!isCollapsed && <IconChevronDown size={18} />}
              </div>

              {openDropdown === index && !isCollapsed && (
                <ul className="ml-3 mt-1 flex flex-col gap-2">
                  {item.dropdown.map((sub, i) => (
                    <li key={i}>
                      <Link
                        aria-label={sub.label}
                        href={sub.href}
                        className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm ${
                          isActive(sub.href)
                            ? "bg-primary text-white"
                            : "text-white hover:bg-primary"
                        }`}
                      >
                        {sub.icon}
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <ul>
          <li className="my-4 px-2">
            <button
              aria-label="Logout from admin panel"
              onClick={handleLogout}
              className=" px-3 py-3 flex items-center gap-2 justify-between rounded-lg text-red-500 hover:bg-red-500 hover:text-white w-full"
            >
              <div className="flex items-center gap-2">
                <IconLogout size={18} />
                {!isCollapsed && "Logout"}
              </div>
              {loading && <IconLoader size={18} className="animate-spin" />}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
