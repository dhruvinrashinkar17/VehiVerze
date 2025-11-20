"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Button } from "@vehiverze/ui/button"
import { mockBlogPosts, mockCategories, mockTags } from "@/lib/mock-data/blog"
import { FileText, Eye, TrendingUp, FolderOpen, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react'

export default function BlogDashboard() {
  const totalPosts = mockBlogPosts.length
  const publishedPosts = mockBlogPosts.filter((p) => p.status === "published").length
  const draftPosts = mockBlogPosts.filter((p) => p.status === "draft").length
  const totalViews = mockBlogPosts.reduce((sum, p) => sum + p.views, 0)
  
  const viewsTrend = Math.round((Math.random() * 40) - 20)
  const postsTrend = Math.round((Math.random() * 20) - 10)

  const recentPosts = [...mockBlogPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Blog Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your blog content and track performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/admin/blog/create" className="flex-1 sm:flex-none">
              <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </Link>
            <Link href="/admin/blog/categories" className="flex-1 sm:flex-none">
              <Button variant="outline" className="w-full">Manage Categories</Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-elevated card-hover group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground">{totalPosts}</div>
                  <p className="text-xs text-muted-foreground mt-2">All posts</p>
                </div>
                <div className={`flex items-center gap-1 ${postsTrend > 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                  {postsTrend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  <span className="text-xs font-semibold">{Math.abs(postsTrend)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated card-hover group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{publishedPosts}</div>
              <p className="text-xs text-muted-foreground mt-2">Live on website</p>
            </CardContent>
          </Card>

          <Card className="card-elevated card-hover group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{draftPosts}</div>
              <p className="text-xs text-muted-foreground mt-2">Ready to publish</p>
            </CardContent>
          </Card>

          <Card className="card-elevated card-hover group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-violet-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground">{(totalViews / 1000).toFixed(1)}K</div>
                  <p className="text-xs text-muted-foreground mt-2">Total engagements</p>
                </div>
                <div className={`flex items-center gap-1 ${viewsTrend > 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                  {viewsTrend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  <span className="text-xs font-semibold">{Math.abs(viewsTrend)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-elevated lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/blog/create">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/5 transition-colors">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </Link>
              <Link href="/admin/blog/manage">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/5 transition-colors">
                  <FileText className="mr-2 h-4 w-4" />
                  All Posts
                </Button>
              </Link>
              <Link href="/admin/blog/categories">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/5 transition-colors">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Categories
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-elevated lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCategories.slice(0, 4).map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer group">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{cat.postCount} posts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <Card className="card-elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Posts</CardTitle>
              <Link href="/admin/blog/manage">
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-foreground">Title</th>
                    <th className="text-left py-4 px-4 font-semibold text-foreground hidden md:table-cell">Category</th>
                    <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-foreground hidden md:table-cell">Views</th>
                    <th className="text-left py-4 px-4 font-semibold text-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post) => (
                    <tr key={post.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <Link href={`/admin/blog/edit/${post.id}`} className="hover:text-primary transition-colors font-medium">
                          {post.title}
                        </Link>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell text-muted-foreground capitalize">{post.category}</td>
                      <td className="py-4 px-4">
                        <span className={post.status === "published" ? "status-accepted" : post.status === "draft" ? "status-pending" : "status-upcoming"}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell text-muted-foreground">{post.views}</td>
                      <td className="py-4 px-4 text-muted-foreground text-xs">{new Date(post.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


