"use client";
import React, { useState } from "react";
import { Input, Section, Textarea, Button } from "@/components/ui";
import Loader from "@/components/ui/Loader";
import { useToast } from "@/components/ToastContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [mode, setMode] = useState("online");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      addToast("Creating Hackathon");
      setIsCreating(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const res = await fetch("/api/organise-hackathon", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (!res?.success) {
        addToast("Hackathon creation failed");
      } else {
        addToast("Hackathon Created Successfully");
        router.push("/hosted-hackathons");
      }
    } catch (_) {
      addToast("Creation failed");
    } finally {
      setIsCreating(false);
    }
  };

  if (isCreating) return <Loader fullscreen />;

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-20 mb-20 border border-gray-200">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">🏁 Organize a Hackathon</h1>
          <p className="text-gray-600 text-sm mt-2">
            Fill in the details below to host your next hackathon.
          </p>
        </div>

        <hr className="mb-3 text-gray-300" />

       
        <Section title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="hackathonName"
              label="Hackathon Name"
              placeholder="Enter hackathon name"
            />
            <Input
              name="tagline"
              label="Short Tagline"
              placeholder="E.g. Build. Learn. Compete."
            />
          </div>

          <div className="mt-6">
            <Textarea
              name="description"
              label="Description"
              placeholder="Describe your hackathon, themes, and goals..."
            />
          </div>

        
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            <div className="grid grid-cols-1 gap-6">
              <Input
                name="tags"
                label="Related Tags"
                type="text"
                placeholder="E.g. AI, Hackathon, Gaming (comma separated)"
              />
</div>
            
              <div>
                <span className="inline-block text-sm font-medium text-gray-700 mb-1">
                  Mode
                </span>
                <select
                  name="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full border rounded-md px-3 py-2.5 border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="online">Online</option>
                  <option value="inplace">In Place</option>
                </select>
              </div>
            
          </div>

          <div className="mt-6">
             {mode === "inplace" && (
              <Input
                name="location"
                label="Location"
                placeholder="Enter hackathon venue"
              />
            )}
          </div>

        </Section>

    
        <Section title="Schedule">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              name="startAt"
              label="Start Date and Time"
              type="datetime-local"
            />
            <Input
              name="registrationDeadline"
              label="Registration Deadline"
              type="date"
            />
            <Input name="duration" label="Duration" placeholder="e.g. 48 hours" />
          </div>
        </Section>

       
        <Section title="Team & Eligibility">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="minTeamSize"
              label="Min Team Size"
              placeholder="e.g. 2"
              type="number"
            />
            <Input
              name="maxTeamSize"
              label="Max Team Size"
              placeholder="e.g. 5"
              type="number"
            />
          </div>

          <div className="mt-6">
            <Textarea
              name="criteria"
              label="Eligibility Criteria"
              placeholder="e.g. College students only"
            />
          </div>

          <div className="mt-6">
            <Input
              name="prize"
              label="Prize"
              placeholder="e.g. 50,000"
              type="text"
            />
          </div>
        </Section>

     
        <Section title="Organizer Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="organiser"
              label="Organizer / Society Name"
              placeholder="e.g. Tech Club"
            />
            <Input
              name="organiserEmail"
              label="Contact Email"
              placeholder="example@email.com"
              type="email"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="socialLink"
              label="Social Link"
              placeholder="https://instagram.com/yourclub"
            />
            <Input
              name="webSiteLink"
              label="Website Link"
              placeholder="https://yourlink.com"
            />
          </div>
        </Section>

        <div className="border-t border-gray-200 mt-10 pt-6 text-right flex justify-end gap-6">
          <Button
          variant="secondary"
            type="submit"
            
          >
            Save as Draft
          </Button>

          <Button
            type="submit"
            
          >
            Publish Hackathon
          </Button>
        </div>
      </div>
    </form>
  );
}
