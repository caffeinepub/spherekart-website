import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProductData, ServiceData } from "../backend.d";
import { useActor } from "./useActor";

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<ProductData & { id: bigint }>>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      const products = await actor.getProducts();
      return products.map((p, i) => ({ ...p, id: BigInt(i) }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsRaw() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[bigint, ProductData]>>({
    queryKey: ["products-raw"],
    queryFn: async () => {
      if (!actor) return [];
      const products = await actor.getProducts();
      return products.map((p, i) => [BigInt(i), p] as [bigint, ProductData]);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<ServiceData & { id: bigint }>>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      const services = await actor.getServices();
      return services.map((s, i) => ({ ...s, id: BigInt(i) }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSiteContent(key: string) {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ["site-content", key],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteContent(key);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContactMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (product: ProductData) => actor!.addProduct(product),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }: { id: bigint; product: ProductData }) =>
      actor!.updateProduct(id, product),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useAddService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (service: ServiceData) => actor!.addService(service),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, service }: { id: bigint; service: ServiceData }) =>
      actor!.updateService(id, service),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useDeleteService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteService(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useSetSiteContent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) =>
      actor!.setSiteContent(key, value),
    onSuccess: (_, { key }) =>
      qc.invalidateQueries({ queryKey: ["site-content", key] }),
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: ({
      name,
      email,
      phone,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => actor!.submitContact(name, email, phone, message),
  });
}
