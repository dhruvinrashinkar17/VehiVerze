import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BlogCategoryContent } from "@/components/blog-category-content"

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <BlogCategoryContent category={params.category} />
      <Footer />
    </main>
  )
}
