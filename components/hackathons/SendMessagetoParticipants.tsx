"use client";
import React, { useState } from "react";
import { Button, Textarea } from "../ui";

const SendMessagetoParticipants = () => {
  const [sendToParticipants, setSendToParticipants] = useState<boolean>(true);
  const [msg, setMsg] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleSubmit = async () => {
    try {
      setSending(true);
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg, sendToParticipants }),
      }).then((res) => res.json());

      console.log(res);

      if (!res.success) {
        setError(res.message);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 sticky top-20">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">
          Message to {sendToParticipants ? "Team Leads" : "OCs"}
        </h2>

        {/* //TODO: NEED TO MAKE THIS A COMPONENT FOR FURTHER USER */}
        <div
          onClick={() => setSendToParticipants(!sendToParticipants)}
          className={`w-13 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${
            sendToParticipants ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
              sendToParticipants ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Textarea
            label="Message"
            name="message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            required
            placeholder="Enter your message here ..."
          />
        </div>

        {error && (
          <div className="w-full bg-red-300 text-red-600 rounded-xl ">
            {error}
          </div>
        )}

        <Button type="submit" onClick={handleSubmit} className="w-full">
          {!sending ? "Send Message" : "Sending"}
        </Button>
      </div>
    </div>
  );
};

export default SendMessagetoParticipants;
