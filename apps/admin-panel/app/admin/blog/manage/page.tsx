"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@vehiverze/ui/card";
import { Button } from "@vehiverze/ui/button";
import { Input } from "@vehiverze/ui/input";
import { mockBlogPosts } from "@/lib/mock-data/blog";
import { Search, Trash2, Edit, Copy } from "lucide-react";

export default function ManagePosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredPosts = mockBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="section-header">Manage Posts</h1>
            <p className="section-subheader">
              View, edit, and delete all your blog posts
            </p>
          </div>
          <Link href="/admin/blog/create">
            <Button className="bg-primary hover:bg-primary/90">
              Create New Post
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input-focus"
                />
              </div>
              <div className="flex gap-2">
                {["all", "published", "draft", "scheduled"].map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className="capitalize"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card className="card-elevated">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-4 px-4 font-medium">Title</th>
                    <th className="text-left py-4 px-4 font-medium hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left py-4 px-4 font-medium hidden lg:table-cell">
                      Tags
                    </th>
                    <th className="text-left py-4 px-4 font-medium">Status</th>
                    <th className="text-left py-4 px-4 font-medium hidden md:table-cell">
                      Views
                    </th>
                    <th className="text-left py-4 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-border hover:bg-muted/50 transition-smooth"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium line-clamp-1">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {post.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell text-muted-foreground capitalize">
                        {post.category}
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={
                            post.status === "published"
                              ? "status-accepted"
                              : post.status === "draft"
                                ? "status-pending"
                                : "status-upcoming"
                          }
                        >
                          {post.status.charAt(0).toUpperCase() +
                            post.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell text-muted-foreground">
                        {post.views}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/blog/edit/${post.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:text-destructive"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPosts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No posts found matching your criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
