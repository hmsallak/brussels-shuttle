export interface BillingAddress {
  id?: number;
  street: string;
  locality: string;
  postalCode: string;
  country: string;
  identifier?: string;
  registeredName?: string;
}
