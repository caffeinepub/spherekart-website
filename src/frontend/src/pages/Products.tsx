import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  Headphones,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useGetProducts, useGetServices } from "../hooks/useQueries";

const SAMPLE_PRODUCTS = [
  {
    id: 0,
    title: "Ecommerce Starter",
    description:
      "Launch your online store in days. Includes hosting, SSL, payment gateway integration, and a customizable storefront.",
    category: "Platform",
    price: BigInt(4999),
    imageUrl: "",
  },
  {
    id: 1,
    title: "Ecommerce Pro",
    description:
      "Advanced features including multi-warehouse inventory, AI-driven recommendations, and priority support.",
    category: "Platform",
    price: BigInt(14999),
    imageUrl: "",
  },
  {
    id: 2,
    title: "Logistics Package",
    description:
      "Automated order routing, real-time tracking, returns management, and courier integrations with all major carriers.",
    category: "Logistics",
    price: BigInt(7999),
    imageUrl: "",
  },
  {
    id: 3,
    title: "Analytics Suite",
    description:
      "Comprehensive dashboards covering sales, customer lifetime value, inventory health, and marketing attribution.",
    category: "Analytics",
    price: BigInt(3499),
    imageUrl: "",
  },
  {
    id: 4,
    title: "Payment Gateway",
    description:
      "PCI-DSS compliant payment processing with UPI, card, net banking, EMI, and BNPL support.",
    category: "Payments",
    price: BigInt(2999),
    imageUrl: "",
  },
  {
    id: 5,
    title: "Enterprise Suite",
    description:
      "Custom SLA, dedicated infrastructure, white-label branding, and a dedicated account manager.",
    category: "Enterprise",
    price: BigInt(49999),
    imageUrl: "",
  },
];

const SAMPLE_SERVICES = [
  {
    id: 0,
    title: "Onboarding & Setup",
    description:
      "Our experts handle complete store setup, migration, and team training so you launch without stress.",
    features: [
      "Store configuration",
      "Data migration",
      "Staff training",
      "Go-live support",
    ],
    imageUrl: "",
  },
  {
    id: 1,
    title: "24/7 Support",
    description:
      "Round-the-clock expert support via chat, email, and phone with guaranteed response times.",
    features: [
      "Live chat support",
      "Email ticketing",
      "Phone support",
      "Dedicated manager",
    ],
    imageUrl: "",
  },
  {
    id: 2,
    title: "Performance Optimization",
    description:
      "Technical audits and continuous improvements to maximize your store speed, conversion, and SEO.",
    features: [
      "Speed audit",
      "SEO optimization",
      "A/B testing",
      "CRO consulting",
    ],
    imageUrl: "",
  },
  {
    id: 3,
    title: "Custom Development",
    description:
      "Bespoke integrations, custom features, and third-party API connections tailored to your workflow.",
    features: [
      "API integrations",
      "Custom plugins",
      "ERP connectors",
      "Mobile apps",
    ],
    imageUrl: "",
  },
];

const ICONS: Record<string, React.ElementType> = {
  Platform: Globe,
  Logistics: TrendingUp,
  Analytics: BarChart3,
  Payments: ShieldCheck,
  Enterprise: Zap,
  default: Globe,
};

const PRICING_PLANS = [
  {
    name: "Starter Pack",
    price: "₹94,999",
    tagline: "Perfect for new businesses",
    popular: false,
    features: [
      "Fully hosted online store",
      "Up to 500 products",
      "Payment gateway integration",
      "Basic SEO tools",
      "Email support",
      "SSL certificate included",
    ],
  },
  {
    name: "Growth Pack",
    price: "₹1,49,999",
    tagline: "Best for growing brands",
    popular: true,
    features: [
      "Everything in Starter",
      "Up to 5,000 products",
      "Multi-warehouse logistics",
      "Advanced analytics dashboard",
      "Priority 24/7 support",
      "Custom domain & branding",
      "UPI, EMI & BNPL payments",
    ],
  },
  {
    name: "Enterprise Pack",
    price: "₹2,69,999",
    tagline: "For large-scale operations",
    popular: false,
    features: [
      "Everything in Growth",
      "Unlimited products",
      "Dedicated infrastructure",
      "White-label branding",
      "Dedicated account manager",
      "Custom SLA & integrations",
      "ERP & CRM connectors",
      "Mobile app development",
    ],
  },
];

export function ProductsPage() {
  useEffect(() => {
    document.title = "Products & Services - Spherekart Ecommerce Solutions";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Explore Spherekart's full suite of ecommerce products and services: Starter Pack ₹94,999, Growth Pack ₹1,49,999, Enterprise Pack ₹2,69,999. Platforms, logistics, analytics, payments.",
      );
  }, []);
  const { data: products, isLoading: pLoading } = useGetProducts();
  const { data: services, isLoading: sLoading } = useGetServices();
  const [activeTab, setActiveTab] = useState("products");

  const displayProducts =
    products && products.length > 0 ? products : SAMPLE_PRODUCTS;
  const displayServices =
    services && services.length > 0 ? services : SAMPLE_SERVICES;

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
              "radial-gradient(ellipse at 70% 40%, oklch(var(--orange) / 0.08) 0%, transparent 60%)",
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
              Products &amp; Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Everything You Need to Sell Online
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              From storefront technology to last-mile delivery — explore our
              full suite of ecommerce products and professional services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-10">
              <TabsList
                className="rounded-full px-1 py-1"
                style={{ background: "oklch(var(--navy) / 0.06)" }}
              >
                <TabsTrigger
                  value="products"
                  className="rounded-full px-8 data-[state=active]:text-white"
                  data-ocid="products.tab"
                >
                  Products
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="rounded-full px-8 data-[state=active]:text-white"
                  data-ocid="products.tab"
                >
                  Services
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="products">
              {pLoading ? (
                <div
                  className="text-center py-12 text-muted-foreground"
                  data-ocid="products.loading_state"
                >
                  Loading products...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProducts.map((product, i) => {
                    const Icon = ICONS[product.category] || ICONS.default;
                    return (
                      <motion.div
                        key={product.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        data-ocid={`products.item.${i + 1}`}
                      >
                        <Card className="h-full shadow-card hover:shadow-lg transition-shadow border-border">
                          <CardContent className="p-6 flex flex-col h-full">
                            <div
                              className="w-full h-40 rounded-xl flex items-center justify-center mb-5"
                              style={{
                                background: "oklch(var(--navy) / 0.05)",
                              }}
                            >
                              <Icon
                                className="h-16 w-16"
                                style={{ color: "oklch(var(--navy) / 0.3)" }}
                              />
                            </div>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-foreground">
                                {product.title}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="ml-2 shrink-0"
                              >
                                {product.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground flex-1 mb-4">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span
                                className="text-lg font-bold"
                                style={{ color: "oklch(var(--navy))" }}
                              >
                                ₹{Number(product.price).toLocaleString("en-IN")}
                                <span className="text-xs font-normal text-muted-foreground">
                                  /mo
                                </span>
                              </span>
                              <Link to="/contact">
                                <Button
                                  size="sm"
                                  className="rounded-full text-white"
                                  style={{ background: "oklch(var(--orange))" }}
                                  data-ocid="products.primary_button"
                                >
                                  Get Started{" "}
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="services">
              {sLoading ? (
                <div
                  className="text-center py-12 text-muted-foreground"
                  data-ocid="services.loading_state"
                >
                  Loading services...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {displayServices.map((service, i) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      data-ocid={`services.item.${i + 1}`}
                    >
                      <Card className="h-full shadow-card border-border">
                        <CardContent className="p-7">
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center"
                              style={{
                                background: "oklch(var(--orange) / 0.1)",
                              }}
                            >
                              <Headphones
                                className="h-6 w-6"
                                style={{ color: "oklch(var(--orange))" }}
                              />
                            </div>
                            <h3 className="font-bold text-lg text-foreground">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                            {service.description}
                          </p>
                          <ul className="space-y-2">
                            {service.features.map((f) => (
                              <li
                                key={f}
                                className="flex items-center gap-2 text-sm text-foreground/80"
                              >
                                <CheckCircle2
                                  className="h-4 w-4 shrink-0"
                                  style={{ color: "oklch(var(--orange))" }}
                                />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Plans */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(180deg, oklch(var(--navy-dark)) 0%, oklch(var(--navy)) 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "oklch(var(--orange) / 0.15)",
                color: "oklch(var(--orange))",
              }}
            >
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Choose the Right Plan for Your Business
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              One-time setup pricing — no hidden fees, no monthly lock-ins.
              Scale as you grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative flex"
                data-ocid={`pricing.item.${i + 1}`}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: "oklch(var(--orange))" }}
                  >
                    Most Popular
                  </div>
                )}
                <div
                  className="w-full rounded-2xl p-8 flex flex-col"
                  style={{
                    background: plan.popular
                      ? "oklch(0.22 0.07 240)"
                      : "oklch(0.17 0.05 240 / 0.7)",
                    border: plan.popular
                      ? "2px solid oklch(var(--orange))"
                      : "1px solid oklch(1 0 0 / 0.1)",
                    boxShadow: plan.popular
                      ? "0 8px 40px oklch(var(--orange) / 0.15)"
                      : "none",
                  }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-white/50 text-sm">{plan.tagline}</p>
                  </div>
                  <div className="mb-8">
                    <span
                      className="text-4xl font-extrabold"
                      style={{
                        color: plan.popular ? "oklch(var(--orange))" : "white",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-white/40 text-sm ml-2">one-time</span>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/75"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 mt-0.5"
                          style={{ color: "oklch(var(--orange))" }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button
                      className="w-full rounded-full font-semibold"
                      style={{
                        background: plan.popular
                          ? "oklch(var(--orange))"
                          : "transparent",
                        color: plan.popular ? "white" : "oklch(var(--orange))",
                        border: plan.popular
                          ? "none"
                          : "1.5px solid oklch(var(--orange))",
                      }}
                      data-ocid={`pricing.primary_button.${i + 1}`}
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
