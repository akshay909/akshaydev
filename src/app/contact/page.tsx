import type { Metadata } from "next";
import React from "react";
import ContactForm from "@/components/common/ContactForm";
import ContactData from "@/components/common/ContactData";
import CommonLayout from "@/components/common/CommonLayout";

export const metadata: Metadata = {
  title: `Contact ${process.env.NEXT_PUBLIC_OWNER_NAME} | Hire Full Stack Developer`,
  description:
    "Get in touch with " +
    (process.env.NEXT_PUBLIC_OWNER_NAME) +
    " for freelance or full stack web development projects using React, Next.js, and Node.js.",
};

export default function Page() {
  return (
    <CommonLayout>
      <div className="pt-16">
        <ContactData/>
        {/* <ContactForm /> */}
      </div>
    </CommonLayout>
  );
}
