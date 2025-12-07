"use client"
import React, { useState } from "react";
import { SetActive } from "../ui";
import Members from "./Members";

const TeamDetails = () => {

    const [activeTab, setActiveTab] = useState<string>("members");

	return (
		<div className=" rounded-lg p-4 shadow-sm h-screen">

            {/* //! This section is only for Team Leader */}
			<section className="flex justify-center gap-10 items-center pb-4">
				<SetActive activeTab={activeTab} setActiveTab={setActiveTab} tab="members" title="Members" />
				<SetActive activeTab={activeTab} setActiveTab={setActiveTab} tab="requests" title="Requests" />
				<SetActive activeTab={activeTab} setActiveTab={setActiveTab} tab="rejected" title="Rejected" />
			</section>
			<hr className="text-gray-300" />
			<section className="mt-7">
				<h3 className="text-center text-lg">Team: HackerEyes</h3>
			</section>
            <section>
                <Members />
            </section>
		</div>
	);
};

export default TeamDetails;
