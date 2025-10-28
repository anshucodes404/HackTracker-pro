// components/OrganizeHackathonForm.tsx
"use client";
import React, { useState } from "react";
import { Input, Section, Textarea, Button } from "@/components/ui";
import Loader from "@/components/ui/Loader";
import { useToast } from "@/components/ToastContext";
import { useRouter } from "next/navigation";

export default function Page() {

 const router =  useRouter()
  const {addToast} = useToast()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  // let bannerURL: string | undefined = undefined;
  const [error, setError] = useState<string>("")
 const [isCreating, setIsCreating] = useState<boolean>(false)
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  // const uploadImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   const form = e.currentTarget.form as HTMLFormElement | null;
  //   if (!form) {
  //     setError("Form not found");
  //     return;
  //   }

  //   const formData = new FormData(form);
  //   const file = formData.get("bannerImage") as File | null;

  //   if (!file) {
  //     setError("No Banner Image is selected");
  //     return;
  //   }

  //   try {
  //     setUploading(true);
  //     const signRes = await fetch("/api/cloudinary").then(res => res.json());
      
  //     if(!signRes.success){
  //       throw new Error("Failed to get cloudinary signature")
  //     }

  //     console.log(signRes.data)

  //     const {cloudName, apiKey, signature, timestamp, folder} = signRes.data;

  //      const cdnFormData = new FormData()
  //      cdnFormData.append("file", file)
  //      cdnFormData.append("api_key", apiKey)
  //      cdnFormData.append("timestamp", timestamp)
  //      cdnFormData.append("signature", signature)
  //      cdnFormData.append("folder", folder)

  //       console.log(cdnFormData)

  //       const cloudRes = await fetch(
  //         `https://api.cloudinary.com/v1_1/${cloudName || CLOUD_NAME}/image/upload`,
  //         {
  //           method: "POST",
  //           body: cdnFormData
  //         }
  //       );
  //       const cloudJson = await cloudRes.json();
  //       if (!cloudRes.ok) throw new Error(cloudJson.error?.message || "Cloudinary upload failed");
  //       bannerURL = cloudJson.secure_url as string;
  //       console.log(bannerURL)
  //   } finally{
  //     setUploading(false)
  //   }
  
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      addToast("Creating Hackahthon")
      setIsCreating(true)
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      for (const [key, value] of formData.entries()) {
        console.log(key, ": ", value);
      }
  
      const res = await fetch("/api/organise-hackathon",
        {
          method: "POST",
          body: formData
        }
      ).then(res => res.json())
      console.log(res)
      if(!res?.success){
        addToast("Hackathon creation failed")
      } else {
        addToast("Hackathon Created Successfully")
        router.push("/hosted-hackathons")
      }

    } catch (error) {
      addToast("Creation failed")
    } finally {
      setIsCreating(false)
    }
  };


  if(isCreating){
    return <Loader fullscreen/>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-20 mb-20 border border-gray-200">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              🏁 Organize a Hackathon
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Fill in the details below to host your next hackathon.
            </p>
          </div>

          <hr className="mb-3 text-gray-400" />
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
            <div className="mt-6">
              <Input
                name="tags"
                label="Related Tags"
                type="text"
                placeholder="E.g. AI, Hackathon, Gaming in comma seperated values"
              />
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
              <Input name="duration" label="Duration" type="text" />
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
              <Input
                name="criteria"
                label="Eligibility Criteria"
                placeholder="e.g. College students only"
              />
            </div>
          </Section>

          {/* <Section title="Media Upload"> 
            <Input name="bannerImage" label="Banner Image" type="file"  />
            <Button type="button" className="mt-3 px-6 w-full md:w-28">Upload</Button>         
          </Section> */}

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
                label="WebSite Link"
                placeholder="https://yourlink.com"
              />
            </div>
          </Section>

          <div className="border-t border-gray-200 mt-10 pt-6 text-right">
            <Button
              type="submit"
              className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Ceate Hackathon
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
