import type { Link } from "@/types/Link"; 
import type { Stat } from "@/types/Stat";
export interface FormData {
  name: string;
  symbol: string;
  description: string;
  storyArc: string;
  stats: Stat[];
  links: Link[];
  payoutRecipient: string;
  platformReferrer: string;
  initialPurchaseAmount: string;
}