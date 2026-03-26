import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  Lock,
  Pencil,
  Plus,
  Save,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ProductData, ServiceData } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddProduct,
  useAddService,
  useDeleteProduct,
  useDeleteService,
  useGetContactMessages,
  useGetProductsRaw,
  useGetServices,
  useGetSiteContent,
  useIsCallerAdmin,
  useSetSiteContent,
  useUpdateProduct,
  useUpdateService,
} from "../hooks/useQueries";

const CONTENT_KEYS = [
  { key: "hero_title", label: "Hero Title" },
  { key: "hero_subtitle", label: "Hero Subtitle" },
  { key: "about_text", label: "About Text" },
  { key: "contact_email", label: "Contact Email" },
  { key: "contact_phone", label: "Contact Phone" },
  { key: "contact_address", label: "Contact Address" },
];

function SiteContentField({
  keyName,
  label,
}: { keyName: string; label: string }) {
  const { data: value, isLoading } = useGetSiteContent(keyName);
  const { mutate: save, isPending } = useSetSiteContent();
  const [local, setLocal] = useState<string | null>(null);
  const current = local ?? value ?? "";

  return (
    <div className="flex flex-col gap-2">
      <Label className="font-medium">{label}</Label>
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <div className="flex gap-2">
          {keyName === "about_text" || keyName === "hero_subtitle" ? (
            <Textarea
              value={current}
              onChange={(e) => setLocal(e.target.value)}
              rows={3}
              className="flex-1"
              data-ocid="admin.textarea"
            />
          ) : (
            <Input
              value={current}
              onChange={(e) => setLocal(e.target.value)}
              className="flex-1"
              data-ocid="admin.input"
            />
          )}
          <Button
            size="sm"
            className="shrink-0 text-white"
            style={{ background: "oklch(var(--navy))" }}
            disabled={isPending || local === null}
            onClick={() =>
              save(
                { key: keyName, value: current },
                {
                  onSuccess: () => {
                    toast.success(`${label} updated`);
                    setLocal(null);
                  },
                  onError: () => toast.error("Failed to save"),
                },
              )
            }
            data-ocid="admin.save_button"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

type PForm = {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  price: string;
};
type SForm = {
  title: string;
  description: string;
  imageUrl: string;
  features: string;
};

function ProductForm({
  initial,
  onSubmit,
  isPending,
}: {
  initial?: PForm;
  onSubmit: (d: ProductData) => void;
  isPending: boolean;
}) {
  const [f, setF] = useState<PForm>(
    initial ?? {
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      price: "0",
    },
  );
  return (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={f.title}
          onChange={(e) => setF((p) => ({ ...p, title: e.target.value }))}
          data-ocid="admin.input"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={f.description}
          onChange={(e) => setF((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          data-ocid="admin.textarea"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Category</Label>
          <Input
            value={f.category}
            onChange={(e) => setF((p) => ({ ...p, category: e.target.value }))}
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label>Price (₹)</Label>
          <Input
            type="number"
            value={f.price}
            onChange={(e) => setF((p) => ({ ...p, price: e.target.value }))}
            data-ocid="admin.input"
          />
        </div>
      </div>
      <div>
        <Label>Image URL (optional)</Label>
        <Input
          value={f.imageUrl}
          onChange={(e) => setF((p) => ({ ...p, imageUrl: e.target.value }))}
          data-ocid="admin.input"
        />
      </div>
      <Button
        className="w-full text-white"
        style={{ background: "oklch(var(--orange))" }}
        disabled={isPending || !f.title}
        onClick={() =>
          onSubmit({
            ...f,
            price: BigInt(Math.max(0, Number.parseInt(f.price) || 0)),
          })
        }
        data-ocid="admin.submit_button"
      >
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Save Product
      </Button>
    </div>
  );
}

function ServiceForm({
  initial,
  onSubmit,
  isPending,
}: {
  initial?: SForm;
  onSubmit: (d: ServiceData) => void;
  isPending: boolean;
}) {
  const [f, setF] = useState<SForm>(
    initial ?? { title: "", description: "", imageUrl: "", features: "" },
  );
  return (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={f.title}
          onChange={(e) => setF((p) => ({ ...p, title: e.target.value }))}
          data-ocid="admin.input"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={f.description}
          onChange={(e) => setF((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          data-ocid="admin.textarea"
        />
      </div>
      <div>
        <Label>Features (one per line)</Label>
        <Textarea
          value={f.features}
          onChange={(e) => setF((p) => ({ ...p, features: e.target.value }))}
          rows={4}
          placeholder="Feature 1&#10;Feature 2"
          data-ocid="admin.textarea"
        />
      </div>
      <div>
        <Label>Image URL (optional)</Label>
        <Input
          value={f.imageUrl}
          onChange={(e) => setF((p) => ({ ...p, imageUrl: e.target.value }))}
          data-ocid="admin.input"
        />
      </div>
      <Button
        className="w-full text-white"
        style={{ background: "oklch(var(--orange))" }}
        disabled={isPending || !f.title}
        onClick={() =>
          onSubmit({
            ...f,
            features: f.features
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        data-ocid="admin.submit_button"
      >
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Save Service
      </Button>
    </div>
  );
}

export function AdminPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const qc = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: products, isLoading: pLoading } = useGetProductsRaw();
  const { data: services, isLoading: sLoading } = useGetServices();
  const { data: messages, isLoading: mLoading } = useGetContactMessages();

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const addService = useAddService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [addProductOpen, setAddProductOpen] = useState(false);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<{
    id: bigint;
    data: ProductData;
  } | null>(null);
  const [editService, setEditService] = useState<{
    id: bigint;
    data: ServiceData;
  } | null>(null);

  if (adminLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "oklch(var(--orange))" }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(var(--navy))" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="w-full max-w-md shadow-2xl">
            <CardContent className="p-10 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: "oklch(var(--navy) / 0.08)" }}
              >
                <Lock
                  className="h-8 w-8"
                  style={{ color: "oklch(var(--navy))" }}
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Admin Access
              </h2>
              <p className="text-muted-foreground mb-8">
                Sign in with Internet Identity to access the admin panel.
              </p>
              <Button
                className="w-full rounded-full text-white font-semibold"
                style={{ background: "oklch(var(--orange))" }}
                disabled={isLoggingIn}
                onClick={() => login()}
                data-ocid="admin.primary_button"
              >
                {isLoggingIn ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="mr-2 h-4 w-4" />
                )}
                {isLoggingIn
                  ? "Signing in..."
                  : "Sign in with Internet Identity"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(var(--navy))" }}
      >
        <Card
          className="w-full max-w-md shadow-2xl"
          data-ocid="admin.error_state"
        >
          <CardContent className="p-10 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "oklch(0.577 0.245 27.325 / 0.1)" }}
            >
              <Lock className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground">
              Your account does not have admin privileges. Please contact your
              administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.005 240)" }}
    >
      {/* Admin header */}
      <div style={{ background: "oklch(var(--navy))" }} className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
              <p className="text-white/40 text-xs">
                SPHEREKART ECOMMERCE PRIVATE LIMITED
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => {
              if (identity) qc.clear();
            }}
            data-ocid="admin.secondary_button"
          >
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products">
          <TabsList className="mb-6" data-ocid="admin.tab">
            <TabsTrigger value="products" data-ocid="admin.tab">
              Products
            </TabsTrigger>
            <TabsTrigger value="services" data-ocid="admin.tab">
              Services
            </TabsTrigger>
            <TabsTrigger value="content" data-ocid="admin.tab">
              Site Content
            </TabsTrigger>
            <TabsTrigger value="messages" data-ocid="admin.tab">
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Products tab */}
          <TabsContent value="products">
            <Card className="shadow-card">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Products</CardTitle>
                <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="text-white"
                      style={{ background: "oklch(var(--orange))" }}
                      data-ocid="admin.open_modal_button"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent data-ocid="admin.dialog">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <ProductForm
                      isPending={addProduct.isPending}
                      onSubmit={(d) =>
                        addProduct.mutate(d, {
                          onSuccess: () => {
                            toast.success("Product added");
                            setAddProductOpen(false);
                          },
                          onError: () => toast.error("Failed to add product"),
                        })
                      }
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {pLoading ? (
                  <div className="space-y-2" data-ocid="admin.loading_state">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : !products || products.length === 0 ? (
                  <div
                    className="py-12 text-center text-muted-foreground"
                    data-ocid="admin.empty_state"
                  >
                    No products yet. Add your first product above.
                  </div>
                ) : (
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map(([id, product], i) => (
                        <TableRow
                          key={String(id)}
                          data-ocid={`admin.products.row.${i + 1}`}
                        >
                          <TableCell className="text-muted-foreground">
                            {i + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            ₹{Number(product.price).toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Edit */}
                              <Dialog
                                open={editProduct?.id === id}
                                onOpenChange={(o) => !o && setEditProduct(null)}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      setEditProduct({ id, data: product })
                                    }
                                    data-ocid="admin.edit_button"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent data-ocid="admin.dialog">
                                  <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                  </DialogHeader>
                                  <ProductForm
                                    initial={{
                                      title: product.title,
                                      description: product.description,
                                      imageUrl: product.imageUrl,
                                      category: product.category,
                                      price: String(Number(product.price)),
                                    }}
                                    isPending={updateProduct.isPending}
                                    onSubmit={(d) =>
                                      updateProduct.mutate(
                                        { id, product: d },
                                        {
                                          onSuccess: () => {
                                            toast.success("Product updated");
                                            setEditProduct(null);
                                          },
                                          onError: () =>
                                            toast.error("Failed to update"),
                                        },
                                      )
                                    }
                                  />
                                </DialogContent>
                              </Dialog>
                              {/* Delete */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                    data-ocid="admin.delete_button"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent data-ocid="admin.dialog">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete "{product.title}"?
                                    </AlertDialogTitle>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel data-ocid="admin.cancel_button">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-destructive text-destructive-foreground"
                                      onClick={() =>
                                        deleteProduct.mutate(id, {
                                          onSuccess: () =>
                                            toast.success("Product deleted"),
                                          onError: () =>
                                            toast.error("Failed to delete"),
                                        })
                                      }
                                      data-ocid="admin.confirm_button"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services tab */}
          <TabsContent value="services">
            <Card className="shadow-card">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Services</CardTitle>
                <Dialog open={addServiceOpen} onOpenChange={setAddServiceOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="text-white"
                      style={{ background: "oklch(var(--orange))" }}
                      data-ocid="admin.open_modal_button"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent data-ocid="admin.dialog">
                    <DialogHeader>
                      <DialogTitle>Add New Service</DialogTitle>
                    </DialogHeader>
                    <ServiceForm
                      isPending={addService.isPending}
                      onSubmit={(d) =>
                        addService.mutate(d, {
                          onSuccess: () => {
                            toast.success("Service added");
                            setAddServiceOpen(false);
                          },
                          onError: () => toast.error("Failed to add service"),
                        })
                      }
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {sLoading ? (
                  <div className="space-y-2" data-ocid="admin.loading_state">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : !services || services.length === 0 ? (
                  <div
                    className="py-12 text-center text-muted-foreground"
                    data-ocid="admin.empty_state"
                  >
                    No services yet.
                  </div>
                ) : (
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Features</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service, i) => (
                        <TableRow
                          key={String(service.id)}
                          data-ocid={`admin.services.row.${i + 1}`}
                        >
                          <TableCell className="text-muted-foreground">
                            {i + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {service.title}
                          </TableCell>
                          <TableCell className="text-muted-foreground max-w-xs truncate">
                            {service.description}
                          </TableCell>
                          <TableCell>
                            {service.features.length} features
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Dialog
                                open={editService?.id === service.id}
                                onOpenChange={(o) => !o && setEditService(null)}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      setEditService({
                                        id: service.id,
                                        data: service,
                                      })
                                    }
                                    data-ocid="admin.edit_button"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent data-ocid="admin.dialog">
                                  <DialogHeader>
                                    <DialogTitle>Edit Service</DialogTitle>
                                  </DialogHeader>
                                  <ServiceForm
                                    initial={{
                                      title: service.title,
                                      description: service.description,
                                      imageUrl: service.imageUrl,
                                      features: service.features.join("\n"),
                                    }}
                                    isPending={updateService.isPending}
                                    onSubmit={(d) =>
                                      updateService.mutate(
                                        { id: service.id, service: d },
                                        {
                                          onSuccess: () => {
                                            toast.success("Service updated");
                                            setEditService(null);
                                          },
                                          onError: () =>
                                            toast.error("Failed to update"),
                                        },
                                      )
                                    }
                                  />
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                    data-ocid="admin.delete_button"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent data-ocid="admin.dialog">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete "{service.title}"?
                                    </AlertDialogTitle>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel data-ocid="admin.cancel_button">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-destructive text-destructive-foreground"
                                      onClick={() =>
                                        deleteService.mutate(service.id, {
                                          onSuccess: () =>
                                            toast.success("Service deleted"),
                                          onError: () =>
                                            toast.error("Failed to delete"),
                                        })
                                      }
                                      data-ocid="admin.confirm_button"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Content tab */}
          <TabsContent value="content">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Site Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {CONTENT_KEYS.map((ck) => (
                  <SiteContentField
                    key={ck.key}
                    keyName={ck.key}
                    label={ck.label}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages tab */}
          <TabsContent value="messages">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {mLoading ? (
                  <div className="space-y-2" data-ocid="admin.loading_state">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : !messages || messages.length === 0 ? (
                  <div
                    className="py-12 text-center text-muted-foreground"
                    data-ocid="admin.empty_state"
                  >
                    No messages yet.
                  </div>
                ) : (
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((msg, i) => (
                        <TableRow
                          key={`${msg.email}-${i}`}
                          data-ocid={`admin.messages.row.${i + 1}`}
                        >
                          <TableCell className="font-medium">
                            {msg.name}
                          </TableCell>
                          <TableCell>{msg.email}</TableCell>
                          <TableCell>{msg.phone}</TableCell>
                          <TableCell className="max-w-xs truncate text-muted-foreground">
                            {msg.message}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(
                              Number(msg.timestamp) / 1_000_000,
                            ).toLocaleDateString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
