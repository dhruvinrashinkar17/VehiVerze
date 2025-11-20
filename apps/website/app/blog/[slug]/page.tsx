import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BlogPostContent } from "@/components/blog-post-content"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <BlogPostContent slug={params.slug} />
      <Footer />
    </main>
  )
}
