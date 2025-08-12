"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Users, Car, AlertTriangle, Eye, Trash2, Ban, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { AIAssistant } from "@/components/ai-assistant"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "suspended"
  joinDate: string
  tripsOffered: number
  tripsBooked: number
}

interface Trip {
  id: string
  driver: string
  origin: string
  destination: string
  date: string
  time: string
  status: "active" | "completed" | "cancelled"
  bookings: number
  totalSeats: number
  reports: number
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is admin
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/signin")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      router.push("/dashboard")
      return
    }

    setCurrentUser(parsedUser)

    // Mock data
    setUsers([
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@td.com",
        role: "driver",
        status: "active",
        joinDate: "2024-01-10",
        tripsOffered: 12,
        tripsBooked: 5,
      },
      {
        id: "2",
        name: "Mike Chen",
        email: "mike.chen@td.com",
        role: "rider",
        status: "active",
        joinDate: "2024-01-08",
        tripsOffered: 0,
        tripsBooked: 15,
      },
      {
        id: "3",
        name: "Emily Davis",
        email: "emily.davis@td.com",
        role: "both",
        status: "suspended",
        joinDate: "2024-01-05",
        tripsOffered: 8,
        tripsBooked: 12,
      },
    ])

    setTrips([
      {
        id: "1",
        driver: "Sarah Johnson",
        origin: "Downtown Toronto",
        destination: "TD Centre",
        date: "2024-01-15",
        time: "08:30",
        status: "active",
        bookings: 2,
        totalSeats: 4,
        reports: 0,
      },
      {
        id: "2",
        driver: "Mike Chen",
        origin: "Mississauga",
        destination: "TD Tower",
        date: "2024-01-15",
        time: "09:00",
        status: "active",
        bookings: 3,
        totalSeats: 3,
        reports: 1,
      },
    ])
  }, [router])

  const handleSuspendUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "suspended" : "active" } : user,
      ),
    )
  }

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips.filter((trip) => trip.id !== tripId))
  }

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50">
      <AIAssistant currentPage="admin" userRole="admin" />
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Admin Panel</span>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              Administrator
            </Badge>
            <Button variant="ghost" onClick={() => router.push("/dashboard")} className="text-gray-700">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage users, trips, and platform moderation</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Trips</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {trips.filter((t) => t.status === "active").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Suspended Users</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users.filter((u) => u.status === "suspended").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Ban className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reports</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {trips.reduce((acc, trip) => acc + trip.reports, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg">
              <TabsTrigger value="users" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                User Management
              </TabsTrigger>
              <TabsTrigger value="trips" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                Trip Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    All Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Trips Offered</TableHead>
                        <TableHead>Trips Booked</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.status === "active" ? "default" : "destructive"}
                              className={user.status === "active" ? "bg-green-100 text-green-700" : ""}
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>{user.tripsOffered}</TableCell>
                          <TableCell>{user.tripsBooked}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>User Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold">Contact Information</h4>
                                      <p>Name: {user.name}</p>
                                      <p>Email: {user.email}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">Activity</h4>
                                      <p>Trips Offered: {user.tripsOffered}</p>
                                      <p>Trips Booked: {user.tripsBooked}</p>
                                      <p>Member Since: {user.joinDate}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSuspendUser(user.id)}
                                className={user.status === "suspended" ? "text-green-600" : "text-red-600"}
                              >
                                {user.status === "suspended" ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Ban className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trips" className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Car className="w-5 h-5 text-green-600" />
                    All Trips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Driver</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reports</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trips.map((trip) => (
                        <TableRow key={trip.id}>
                          <TableCell>
                            <div className="font-medium text-gray-900">{trip.driver}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{trip.origin}</div>
                              <div className="text-gray-600">→ {trip.destination}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{trip.date}</div>
                              <div className="text-gray-600">{trip.time}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {trip.bookings}/{trip.totalSeats}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={trip.status === "active" ? "default" : "secondary"}
                              className={trip.status === "active" ? "bg-green-100 text-green-700" : ""}
                            >
                              {trip.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {trip.reports > 0 ? (
                              <Badge variant="destructive">{trip.reports}</Badge>
                            ) : (
                              <span className="text-gray-400">0</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Trip Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-semibold">Route Information</h4>
                                      <p>From: {trip.origin}</p>
                                      <p>To: {trip.destination}</p>
                                      <p>
                                        Date: {trip.date} at {trip.time}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">Booking Details</h4>
                                      <p>
                                        Bookings: {trip.bookings} of {trip.totalSeats} seats
                                      </p>
                                      <p>Status: {trip.status}</p>
                                      <p>Reports: {trip.reports}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteTrip(trip.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
