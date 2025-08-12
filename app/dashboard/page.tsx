"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Car, Plus, Search, Calendar, MapPin, Users, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AIAssistant } from "@/components/ai-assistant"

interface User {
  email: string
  role: string
  name: string
}

interface Trip {
  id: string
  driver: string
  origin: string
  destination: string
  date: string
  time: string
  availableSeats: number
  totalSeats: number
  price?: number
  status: "active" | "completed" | "cancelled"
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [trips, setTrips] = useState<Trip[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Get user from localStorage (in real app, this would be from NextAuth)
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/signin")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Mock trips data
    setTrips([
      {
        id: "1",
        driver: "Sarah Johnson",
        origin: "Downtown Toronto",
        destination: "TD Centre",
        date: "2024-01-15",
        time: "08:30",
        availableSeats: 2,
        totalSeats: 4,
        price: 15,
        status: "active",
      },
      {
        id: "2",
        driver: "Mike Chen",
        origin: "Mississauga",
        destination: "TD Tower",
        date: "2024-01-15",
        time: "09:00",
        availableSeats: 1,
        totalSeats: 3,
        price: 20,
        status: "active",
      },
      {
        id: "3",
        driver: "Emily Davis",
        origin: "North York",
        destination: "TD Centre",
        date: "2024-01-16",
        time: "08:45",
        availableSeats: 3,
        totalSeats: 4,
        price: 12,
        status: "active",
      },
    ])
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return null

  const filteredTrips = trips.filter(
    (trip) =>
      trip.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50">
      <AIAssistant currentPage="dashboard" userRole={user?.role || "rider"} />
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">TD Carpool</span>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <AIAssistant currentPage="dashboard" userRole={user?.role || "rider"} />
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <Button variant="ghost" onClick={handleSignOut} className="text-gray-700 hover:text-red-600">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your carpooling activities</p>
        </motion.div>

        {/* Quick Stats */}
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
                  <p className="text-sm text-gray-600">Available Trips</p>
                  <p className="text-3xl font-bold text-gray-900">{trips.length}</p>
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
                  <p className="text-sm text-gray-600">My Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Savings</p>
                  <p className="text-3xl font-bold text-gray-900">$127</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">CO₂ Saved</p>
                  <p className="text-3xl font-bold text-gray-900">45kg</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs defaultValue="find-rides" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-2 bg-white shadow-lg">
                <TabsTrigger
                  value="find-rides"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Find Rides
                </TabsTrigger>
                <TabsTrigger
                  value="my-trips"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  My Trips
                </TabsTrigger>
              </TabsList>

              <Link href="/trips/create">
                <Button className="bg-green-500 hover:bg-green-600 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Offer a Ride
                </Button>
              </Link>
            </div>

            <TabsContent value="find-rides" className="space-y-6">
              {/* Search */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search by location or driver..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">Search</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Available Trips */}
              <div className="space-y-4">
                {filteredTrips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                  {trip.driver
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{trip.driver}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span>4.8 rating</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="w-4 h-4 text-green-600" />
                                <span className="text-sm">
                                  <span className="font-medium">{trip.origin}</span> →{" "}
                                  <span className="font-medium">{trip.destination}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="text-sm">
                                  {trip.date} at {trip.time}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="text-center">
                              <Badge variant="secondary" className="mb-2">
                                {trip.availableSeats} of {trip.totalSeats} seats
                              </Badge>
                              <p className="text-2xl font-bold text-green-600">${trip.price}</p>
                            </div>
                            <Button className="bg-green-500 hover:bg-green-600 text-white">Book Ride</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="my-trips" className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">My Upcoming Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
                    <p className="text-gray-600 mb-6">Start by booking a ride or offering one to your colleagues</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-green-500 hover:bg-green-600 text-white">Find a Ride</Button>
                      <Link href="/trips/create">
                        <Button
                          variant="outline"
                          className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                        >
                          Offer a Ride
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
