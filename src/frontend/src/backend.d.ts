import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ServiceData {
    title: string;
    features: Array<string>;
    description: string;
    imageUrl: string;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface ProductData {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: ProductData): Promise<bigint>;
    addService(service: ServiceData): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(productId: bigint): Promise<void>;
    deleteService(serviceId: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getProducts(): Promise<Array<ProductData>>;
    getServices(): Promise<Array<ServiceData>>;
    getSiteContent(key: string): Promise<string | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setSiteContent(key: string, value: string): Promise<void>;
    submitContact(name: string, email: string, phone: string, message: string): Promise<void>;
    updateProduct(productId: bigint, product: ProductData): Promise<void>;
    updateService(serviceId: bigint, service: ServiceData): Promise<void>;
}
