"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, MapPin, Plus, Search, Trash2, Edit, Users, ChevronLeft, ChevronRight, CalendarDays, List } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: string[];
  category: "meeting" | "task" | "reminder" | "event";
  color: string;
}

export default function CalendarAppPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"day" | "month">("month");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Standup",
      description: "Daily team sync meeting",
      date: new Date(),
      startTime: "09:00",
      endTime: "09:30",
      location: "Conference Room A",
      attendees: ["John", "Sarah", "Mike"],
      category: "meeting",
      color: "bg-blue-500"
    },
    {
      id: "2",
      title: "Product Review",
      description: "Review Q4 product roadmap",
      date: new Date(),
      startTime: "14:00",
      endTime: "15:30",
      location: "Zoom",
      attendees: ["Product Team"],
      category: "meeting",
      color: "bg-purple-500"
    },
    {
      id: "3",
      title: "Submit Report",
      description: "Monthly analytics report",
      date: new Date(Date.now() + 86400000),
      startTime: "17:00",
      endTime: "17:30",
      category: "task",
      color: "bg-green-500"
    },
    {
      id: "4",
      title: "Client Presentation",
      description: "Present new campaign strategy",
      date: new Date(Date.now() + 172800000),
      startTime: "11:00",
      endTime: "12:00",
      location: "Client Office",
      attendees: ["Client Team", "Sales"],
      category: "event",
      color: "bg-orange-500"
    }
  ]);

  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    description: "",
    date: selectedDate,
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    category: "meeting",
    color: "bg-blue-500"
  });

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "meeting":
        return "default";
      case "task":
        return "success";
      case "reminder":
        return "secondary";
      case "event":
        return "outline";
      default:
        return "default";
    }
  };

  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return events.filter(event => 
      format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description || "",
        date: newEvent.date,
        startTime: newEvent.startTime || "09:00",
        endTime: newEvent.endTime || "10:00",
        location: newEvent.location,
        category: newEvent.category || "meeting",
        color: newEvent.color || "bg-blue-500"
      };
      setEvents([...events, event]);
      setIsAddEventOpen(false);
      setNewEvent({
        title: "",
        description: "",
        date: selectedDate,
        startTime: "09:00",
        endTime: "10:00",
        location: "",
        category: "meeting",
        color: "bg-blue-500"
      });
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingEvents = filteredEvents
    .filter(event => event.date >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const eventDates = events.map(event => event.date);

  // Month grid helpers
  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      isSameDay(event.date, day)
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const generateMonthDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 border-r bg-card p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <CalendarIcon className="h-6 w-6" />
                Calendar
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your schedule
              </p>
            </div>

            {/* Add Event Button */}
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Add a new event to your calendar
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Event title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Event description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Event location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newEvent.category}
                      onValueChange={(value: any) => setNewEvent({ ...newEvent, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddEvent} className="w-full">
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mini Calendar */}
            <Card>
              <CardContent className="p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    hasEvent: eventDates
                  }}
                  modifiersClassNames={{
                    hasEvent: "font-bold text-primary"
                  }}
                />
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Upcoming Events</h3>
              <div className="space-y-2">
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming events</p>
                ) : (
                  upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => setSelectedDate(event.date)}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-1 h-full rounded-full ${event.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(event.date, "MMM d")} • {event.startTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header with View Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <h2 className="text-3xl font-bold">
                      {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {events.length} total events
                    </p>
                  </div>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "day" | "month")}>
                    <TabsList>
                      <TabsTrigger value="month" className="gap-2">
                        <CalendarDays className="h-4 w-4" />
                        Month
                      </TabsTrigger>
                      <TabsTrigger value="day" className="gap-2">
                        <List className="h-4 w-4" />
                        Day
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button variant="outline" onClick={goToToday}>
                    Today
                  </Button>
                </div>
              </div>

              {/* Month View */}
              {viewMode === "month" && (
                <Card>
                  <CardContent className="p-4">
                    {/* Month Grid */}
                    <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
                      {/* Day Headers */}
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div
                          key={day}
                          className="bg-muted p-3 text-center text-sm font-semibold"
                        >
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar Days */}
                      {generateMonthDays().map((day, index) => {
                        const dayEvents = getEventsForDay(day);
                        const isToday = isSameDay(day, new Date());
                        const isCurrentMonth = isSameMonth(day, currentMonth);
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        
                        return (
                          <div
                            key={index}
                            className={`bg-background min-h-[120px] p-2 cursor-pointer hover:bg-accent transition-colors ${
                              !isCurrentMonth ? "opacity-40" : ""
                            } ${isSelected ? "ring-2 ring-primary" : ""}`}
                            onClick={() => {
                              setSelectedDate(day);
                              setViewMode("day");
                            }}
                          >
                            <div className="flex flex-col h-full">
                              <div
                                className={`text-sm font-medium mb-2 ${
                                  isToday
                                    ? "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center"
                                    : ""
                                }`}
                              >
                                {format(day, "d")}
                              </div>
                              <div className="flex-1 space-y-1 overflow-hidden">
                                {dayEvents.slice(0, 3).map((event) => (
                                  <div
                                    key={event.id}
                                    className={`text-xs p-1 rounded truncate ${event.color} text-white`}
                                    title={`${event.title} - ${event.startTime}`}
                                  >
                                    {event.startTime} {event.title}
                                  </div>
                                ))}
                                {dayEvents.length > 3 && (
                                  <div className="text-xs text-muted-foreground pl-1">
                                    +{dayEvents.length - 3} more
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Day View - Events for Selected Date */}
              {viewMode === "day" && (
                <>
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold">
                      {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
                    </h3>
                    <p className="text-muted-foreground">
                      {getEventsForDate(selectedDate).length} events scheduled
                    </p>
                  </div>
                  <div className="space-y-4">
                {getEventsForDate(selectedDate).length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No events scheduled</h3>
                      <p className="text-muted-foreground mb-4">
                        Add your first event for this day
                      </p>
                      <Button onClick={() => setIsAddEventOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Event
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  getEventsForDate(selectedDate).map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-1 h-full rounded-full ${event.color} mt-1`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-xl">{event.title}</CardTitle>
                                <Badge variant={getCategoryBadgeVariant(event.category)}>
                                  {event.category}
                                </Badge>
                              </div>
                              <CardDescription>{event.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.attendees && event.attendees.length > 0 && (
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{event.attendees.length} attendees</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

                  {/* All Events Overview */}
                  {searchQuery && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Search Results</h3>
                      {filteredEvents.length === 0 ? (
                        <Card>
                          <CardContent className="py-8 text-center">
                            <p className="text-muted-foreground">No events found</p>
                          </CardContent>
                        </Card>
                      ) : (
                        filteredEvents.map((event) => (
                          <Card
                            key={event.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => {
                              setSelectedDate(event.date);
                              setViewMode("day");
                            }}
                          >
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-1 h-12 rounded-full ${event.color}`} />
                                  <div>
                                    <CardTitle className="text-lg">{event.title}</CardTitle>
                                    <CardDescription>
                                      {format(event.date, "MMM d, yyyy")} • {event.startTime} - {event.endTime}
                                    </CardDescription>
                                  </div>
                                </div>
                                <Badge variant={getCategoryBadgeVariant(event.category)}>
                                  {event.category}
                                </Badge>
                              </div>
                            </CardHeader>
                          </Card>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
