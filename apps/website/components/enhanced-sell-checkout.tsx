"use client";

export interface EnhancedSellCheckoutProps {
  vehicleType: string;
  brand: string;
  model: string;
  variant?: string;
  year: string | number;
  kilometers: string;
  condition: unknown;
  onComplete?: () => void;
}

export function EnhancedSellCheckout(_props: EnhancedSellCheckoutProps) {
  return null;
}
