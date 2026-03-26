import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Globe,
  Headphones,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useGetProducts } from "../hooks/useQueries";

const SAMPLE_PRODUCTS = [
  {
    id: 0,
    title: "Ecommerce Platform",
    description:
      "Full-featured online store with customizable themes, SEO tools, and multi-currency support.",
    category: "Platform",
    icon: Globe,
  },
  {
    id: 1,
    title: "Logistics Suite",
    description:
      "End-to-end delivery management with real-time tracking and automated dispatch.",
    category: "Logistics",
    icon: TrendingUp,
  },
  {
    id: 2,
    title: "Payment Gateway",
    description:
      "Secure, fast payment processing supporting UPI, cards, net banking, and wallets.",
    category: "Payments",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description:
      "Deep insights into sales, customer behavior, and inventory with live reporting.",
    category: "Analytics",
    icon: Clock,
  },
];

const PARTNERS = [
  "TechCorp India",
  "RetailHub",
  "ShopNow",
  "MegaMart",
  "QuickBuy",
  "Bersache Shoes",
];

const FEATURES = [
  {
    title: "Reliable Infrastructure",
    description: "99.9% uptime SLA backed by multi-region cloud deployments.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Expert Support",
    description: "Dedicated support engineers available around the clock.",
    icon: Headphones,
  },
  {
    title: "Secure Transactions",
    description: "PCI-DSS compliant payments with end-to-end encryption.",
    icon: Zap,
  },
  {
    title: "End-to-End Solutions",
    description:
      "From storefront to last-mile delivery \u2014 one unified platform.",
    icon: Globe,
  },
];

const HERO_STATS = [
  {
    label: "Clients Served",
    value: "500+",
    icon: Users,
    color: "oklch(0.7 0.19 50)",
  },
  {
    label: "System Uptime",
    value: "99.9%",
    icon: ShieldCheck,
    color: "oklch(0.65 0.18 160)",
  },
  {
    label: "Support Coverage",
    value: "24/7",
    icon: Headphones,
    color: "oklch(0.65 0.18 230)",
  },
  {
    label: "Orders Processed",
    value: "10M+",
    icon: TrendingUp,
    color: "oklch(0.72 0.18 310)",
  },
];

export function HomePage() {
  useEffect(() => {
    document.title =
      "Spherekart - India's Premier Ecommerce Solutions Provider";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Spherekart Ecommerce Private Limited - Empowering Indian businesses with ecommerce platforms, logistics, payments, and 24/7 support.",
      );
  }, []);
  const { data: products } = useGetProducts();
  const displayProducts =
    products && products.length > 0 ? products.slice(0, 4) : null;

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[80vh] flex items-center"
        style={{ background: "oklch(var(--navy-dark))" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 w-1/2 h-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.07 240 / 0.9) 0%, oklch(0.13 0.055 240 / 0.95) 100%)",
            }}
          />
          <div
            className="absolute right-0 top-0 w-1/2 h-full"
            style={{
              background:
                "radial-gradient(ellipse at 70% 40%, oklch(0.7 0.19 50 / 0.08) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
                style={{
                  background: "oklch(0.7 0.19 50 / 0.2)",
                  color: "oklch(0.7 0.19 50)",
                }}
              >
                #1 Ecommerce Solutions Provider in India
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                India's Premier{" "}
                <span style={{ color: "oklch(0.7 0.19 50)" }}>Ecommerce</span>{" "}
                Solutions Provider
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Empowering businesses with cutting-edge ecommerce technology,
                seamless logistics, and world-class customer support.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="rounded-full px-7 text-white font-semibold"
                    style={{ background: "oklch(0.7 0.19 50)" }}
                    data-ocid="hero.primary_button"
                  >
                    Explore Our Solutions
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-7 border-white/30 text-white hover:bg-white/10"
                    data-ocid="hero.secondary_button"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {HERO_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: "oklch(0.19 0.055 240 / 0.8)",
                    border: "1px solid oklch(1 0 0 / 0.08)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `${stat.color.replace(")", " / 0.15)")}`,
                    }}
                  >
                    <stat.icon
                      className="h-5 w-5"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12 border-y border-border bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
            Trusted by leading businesses across India
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {PARTNERS.map((partner) => (
              <div
                key={partner}
                className="px-6 py-3 rounded-full text-sm font-semibold text-foreground/60 border border-border bg-card"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Featured Products &amp; Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive solutions designed to power your ecommerce business
              from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(displayProducts || SAMPLE_PRODUCTS).map((p, i) => {
              const Icon = "icon" in p ? p.icon : Globe;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="h-full shadow-card border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "oklch(0.7 0.19 50 / 0.1)" }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: "oklch(0.7 0.19 50)" }}
                        />
                      </div>
                      <span
                        className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 self-start"
                        style={{
                          background: "oklch(0.19 0.055 240 / 0.07)",
                          color: "oklch(0.19 0.055 240)",
                        }}
                      >
                        {p.category}
                      </span>
                      <h3 className="font-bold text-foreground mb-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex-1 mb-4">
                        {p.description}
                      </p>
                      <Link
                        to="/products"
                        className="text-sm font-semibold flex items-center gap-1"
                        style={{ color: "oklch(0.7 0.19 50)" }}
                        data-ocid="home.products.link"
                      >
                        View Details <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Spherekart */}
      <section
        className="py-20"
        style={{ background: "oklch(0.97 0.005 240)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose{" "}
                <span style={{ color: "oklch(0.7 0.19 50)" }}>Spherekart?</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We combine deep industry expertise with powerful technology to
                help Indian businesses sell smarter, ship faster, and grow
                bigger. Our integrated platform handles everything so you can
                focus on what matters \u2014 your customers.
              </p>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="rounded-full"
                  style={{
                    borderColor: "oklch(0.7 0.19 50)",
                    color: "oklch(0.7 0.19 50)",
                  }}
                  data-ocid="why.secondary_button"
                >
                  Learn About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="border-border shadow-card h-full">
                    <CardContent className="p-5">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: "oklch(0.19 0.055 240 / 0.07)" }}
                      >
                        <feature.icon
                          className="h-5 w-5"
                          style={{ color: "oklch(0.19 0.055 240)" }}
                        />
                      </div>
                      <h3 className="font-bold text-sm text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="py-16"
        style={{ background: "oklch(0.19 0.055 240)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Join 500+ businesses that trust Spherekart to power their ecommerce
            operations.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-full px-8 text-white font-semibold"
              style={{ background: "oklch(0.7 0.19 50)" }}
              data-ocid="cta.primary_button"
            >
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
