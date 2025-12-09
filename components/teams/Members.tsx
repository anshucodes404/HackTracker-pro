import React from "react";
import MemberCard from "./MemberCard";

// interface MembersProps {

// }

const Members = () => {
	return (
		<div className="max-w-xl mx-auto w-full">
			<div className="font-semibold text-lg flex justify-between px-3">
        <div>
        Members: ({/* count here */})
        </div>
        <div>
          Team: HackerEyes
        </div>
        
        </div>

			<section className="mt-1.5">
				<div>
					<MemberCard src="" name="John Doe" size={50} role_user="member" />
					<MemberCard src="" name="John Doe" size={50} role_user="leader" />
				</div>
			</section>
		</div>
	);
};

export default Members;
