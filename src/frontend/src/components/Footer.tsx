import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Mail, ShoppingCart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer style={{ background: "oklch(var(--navy))" }} className="text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                SPHEREKART
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              SPHEREKART ECOMMERCE PRIVATE LIMITED — empowering businesses with
              cutting-edge ecommerce technology across India.
            </p>
            {/* Newsletter */}
            <p className="text-sm font-semibold mb-2">Newsletter Signup</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-orange"
                data-ocid="footer.input"
              />
              <Button
                className="shrink-0 text-white"
                style={{ background: "oklch(var(--orange))" }}
                data-ocid="footer.primary_button"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                "Ecommerce Platform",
                "Logistics & Delivery",
                "Payment Gateway",
                "Inventory Management",
                "Analytics",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/products"
                    className="hover:text-orange transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { label: "About Us", to: "/about" },
                { label: "Products", to: "/products" },
                { label: "Contact", to: "/contact" },
                { label: "Admin Panel", to: "/admin" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="hover:text-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Refund Policy",
              ].map((item) => (
                <li key={item}>
                  <span className="hover:text-orange transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>
            © {year} SPHEREKART ECOMMERCE PRIVATE LIMITED. All rights reserved.
          </span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange/70 hover:text-orange transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
