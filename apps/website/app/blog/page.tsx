import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BlogContent } from "@/components/blog-content"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <BlogContent />
      <Footer />
    </main>
  )
}


