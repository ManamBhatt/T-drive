"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Car, MapPin, Calendar, Clock, Users, DollarSign, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AIAssistant } from "@/components/ai-assistant"

export default function CreateTripPage() {
  const [tripData, setTripData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    seats: "",
    price: "",
    notes: "",
    recurring: false,
    autoApprove: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate trip creation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to create trip:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50">
      <AIAssistant currentPage="create-trip" userRole="driver" />
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-green-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Create Trip</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Offer a Ride</h1>
            <p className="text-xl text-gray-600">Share your journey with TD colleagues</p>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Car className="w-5 h-5 text-green-600" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Route Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="origin" className="text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      Pickup Location
                    </Label>
                    <Input
                      id="origin"
                      placeholder="e.g., Downtown Toronto, Mississauga"
                      value={tripData.origin}
                      onChange={(e) => setTripData({ ...tripData, origin: e.target.value })}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Destination
                    </Label>
                    <Select
                      value={tripData.destination}
                      onValueChange={(value) => setTripData({ ...tripData, destination: value })}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select TD office" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="td-centre">TD Centre</SelectItem>
                        <SelectItem value="td-tower">TD Tower</SelectItem>
                        <SelectItem value="td-north">TD North Tower</SelectItem>
                        <SelectItem value="td-waterfront">TD Waterfront</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={tripData.date}
                      onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      Departure Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={tripData.time}
                      onChange={(e) => setTripData({ ...tripData, time: e.target.value })}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                {/* Seats and Price */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="seats" className="text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      Available Seats
                    </Label>
                    <Select
                      value={tripData.seats}
                      onValueChange={(value) => setTripData({ ...tripData, seats: value })}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Number of seats" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 seat</SelectItem>
                        <SelectItem value="2">2 seats</SelectItem>
                        <SelectItem value="3">3 seats</SelectItem>
                        <SelectItem value="4">4 seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-700 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      Price per Seat (CAD)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="15"
                      value={tripData.price}
                      onChange={(e) => setTripData({ ...tripData, price: e.target.value })}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      min="0"
                      step="0.50"
                      required
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-gray-700">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific pickup instructions, car details, or preferences..."
                    value={tripData.notes}
                    onChange={(e) => setTripData({ ...tripData, notes: e.target.value })}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
                  />
                </div>

                {/* Settings */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Trip Settings</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Auto-approve bookings</Label>
                      <p className="text-sm text-gray-600">Automatically accept ride requests</p>
                    </div>
                    <Switch
                      checked={tripData.autoApprove}
                      onCheckedChange={(checked) => setTripData({ ...tripData, autoApprove: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700">Recurring trip</Label>
                      <p className="text-sm text-gray-600">Repeat this trip weekly</p>
                    </div>
                    <Switch
                      checked={tripData.recurring}
                      onCheckedChange={(checked) => setTripData({ ...tripData, recurring: checked })}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Trip...
                    </div>
                  ) : (
                    "Create Trip"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
