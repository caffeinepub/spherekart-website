import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

const COMPANY_DETAILS = [
  {
    icon: MapPin,
    label: "Address",
    value:
      "123 Commerce Street, Tech Park\nBangalore - 560001\nKarnataka, India",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 80 4567 8900",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@spherekart.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon–Fri: 9:00 AM – 6:00 PM IST",
  },
];

export function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us - Spherekart Ecommerce";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Get in touch with Spherekart Ecommerce Private Limited. Contact our team for ecommerce solutions, pricing, and support.",
      );
  }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { mutate: submitContact, isPending } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitContact(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `${form.subject ? `[${form.subject}] ` : ""}${form.message}`,
      },
      {
        onSuccess: () => {
          toast.success("Message sent! We'll get back to you within 24 hours.");
          setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        },
        onError: () => toast.error("Failed to send message. Please try again."),
      },
    );
  };

  return (
    <main>
      {/* Hero */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(var(--navy-dark)) 0%, oklch(var(--navy)) 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, oklch(var(--orange) / 0.08) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "oklch(var(--orange) / 0.15)",
                color: "oklch(var(--orange))",
              }}
            >
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Have a question or ready to get started? Our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    data-ocid="contact.modal"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium mb-1.5 block"
                        >
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Rajesh Kumar"
                          value={form.name}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                          }
                          required
                          data-ocid="contact.input"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium mb-1.5 block"
                        >
                          Email Address{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="rajesh@example.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          required
                          data-ocid="contact.input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium mb-1.5 block"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, phone: e.target.value }))
                          }
                          data-ocid="contact.input"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="subject"
                          className="text-sm font-medium mb-1.5 block"
                        >
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          value={form.subject}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, subject: e.target.value }))
                          }
                          data-ocid="contact.input"
                        />
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium mb-1.5 block"
                      >
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or question..."
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        required
                        data-ocid="contact.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full text-white font-semibold"
                      style={{ background: "oklch(var(--orange))" }}
                      disabled={isPending}
                      data-ocid="contact.submit_button"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Company details */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Company Information
                </h2>
                <p className="text-muted-foreground">
                  SPHEREKART ECOMMERCE PRIVATE LIMITED
                </p>
              </div>
              {COMPANY_DETAILS.map((detail) => (
                <div key={detail.label} className="flex gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "oklch(var(--navy) / 0.07)" }}
                  >
                    <detail.icon
                      className="h-5 w-5"
                      style={{ color: "oklch(var(--navy))" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {detail.label}
                    </p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div
                className="rounded-2xl overflow-hidden flex items-center justify-center mt-2"
                style={{
                  height: 200,
                  background:
                    "linear-gradient(135deg, oklch(var(--navy) / 0.06) 0%, oklch(var(--navy) / 0.12) 100%)",
                  border: "1px solid oklch(var(--border))",
                }}
              >
                <div className="text-center">
                  <MapPin
                    className="h-10 w-10 mx-auto mb-2"
                    style={{ color: "oklch(var(--navy) / 0.3)" }}
                  />
                  <p className="text-sm text-muted-foreground">
                    Bangalore, Karnataka, India
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
