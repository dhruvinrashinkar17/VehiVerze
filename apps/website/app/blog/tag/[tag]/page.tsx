import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BlogTagContent } from "@/components/blog-tag-content"

export default function BlogTagPage({ params }: { params: { tag: string } }) {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <BlogTagContent tag={params.tag} />
      <Footer />
    </main>
  )
}
