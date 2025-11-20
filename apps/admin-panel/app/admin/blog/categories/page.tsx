"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Textarea } from "@vehiverze/ui/textarea"
import { Label } from "@vehiverze/ui/label"
import { mockCategories, mockTags } from "@/lib/mock-data/blog"
import { ArrowLeft, Trash2, Edit, Plus } from 'lucide-react'

export default function CategoriesAndTags() {
  const [newCategory, setNewCategory] = useState("")
  const [newCategoryDesc, setNewCategoryDesc] = useState("")
  const [newTag, setNewTag] = useState("")
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingTag, setEditingTag] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="section-header">Categories & Tags</h1>
              <p className="section-subheader">Manage your blog categories and tags</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Categories */}
          <div className="space-y-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Add New Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="catName">Category Name</Label>
                  <Input
                    id="catName"
                    placeholder="Enter category name..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="input-focus mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="catDesc">Description</Label>
                  <Textarea
                    id="catDesc"
                    placeholder="Brief description..."
                    value={newCategoryDesc}
                    onChange={(e) => setNewCategoryDesc(e.target.value)}
                    className="input-focus mt-2 h-20 resize-none text-sm"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </CardContent>
            </Card>

            {/* Categories List */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-base">All Categories ({mockCategories.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-smooth"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{category.postCount} posts</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Add New Tag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="tagName">Tag Name</Label>
                  <Input
                    id="tagName"
                    placeholder="Enter tag name..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="input-focus mt-2"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Slug will be auto-generated</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </CardContent>
            </Card>

            {/* Tags List */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-base">All Tags ({mockTags.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {mockTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted hover:bg-muted/80 transition-smooth group"
                    >
                      <span className="text-sm font-medium">{tag.name}</span>
                      <span className="text-xs text-muted-foreground">({tag.usageCount})</span>
                      <button className="opacity-0 group-hover:opacity-100 transition-smooth ml-1 hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
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


