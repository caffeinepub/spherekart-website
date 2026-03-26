import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Eye,
  Heart,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const STATS = [
  { value: "500+", label: "Clients Served", icon: Users },
  { value: "50+", label: "Team Members", icon: Zap },
  { value: "10+", label: "Years Experience", icon: Clock },
  { value: "99.9%", label: "Uptime SLA", icon: TrendingUp },
];

const MVV = [
  {
    title: "Our Mission",
    icon: Target,
    text: "To democratize ecommerce in India by providing businesses of all sizes with enterprise-grade technology, seamless logistics, and expert support — all at an accessible price point.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    text: "To become the most trusted ecommerce infrastructure partner in South Asia, enabling 10,000+ businesses to thrive in the digital economy by 2030.",
  },
  {
    title: "Our Values",
    icon: Heart,
    text: "Customer obsession, radical transparency, continuous innovation, and an unwavering commitment to reliability drive every decision we make.",
  },
];

export function AboutPage() {
  useEffect(() => {
    document.title = "About Us - Spherekart Ecommerce Private Limited";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Learn about Spherekart Ecommerce Private Limited - our mission, team, and commitment to empowering Indian businesses with world-class ecommerce solutions.",
      );
  }, []);
  return (
    <main>
      {/* Page hero */}
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
              "radial-gradient(ellipse at 30% 60%, oklch(var(--orange) / 0.08) 0%, transparent 60%)",
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
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Building India's Ecommerce Future
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Learn about our journey, mission, and the team behind India's most
              trusted ecommerce solutions platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our <span style={{ color: "oklch(var(--orange))" }}>Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">
                    SPHEREKART ECOMMERCE PRIVATE LIMITED
                  </strong>{" "}
                  is a leading ecommerce solutions provider based in Bangalore,
                  India. Founded with a bold vision to transform how businesses
                  sell online, we have grown from a small tech startup to a
                  trusted platform serving 500+ enterprises across India.
                </p>
                <p>
                  We offer end-to-end services covering storefront technology,
                  secure payment processing, logistics and warehousing, customer
                  support tooling, and powerful analytics — everything a modern
                  commerce business needs under one roof.
                </p>
                <p>
                  Our team of 50+ engineers, logistics specialists, and customer
                  success managers work tirelessly to ensure your business
                  operates at peak performance, every day.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(var(--navy)) 0%, oklch(0.28 0.06 230) 100%)",
                }}
              >
                <div className="text-center p-12">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ background: "oklch(var(--orange) / 0.15)" }}
                  >
                    <TrendingUp
                      className="h-10 w-10"
                      style={{ color: "oklch(var(--orange))" }}
                    />
                  </div>
                  <p className="text-white/80 font-semibold text-xl">
                    Est. 2014
                  </p>
                  <p className="text-white/40 text-sm mt-2">
                    Bangalore, Karnataka, India
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {STATS.slice(0, 2).map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {s.value}
                        </div>
                        <div className="text-xs text-white/40">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section
        className="py-20"
        style={{ background: "oklch(0.97 0.005 240)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Mission, Vision &amp; Values
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MVV.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full shadow-card">
                  <CardContent className="p-8">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: "oklch(var(--navy) / 0.08)" }}
                    >
                      <item.icon
                        className="h-6 w-6"
                        style={{ color: "oklch(var(--navy))" }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: "oklch(var(--navy))" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to grow with us?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Partner with Spherekart and unlock the full potential of your
            ecommerce business.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-full px-8 text-white font-semibold"
              style={{ background: "oklch(var(--orange))" }}
              data-ocid="about.primary_button"
            >
              Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
