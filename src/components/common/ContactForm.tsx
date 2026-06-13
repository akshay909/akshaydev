"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "@/components/common/Button";
import { IconDiamond } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { contactApi } from "@/services/contactApi";
import { AxiosResponse } from "axios";
import { showMessage } from "@/redux/slices/messageSlice";
import { useAppDispatch } from "@/redux/hooks";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
}

export default function ContactForm() {
  const initialValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  };
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    project: Yup.string().required("Required"),
    message: Yup.string().min(10, "Minimum 10 characters").required("Required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    try {
      const response: AxiosResponse = await contactApi(values);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data?.error || "Failed to submit");
      }
      dispatch(
        showMessage({
          message: "Form Submitted Successfully.",
          status: "success",
        }),
      );
      resetForm();
    } catch (error: any) {
      console.error("Submission error:", error);
      dispatch(
        showMessage({
          message: `Error: ${error.message || "Unknown error"}`,
          status: "error",
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pb-16 ">
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <div className="flex flex-col gap-5">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
           
            className="text-white font-normal flex items-center gap-2 bg-primary px-4 py-1.5 rounded-full w-fit mx-auto text-sm"
          >
            <IconDiamond stroke={2} size={17} /> <span>Contact Me</span>
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
           
            className="flex flex-col gap-4"
          >
            <h2 className="text-3xl md:text-5xl font-[400] text-black/90 dark:text-white">
              Let’s Build Your Next Web Project
            </h2>

            <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
              Share your idea and get a scalable, production-ready solution
              tailored for startups, businesses, and modern SaaS platforms.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
       
        className="max-w-2xl mx-auto px-4"
      >
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 bg-primary/5 text-gray-800 dark:text-white focus:border-primary focus:outline-none rounded-lg px-4 py-3 text-sm"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 bg-primary/5 text-gray-800 dark:text-white focus:border-primary focus:outline-none rounded-lg px-4 py-3 text-sm"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="phone"
                  type="tel"
                  placeholder="Contact Number"
                  className="w-full border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 bg-primary/5 text-gray-800 dark:text-white focus:border-primary focus:outline-none rounded-lg px-4 py-3 text-sm"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  as="select"
                  name="project"
                  className="w-full border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 bg-primary/5 text-gray-800 dark:text-white focus:border-primary focus:outline-none rounded-lg px-4 py-3 text-sm"
                  disabled={isSubmitting}
                >
                  <option value="">Select Project Type</option>
                  <option value="website">Business Website</option>
                  <option value="ecommerce">E-commerce Store</option>
                  <option value="saas">SaaS Platform</option>
                  <option value="custom">Custom Web Application</option>
                  <option value="ai">AI Powered Project</option>
                </Field>
                <ErrorMessage
                  name="project"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 bg-primary/5 text-gray-800 dark:text-white focus:border-primary focus:outline-none rounded-lg px-4 py-3 text-sm"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex items-end justify-end">
                <Button aria-label={isSubmitting ? "Sending inquiry" : "Send inquiry"}
                  name={isSubmitting ? "Sending..." : "Send Inquiry"}
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </section>
  );
}
