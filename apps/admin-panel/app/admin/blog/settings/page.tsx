"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Button } from "@vehiverze/ui/button"
import { Input } from "@vehiverze/ui/input"
import { Textarea } from "@vehiverze/ui/textarea"
import { Label } from "@vehiverze/ui/label"
import { mockBlogSettings } from "@/lib/mock-data/blog"
import { ArrowLeft, Save } from 'lucide-react'

export default function BlogSettings() {
  const [settings, setSettings] = useState(mockBlogSettings)

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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
              <h1 className="section-header">Blog Settings</h1>
              <p className="section-subheader">Configure your blog preferences</p>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>

        {/* Basic Settings */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Basic Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="blogTitle">Blog Title</Label>
              <Input
                id="blogTitle"
                value={settings.blogTitle}
                onChange={(e) => setSettings({ ...settings, blogTitle: e.target.value })}
                className="input-focus mt-2"
              />
            </div>

            <div>
              <Label htmlFor="blogSubtitle">Blog Subtitle</Label>
              <Input
                id="blogSubtitle"
                value={settings.blogSubtitle}
                onChange={(e) => setSettings({ ...settings, blogSubtitle: e.target.value })}
                className="input-focus mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Displayed below the blog title</p>
            </div>

            <div>
              <Label htmlFor="defaultAuthor">Default Author</Label>
              <Input
                id="defaultAuthor"
                value={settings.defaultAuthor}
                onChange={(e) => setSettings({ ...settings, defaultAuthor: e.target.value })}
                className="input-focus mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="homepage">Homepage Layout</Label>
              <select
                id="homepage"
                value={settings.homepageLayout}
                onChange={(e) => setSettings({ ...settings, homepageLayout: e.target.value as any })}
                className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-background text-foreground input-focus text-sm"
              >
                <option value="grid">Grid View</option>
                <option value="list">List View</option>
                <option value="cards">Card View</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Enable Comments</p>
                  <p className="text-xs text-muted-foreground">Allow visitors to comment on posts</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableComments}
                  onChange={(e) => setSettings({ ...settings, enableComments: e.target.checked })}
                  className="h-5 w-5 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
                <div>
                  <p className="font-medium text-sm">Enable Social Sharing</p>
                  <p className="text-xs text-muted-foreground">Allow posts to be shared on social media</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableSocialSharing}
                  onChange={(e) => setSettings({ ...settings, enableSocialSharing: e.target.checked })}
                  className="h-5 w-5 cursor-pointer"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Default Featured Image */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Default Featured Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
              <img
                src={settings.defaultFeaturedImage || "/placeholder.svg"}
                alt="Default featured"
                className="h-32 w-full object-cover rounded mb-3"
              />
              <Button variant="outline" size="sm">
                Change Image
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


