"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card";
import { Badge } from "@vehiverze/ui/badge";
import { Button } from "@vehiverze/ui/button";
import { Textarea } from "@vehiverze/ui/textarea";
import { Input } from "@vehiverze/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@vehiverze/ui/dialog";
import {
  vendorSellRequestsDb,
  type VendorSellRequest,
} from "@/lib/mock-data/vendor-sell-requests";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Phone, Mail, Edit2 } from "lucide-react";
import Link from "next/link";

export default function VendorSellRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const request = vendorSellRequestsDb.getById(params.id as string);
  const [rejectionReason, setRejectionReason] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<VendorSellRequest>>({
    brand: request?.brand ?? "",
    model: request?.model ?? "",
    year: request?.year ?? "",
    variant: request?.variant ?? "",
    vehicleType: request?.vehicleType,
    fuelType: request?.fuelType ?? "",
    transmission: request?.transmission ?? "",
    kilometersDriven: request?.kilometersDriven ?? "",
    ownershipHistory: request?.ownershipHistory ?? "",
    price: request?.price ?? 0,
    description: request?.description ?? "",
  });

  if (!request) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Request not found</p>
      </div>
    );
  }

  const handleAccept = () => {
    vendorSellRequestsDb.updateStatus(
      request.id,
      "Accepted",
      undefined,
      adminNote
    );
    router.push("/admin/vendor-sell-requests");
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    vendorSellRequestsDb.updateStatus(
      request.id,
      "Rejected",
      rejectionReason,
      adminNote
    );
    router.push("/admin/vendor-sell-requests");
  };

  const handleSaveEdit = () => {
    vendorSellRequestsDb.updateRequest(request.id, editForm);
    setIsEditOpen(false);
    alert("Vehicle details updated successfully");
  };

  const statusColors: Record<string, string> = {
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Accepted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/vendor-sell-requests">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {request.brand} {request.model} ({request.year})
          </h1>
          <p className="text-muted-foreground mt-1">{request.variant}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge className={`${statusColors[request.status]} border`}>
            {request.status}
          </Badge>
          <Button
            onClick={() => setIsEditOpen(true)}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="w-full h-96 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={
                      request.images[selectedImageIndex] || "/placeholder.svg"
                    }
                    alt={`${request.brand} ${request.model}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                {request.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {request.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          selectedImageIndex === index
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Details */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Brand</span>
                  <p className="font-semibold">{request.brand}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Model</span>
                  <p className="font-semibold">{request.model}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Year</span>
                  <p className="font-semibold">{request.year}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Variant</span>
                  <p className="font-semibold">{request.variant}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Vehicle Type
                  </span>
                  <p className="font-semibold">{request.vehicleType}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Fuel Type
                  </span>
                  <p className="font-semibold">{request.fuelType}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Transmission
                  </span>
                  <p className="font-semibold">{request.transmission}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Kilometers Driven
                  </span>
                  <p className="font-semibold">{request.kilometersDriven}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Ownership
                  </span>
                  <p className="font-semibold">{request.ownershipHistory}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Price</span>
                  <p className="font-semibold text-primary">
                    ₹{request.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  Description
                </span>
                <p className="mt-2">{request.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Vendor Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Vendor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">{request.vendorName}</p>
                <p className="text-sm text-muted-foreground">Vendor</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${request.vendorPhone}`}
                  className="text-primary hover:underline"
                >
                  {request.vendorPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${request.vendorEmail}`}
                  className="text-primary hover:underline"
                >
                  {request.vendorEmail}
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                <span>Submitted:</span>
                <p className="font-medium">
                  {new Date(request.submissionDate).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Admin Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {request.status === "Pending" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Admin Note (Optional)
                    </label>
                    <Textarea
                      placeholder="Add internal notes..."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="min-h-20"
                    />
                  </div>

                  <Button
                    onClick={handleAccept}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    ✓ Accept & Publish
                  </Button>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Rejection Reason
                    </label>
                    <Textarea
                      placeholder="Provide reason for rejection..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="min-h-20"
                    />
                  </div>

                  <Button
                    onClick={handleReject}
                    variant="destructive"
                    className="w-full font-semibold"
                  >
                    ✕ Reject Request
                  </Button>
                </>
              )}

              {request.status === "Accepted" && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-emerald-600 font-semibold text-center">
                    ✓ Accepted & Published
                  </p>
                  <p className="text-sm text-emerald-600/80 text-center mt-1">
                    This vehicle is now visible on Vehiverze.com
                  </p>
                </div>
              )}

              {request.status === "Rejected" && (
                <>
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
                    <p className="text-red-600 font-semibold text-center">
                      ✕ Rejected
                    </p>
                    <p className="text-sm text-red-600/80 text-center mt-1">
                      This vehicle was not published on the website
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Admin Note (Optional)
                    </label>
                    <Textarea
                      placeholder="Add internal notes..."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="min-h-20"
                    />
                  </div>

                  <Button
                    onClick={handleAccept}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    ✓ Re-Accept & Publish
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {request.status === "Rejected" && request.rejectionReason && (
            <Card className="bg-red-500/5 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg text-red-500">
                  Rejection Reason
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{request.rejectionReason}</p>
              </CardContent>
            </Card>
          )}

          {request.adminNote && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Admin Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{request.adminNote}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vehicle Details</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Input
                value={editForm.brand}
                onChange={(e) =>
                  setEditForm({ ...editForm, brand: e.target.value })
                }
                placeholder="Brand"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <Input
                value={editForm.model}
                onChange={(e) =>
                  setEditForm({ ...editForm, model: e.target.value })
                }
                placeholder="Model"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Input
                type="number"
                value={editForm.year}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    year: e.target.value,
                  })
                }
                placeholder="Year"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Variant</label>
              <Input
                value={editForm.variant}
                onChange={(e) =>
                  setEditForm({ ...editForm, variant: e.target.value })
                }
                placeholder="Variant"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Vehicle Type</label>
              <Input
                value={editForm.vehicleType ?? ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    vehicleType: e.target
                      .value as VendorSellRequest["vehicleType"],
                  })
                }
                placeholder="e.g., 4 Wheeler"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fuel Type</label>
              <Input
                value={editForm.fuelType}
                onChange={(e) =>
                  setEditForm({ ...editForm, fuelType: e.target.value })
                }
                placeholder="e.g., Petrol"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Transmission</label>
              <Input
                value={editForm.transmission}
                onChange={(e) =>
                  setEditForm({ ...editForm, transmission: e.target.value })
                }
                placeholder="e.g., Manual"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kilometers Driven</label>
              <Input
                value={editForm.kilometersDriven}
                onChange={(e) =>
                  setEditForm({ ...editForm, kilometersDriven: e.target.value })
                }
                placeholder="e.g., 45000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ownership History</label>
              <Input
                value={editForm.ownershipHistory}
                onChange={(e) =>
                  setEditForm({ ...editForm, ownershipHistory: e.target.value })
                }
                placeholder="e.g., 1st Owner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price (₹)</label>
              <Input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    price: Number.parseInt(e.target.value),
                  })
                }
                placeholder="Price"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                placeholder="Vehicle description"
                className="min-h-24"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-primary hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
