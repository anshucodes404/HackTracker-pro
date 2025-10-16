import React from "react";
import { CheckBox, Input, Button } from "../ui";

function Aside() {
  return (
    <aside className="w-full ml-28 sticky md:w-3/4">
      <div className="p-6">
        <h4 className="font-semibold mb-4">Filters</h4>
        <div className="space-y-3 text-sm text-textSecondary">
          <div>
            
            <Input
            label="Search"
              className="w-full px-3 py-2 border border-border rounded"
              placeholder="Search by name"
            />
            <Button className="w-full mt-2">Search</Button>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Mode</label>
            <CheckBox id="online" name="mode" value="online" label="Online" />
            <CheckBox name="mode" value="in-person" id="inperson" label="In-Person"/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="px-2 py-1 text-xs bg-indigo-400 rounded-full">
                AI/ML
              </button>
              <button type="button" className="px-2 py-1 text-xs bg-indigo-400 rounded-full">
                Web
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                Blockchain
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                Cyber Security
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                IoT
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                Low/No Code
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                Gaming
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                Robotics
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                Design
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                Beginner Friendly
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                Music
              </button>
              <button type="button" className="px-2 py-1 text-xs  bg-indigo-400 rounded-full">
                Art
              </button>
            </div>
          </div>

           <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
            <CheckBox name="status" value="upcoming" id="upcoming" label="Upcoming"/>
            <CheckBox name="status" value="open" id="open" label="Open"/>
            <CheckBox name="status" value="ended" id="ended" label="Ended" />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
