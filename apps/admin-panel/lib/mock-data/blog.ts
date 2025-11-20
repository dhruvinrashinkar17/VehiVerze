export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  featuredImage: string
  category: string
  tags: string[]
  author: string
  status: "draft" | "published" | "scheduled"
  views: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  scheduledFor?: Date
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  seoScore: number
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  usageCount: number
}

export interface BlogSettings {
  blogTitle: string
  blogSubtitle: string
  defaultAuthor: string
  homepageLayout: "grid" | "list" | "cards"
  enableComments: boolean
  enableSocialSharing: boolean
  defaultFeaturedImage: string
}

// Mock blog posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Getting Started with Vehiverze: A Complete Guide",
    slug: "getting-started-vehiverze-guide",
    description: "Learn how to use Vehiverze to buy and sell vehicles efficiently with our comprehensive guide.",
    content: "This is a comprehensive guide on how to get started with Vehiverze platform...",
    featuredImage: "/vehicle-buying-platform-guide.jpg",
    category: "guides",
    tags: ["beginner", "tutorial", "getting-started"],
    author: "Admin",
    status: "published",
    views: 2450,
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-10"),
    publishedAt: new Date("2024-11-01"),
    metaTitle: "Getting Started with Vehiverze - Complete Guide",
    metaDescription: "Learn how to use Vehiverze platform with this step-by-step guide for buyers and sellers.",
    focusKeyword: "vehiverze guide",
    seoScore: 85,
  },
  {
    id: "post-2",
    title: "Top 5 Tips for Selling Your Vehicle Online",
    slug: "tips-selling-vehicle-online",
    description: "Discover proven strategies to sell your vehicle faster and get better prices.",
    content: "When selling your vehicle online, timing and presentation are key...",
    featuredImage: "/vehicle-selling-tips.jpg",
    category: "tips",
    tags: ["selling", "tips", "pricing"],
    author: "Admin",
    status: "published",
    views: 1820,
    createdAt: new Date("2024-11-05"),
    updatedAt: new Date("2024-11-08"),
    publishedAt: new Date("2024-11-05"),
    metaTitle: "5 Tips for Selling Your Vehicle - Vehiverze Blog",
    metaDescription: "Get the best price when selling your vehicle with these 5 proven tips.",
    focusKeyword: "selling vehicle tips",
    seoScore: 78,
  },
  {
    id: "post-3",
    title: "Understanding Vehicle Valuation: What Affects Your Car's Worth?",
    slug: "vehicle-valuation-worth",
    description: "Learn what factors determine your vehicle's market value and how to get accurate estimates.",
    content: "Many factors influence a vehicle's valuation in the current market...",
    featuredImage: "/vehicle-valuation-pricing.jpg",
    category: "education",
    tags: ["valuation", "pricing", "market"],
    author: "Admin",
    status: "draft",
    views: 0,
    createdAt: new Date("2024-11-12"),
    updatedAt: new Date("2024-11-12"),
    metaTitle: "Vehicle Valuation Guide - Factors Affecting Your Car's Worth",
    metaDescription: "Understand how vehicle valuation works and what affects your car's market price.",
    focusKeyword: "vehicle valuation",
    seoScore: 65,
  },
  {
    id: "post-4",
    title: "Introducing Live Bidding: Revolutionary Way to Sell Your Vehicle",
    slug: "live-bidding-feature",
    description: "Discover how Vehiverze's live bidding feature helps you get the best offers for your vehicle.",
    content: "Our new live bidding feature allows sellers to receive bids in real-time...",
    featuredImage: "/live-bidding-auction.jpg",
    category: "features",
    tags: ["bidding", "new-feature", "selling"],
    author: "Admin",
    status: "scheduled",
    views: 0,
    createdAt: new Date("2024-11-10"),
    updatedAt: new Date("2024-11-12"),
    scheduledFor: new Date("2024-11-15"),
    metaTitle: "Live Bidding Feature - Get Best Offers on Your Vehicle",
    metaDescription: "Learn about Vehiverze's innovative live bidding feature for selling vehicles.",
    focusKeyword: "live bidding vehicles",
    seoScore: 72,
  },
]

// Mock categories
export const mockCategories: BlogCategory[] = [
  { id: "cat-1", name: "Guides", slug: "guides", description: "Step-by-step guides for using Vehiverze", postCount: 5 },
  { id: "cat-2", name: "Tips", slug: "tips", description: "Tips and tricks for buying and selling", postCount: 12 },
  { id: "cat-3", name: "Education", slug: "education", description: "Educational content about vehicles", postCount: 8 },
  { id: "cat-4", name: "Features", slug: "features", description: "New features and updates", postCount: 3 },
]

// Mock tags
export const mockTags: BlogTag[] = [
  { id: "tag-1", name: "beginner", slug: "beginner", usageCount: 8 },
  { id: "tag-2", name: "tutorial", slug: "tutorial", usageCount: 6 },
  { id: "tag-3", name: "selling", slug: "selling", usageCount: 15 },
  { id: "tag-4", name: "buying", slug: "buying", usageCount: 12 },
  { id: "tag-5", name: "tips", slug: "tips", usageCount: 18 },
  { id: "tag-6", name: "pricing", slug: "pricing", usageCount: 7 },
]

// Mock blog settings
export const mockBlogSettings: BlogSettings = {
  blogTitle: "Vehiverze Blog",
  blogSubtitle: "Your complete guide to buying and selling vehicles",
  defaultAuthor: "Vehiverze Team",
  homepageLayout: "cards",
  enableComments: true,
  enableSocialSharing: true,
  defaultFeaturedImage: "/blog-default.jpg",
}


