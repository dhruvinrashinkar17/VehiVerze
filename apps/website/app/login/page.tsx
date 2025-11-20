import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { LoginContent } from "@/components/login-content"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <LoginContent />
      <Footer />
    </main>
  )
}


