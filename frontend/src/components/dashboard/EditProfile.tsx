"use client";

import type React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import profile from "../../assets/My_photo.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfileEdit() {
  const [bioLength, setBioLength] = useState(0);
  const [jobs, setJobs] = useState<{ id: number }[]>([]);
  const [educations, setEducations] = useState<{ id: number }[]>([]);

  const addJob = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setJobs((prevJobs) => [...prevJobs, { id: Date.now() }]);
  };

  const removeJob = (id: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const addEducation = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setEducations((prevEducations) => [...prevEducations, { id: Date.now() }]);
  };

  const removeEducation = (id: number) => {
    setEducations((prevEducations) =>
      prevEducations.filter((education) => education.id !== id)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-slate-950">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-16 h-16 border">
          <img src={profile || "/placeholder.png"} alt="SignUp" />
          <AvatarFallback>AS</AvatarFallback>
         </Avatar>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-sm font-normal">
            Upload new picture
          </Button>
          <Button variant="outline" size="sm" className="text-sm font-normal">
            Delete
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-normal">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            defaultValue="Al Fahad Shanto"
            className="h-12 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-base font-normal">
            Location
          </Label>
          <Input
            id="location"
            defaultValue="bangladesh"
            className="h-12 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="bio" className="text-base font-normal">
              Bio
            </Label>
            <span className="text-gray-400 text-sm">{bioLength}/1024</span>
          </div>
          <Textarea
            id="bio"
            className="min-h-32 rounded-md"
            onChange={(e) => setBioLength(e.target.value.length)}
          />
          <p className="text-gray-400 text-sm">
            Brief description for your profile. URLs are hyperlinked.
          </p>
        </div>

        <div className="pt-4">
          <h2 className="text-gray-500 font-medium text-sm mb-4">
            WORK HISTORY & EDUCATION
          </h2>
          <Separator className="mb-6" />

          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-2">Work History</h3>

              {jobs.map((job) => (
                <div key={job.id} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-2 items-center mb-2">
                    <Input placeholder="Position" className="h-12 rounded-md" />
                    <span className="hidden md:inline text-center">at</span>
                    <Input placeholder="Company" className="h-12 rounded-md" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-2 items-center">
                    <Select>
                      <SelectTrigger className="h-12 rounded-md">
                        <SelectValue placeholder="Start Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: 30 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="hidden md:inline text-center">to</span>

                    <Select defaultValue="present">
                      <SelectTrigger className="h-12 rounded-md">
                        <SelectValue placeholder="End Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        {Array.from(
                          { length: 30 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end mt-2">
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm font-normal text-gray-500"
                      onClick={() => removeJob(job.id)}
                    >
                      Delete job
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-sm font-normal"
                onClick={addJob}
              >
                + Add a job
              </Button>
            </div>

            <div>
              <h3 className="text-base font-medium mb-2">Education</h3>

              {educations.map((education) => (
                <div key={education.id} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-2 items-center mb-2">
                    <Input placeholder="Degree" className="h-12 rounded-md" />
                    <span className="hidden md:inline text-center">at</span>
                    <Input
                      placeholder="School/University"
                      className="h-12 rounded-md"
                    />
                    <span className="hidden md:inline"></span>
                    <Select>
                      <SelectTrigger className="h-12 rounded-md">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: 30 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end mt-2">
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm font-normal text-gray-500"
                      onClick={() => removeEducation(education.id)}
                    >
                      Remove education
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-sm font-normal"
                onClick={addEducation}
              >
                + Add education
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h2 className="text-gray-500 font-medium text-sm mb-4">
            ONLINE PRESENCE
          </h2>
          <Separator className="mb-6" />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="website" className="text-base font-normal">
                Personal website
              </Label>
              <Input id="website" className="h-12 rounded-md" />
              <p className="text-gray-400 text-sm">
                Your home page, blog, or company site.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-base font-normal">
                Portfolio URL
              </Label>
              <Input id="portfolio" className="h-12 rounded-md" />
              <p className="text-gray-400 text-sm">
                Only shared with potential employers.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-normal">
                Portfolio password
              </Label>
              <Input
                id="password"
                type="password"
                className="h-12 rounded-md"
              />
              <p className="text-gray-400 text-sm">Only if needed.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calendly" className="text-base font-normal">
                Calendly URL
              </Label>
              <Input id="calendly" className="h-12 rounded-md" />
              <p className="text-gray-400 text-sm">
                Will only be used if you set yourself as available for work.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="bg-[#0d0c22] hover:bg-[#2d2c42] text-white rounded-full px-6"
          >
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
