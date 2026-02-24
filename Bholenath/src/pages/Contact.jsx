import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle2, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY,
      )
      .then(
        () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setIsSubmitted(false), 5000);
        },
        (error) => {
          setIsSubmitting(false);
          console.error("EmailJS Error:", error);
          alert("Failed to send message. Check console for details.");
        },
      );
  };

  return (
    <section className="relative py-20 px-6 md:py-32 bg-(--bkg) text-(--txt) overflow-hidden">
      <div className="grid items-center grid-cols-1 gap-16 mx-auto max-w-7xl lg:grid-cols-2">
        {/* LEFT: Branding */}
        <div className="flex flex-col gap-8 text-center lg:text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {["LET'S", "GET IN", "TOUCH"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  variants={{ hidden: { y: "100%" }, show: { y: 0 } }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.1,
                  }}
                  className="text-6xl sm:text-8xl md:text-9xl font-black italic leading-[0.85] uppercase"
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-6 lg:items-center"
          >
            <p className="max-w-md text-(--txt-muted) text-lg ">
              Have a project in mind? Let’s build something incredible together.
            </p>
            <a
              href="mailto:patalaybholenath@gmail.com"
              className="flex items-center gap-3 text-lg font-bold transition-all group md:text-xl"
            >
              {/* Icon Container with Yellow Gradient */}
              <div className="p-3 transition-transform duration-300 border rounded-full shadow-lg bg-linear-to-br from-yellow-300 to-yellow-500 border-yellow-400/20 group-hover:scale-110 shadow-yellow-500/20">
                <Mail size={22} className="text-black" />
              </div>

              {/* Text with Yellow Hover Effect */}
              <span className="text-(--txt) underline underline-offset-8 decoration-(--border) group-hover:decoration-yellow-400 group-hover:text-yellow-500 transition-all">
                patalaybholenath@gmail.com
              </span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT: Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 p-6 md:p-10 rounded-3xl border border-(--border)/20 bg-(--bg-light)/5 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  ref={formRef}
                  key="form"
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-(--txt-muted) ml-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-5 py-4 bg-(--bg-light)/10 border ${errors.name ? "border-red-500/50" : "border-(--border)/30"} rounded-2xl outline-none focus:border-(--primary) transition-all`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-(--txt-muted) ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-5 py-4 bg-(--bg-light)/10 border ${errors.email ? "border-red-500/50" : "border-(--border)/30"} rounded-2xl outline-none focus:border-(--primary) transition-all`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-(--txt-muted) ml-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className={`w-full px-5 py-4 bg-(--bg-light)/10 border ${errors.message ? "border-red-500/50" : "border-(--border)/30"} rounded-2xl outline-none focus:border-(--primary) transition-all resize-none`}
                    />
                  </div>

                  <motion.button
                    disabled={isSubmitting}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-2xl bg-linear-to-br from-yellow-300 to-yellow-500 text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-(--primary)/20"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-20 text-center"
                >
                  <div className="p-5 rounded-full bg-(--primary)/10 text-(--primary)">
                    <CheckCircle2 size={60} />
                  </div>
                  <h2 className="text-3xl font-bold">Message Sent!</h2>
                  <p className="text-(--txt-muted)">
                    I'll get back to you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-(--primary)/10 blur-[100px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
