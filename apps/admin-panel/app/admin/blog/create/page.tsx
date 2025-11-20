"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Textarea } from "@vehiverze/ui/textarea"
import { Label } from "@vehiverze/ui/label"
import { mockCategories, mockTags } from "@/lib/mock-data/blog"
import { ArrowLeft, Upload, Eye, Save } from 'lucide-react'

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    category: "",
    tags: [] as string[],
    status: "draft" as "draft" | "published" | "scheduled",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
  })

  const [previewMode, setPreviewMode] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    })
  }

  const toggleTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag) ? formData.tags.filter((t) => t !== tag) : [...formData.tags, tag],
    })
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog/manage">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="section-header">Create New Post</h1>
              <p className="section-subheader">Write and publish a new blog post</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? "Edit" : "Preview"}
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Image */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth cursor-pointer">
                  {featuredImage ? (
                    <div className="space-y-2">
                      <img src={featuredImage || "/placeholder.svg"} alt="Featured" className="h-40 w-full object-cover rounded" />
                      <Button variant="outline" size="sm" onClick={() => setFeaturedImage(null)}>
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Post Content */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title..."
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="input-focus mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    placeholder="auto-generated-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="input-focus mt-2 text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Auto-generated from title, but editable</p>
                </div>

                <div>
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description that appears in blog listings..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-focus mt-2 h-20 resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Post Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog post content here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="input-focus mt-2 h-64 resize-none font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Markdown supported</p>
                </div>
              </CardContent>
            </Card>

            {/* SEO Section */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-base">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    placeholder="50-60 characters"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="input-focus mt-2 text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{formData.metaTitle.length}/60</p>
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="150-160 characters"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="input-focus mt-2 h-20 resize-none text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{formData.metaDescription.length}/160</p>
                </div>

                <div>
                  <Label htmlFor="keyword">Focus Keyword</Label>
                  <Input
                    id="keyword"
                    placeholder="Main keyword to target"
                    value={formData.focusKeyword}
                    onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                    className="input-focus mt-2 text-sm"
                  />
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-200 dark:border-emerald-900/30 rounded">
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">SEO Score: 78/100</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">Great! Your post is well optimized.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Publishing */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-base">Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as "draft" | "published" | "scheduled" })
                    }
                    className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-background text-foreground input-focus text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Publish Now</option>
                    <option value="scheduled">Schedule</option>
                  </select>
                </div>

                {formData.status === "scheduled" && (
                  <div>
                    <Label htmlFor="scheduleDate">Schedule Date & Time</Label>
                    <Input id="scheduleDate" type="datetime-local" className="input-focus mt-2" />
                  </div>
                )}

                <Button className="w-full bg-primary hover:bg-primary/90">Publish Post</Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </CardContent>
            </Card>

            {/* Category */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-base">Category</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground input-focus text-sm"
                >
                  <option value="">Select a category...</option>
                  {mockCategories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-base">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.slug)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth cursor-pointer ${
                        formData.tags.includes(tag.slug)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


