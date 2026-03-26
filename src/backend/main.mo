import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // TYPES AND HELPERS
  type ProductData = {
    title : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
  };

  type ServiceData = {
    title : Text;
    description : Text;
    features : [Text];
    imageUrl : Text;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  module ServiceData {
    public func compare(service1 : ServiceData, service2 : ServiceData) : Order.Order {
      Text.compare(service1.title, service2.title);
    };
  };

  module ProductData {
    public func compare(product1 : ProductData, product2 : ProductData) : Order.Order {
      Text.compare(product1.title, product2.title);
    };
  };

  // STATE
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Nat, ProductData>();
  let services = Map.empty<Nat, ServiceData>();
  let siteContent = Map.empty<Text, Text>();
  let contactMessages = Map.empty<Nat, ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextProductId = 1;
  var nextServiceId = 1;

  // USER PROFILE LOGIC

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // PRODUCT LOGIC

  public query ({ caller }) func getProducts() : async [ProductData] {
    products.values().toArray().sort();
  };

  public shared ({ caller }) func addProduct(product : ProductData) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let productId = nextProductId;
    nextProductId += 1;
    products.add(productId, product);
    productId;
  };

  public shared ({ caller }) func updateProduct(productId : Nat, product : ProductData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not products.containsKey(productId)) { Runtime.trap("Product does not exist") };
    products.add(productId, product);
  };

  public shared ({ caller }) func deleteProduct(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not products.containsKey(productId)) { Runtime.trap("Product does not exist") };
    products.remove(productId);
  };

  // SERVICE LOGIC

  public query ({ caller }) func getServices() : async [ServiceData] {
    services.values().toArray().sort();
  };

  public shared ({ caller }) func addService(service : ServiceData) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let serviceId = nextServiceId;
    nextServiceId += 1;
    services.add(serviceId, service);
    serviceId;
  };

  public shared ({ caller }) func updateService(serviceId : Nat, service : ServiceData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not services.containsKey(serviceId)) { Runtime.trap("Service does not exist") };
    services.add(serviceId, service);
  };

  public shared ({ caller }) func deleteService(serviceId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not services.containsKey(serviceId)) { Runtime.trap("Service does not exist") };
    services.remove(serviceId);
  };

  // SITE CONTENT LOGIC

  public shared ({ caller }) func setSiteContent(key : Text, value : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    siteContent.add(key, value);
  };

  public query ({ caller }) func getSiteContent(key : Text) : async ?Text {
    siteContent.get(key);
  };

  // CONTACT MESSAGE LOGIC

  public shared ({ caller }) func submitContact(
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : async () {
    let messageId = Time.now().toNat();

    let contact : ContactMessage = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    contactMessages.add(messageId, contact);
  };

  public shared ({ caller }) func getContactMessages() : async [ContactMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    contactMessages.values().toArray();
  };
};
