import { NotepadTextDashed, Upload } from "lucide-react";
import { Button, Input, Textarea } from "../ui";
import { useState } from "react";
import { useToast } from "../ToastContext";
import uploadOnCloudinary from "@/lib/uploadOnCloudinary";

const ProjectForm = () => {
    const {addToast} = useToast()
    const [pptURL, setPptURL] = useState<Promise<string>>();
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.log("Form Data:", {
            projectName: formData.get("projectName"),
            projectDetails: formData.get("projectDetails"),
            githubLink: formData.get("githubLink"),
            demoLink: formData.get("demoLink"),
            ppt: formData.get("ppt"),
        });
        
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if(file && file.type === "application/pdf" && file.size <= 10 * 1024 * 1024){
            setPptURL(await uploadOnCloudinary(file, "project_presentations"))
        } else {
            addToast("Please upload a PDF file under 10MB")
        }
    }


	return (
		<form onSubmit={handleSubmit} className="h-[630px] no-scrollbar px-1">
			<section className="">
				<div className="flex items-center text-2xl font-bold gap-2">
					<NotepadTextDashed />
					Project Submission
				</div>
			</section>
			<hr className="text-gray-300 mt-3" />

			<section className="mt-7">
				<div>
					<Input
						name="projectName"
						label="Project Name"
						required
						placeholder="Enter your project name"
					/>
				</div>
				<div className="mt-3">
					<Textarea
						name="projectDetails"
						label="Project Description"
						required
						placeholder="Describe your project..."
					/>
				</div>
				<div className="mt-3 ">
					<Input
						name="githubLink"
						required
						label="Github Repository Link"
						placeholder="https://github.com/user/project_repo"
					/>
				</div>
				<div className="mt-3 ">
					<Input
						name="demoLink"
						label="Live Demo Link"
						placeholder="https://project-demo.com"
					/>
				</div>
				<div className="mt-3">
					<label
						htmlFor="ppt-upload"
						className="block text-sm font-semibold text-gray-700 mb-2"
					>
						Upload Presentation (PDF) <span className="text-red-600">*</span>
					</label>
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition hover:bg-blue-50/70">
						<Upload size={32} className="mx-auto text-gray-400 mb-2" />
						<input
							name="ppt"
							type="file"
							accept=".pdf"
							onChange={handleFileChange}
							className="hidden"
							id="ppt-upload"
							required
						/>
						<label htmlFor="ppt-upload" className="cursor-pointer">
							<p className="text-sm text-gray-600">
								Click to upload or drag and drop
							</p>
							<p className="text-xs text-gray-400 mt-1">PDF up to 10MB</p>
						</label>
					</div>
				</div>
				<div className="flex gap-3 justify-end mt-3">
					<Button variant="secondary">Clear Form</Button>
					<Button type="submit">Submit</Button>
				</div>
			</section>
		</form>
	);
};

export default ProjectForm;
