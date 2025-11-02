import { type KeyboardEvent, useState } from 'react'
// biome-ignore lint/suspicious/noShadowRestrictedNames: <>
import { Button, ErrorMessage, Input } from '../ui'
import { SendHorizontal, X } from 'lucide-react'
import { useToast } from '../ToastContext'

function TagsDisplay({ members, onRemove}: { members: string[], onRemove: (index: number) => void }) {
    return members.map((member, index) => {
        return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <>
<span key={index} className='group relative inline-block text-xs px-2 py-0.5 bg-gray-300 rounded-sm'>
                <span className='select-none'>{member}</span>
                <button
                    type='button'
                    onClick={() => onRemove(index)}
                    className={"bg-gray-300 absolute top-1/2 right-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-0.5 rounded-full p-0.5 z-10"}
                 
                >
                    <X size={16}/>
                </button>
            </span>
        )
    })
}

const InviteForm = ({hackathonId, hackathonName, rules}: {hackathonId: string, hackathonName: string, rules: string | undefined}) => {

    const [sending, setSending] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const {addToast} = useToast()
    const [members, setMembers] = useState<string[]>([])
    const [member, setMember] = useState<string>("");

    const handleMembers = () => {
        const trimmed = member.trim()
        if (!trimmed) return
        setMembers(prev => [...prev, trimmed])
    }
    const handleInvite = async () => {
        try {
            setSending(true)
            setError("")
            const res= await fetch("/api/invite",
                {
                    method: "POST",
                    body: JSON.stringify({membersEmail: members, hackathonId, hackathonName, rules})
                }
            ).then(res => res.json())
            console.log(res)
            if(res.success){
                addToast("Invite Sent Successfully ✅")
                setMembers([])
                setMember("")
                return
            }
            setError(res.message || "Failed to send invites")
        } finally {
            setSending(false)
        }

    }

    const handleEnter = (e: KeyboardEvent) => {
        setError("")
        if (e.key === "Enter") {
            e.preventDefault()
            handleMembers()
            setMember("")
            console.log(members, member)
        }
    }

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">
                Invite Team Members
            </h2>
            <div
                onSubmit={handleInvite}
                className="space-y-4"
            >
                <div>
                    <Input
                        label="Invite Members"
                        type="text"
                        inputMode='numeric'
                        name="members"
                        value={member}
                        onChange={(e) => setMember(e.target.value)}
                        onKeyDown={handleEnter}
                        required
                        placeholder="Enter members Roll no."
                    />
                </div>

                {members?.length > 0 && <div className='mt-4'>
                    <div className='flex flex-wrap gap-2'>
                        <TagsDisplay members={members} onRemove={(i) => setMembers(prev => prev.filter((_, index) => index !== i))}/>
                    </div>
                </div>
                }

                {error && <ErrorMessage message={error} />}

                <Button
                    type="submit"
                    className=" disabled:bg-blue-800 w-full"
                    onClick={handleInvite}
                    disabled={members.length < 1}
                >
                    {
                        sending ? "Sending..." : <div className='flex justify-center items-center gap-2'>Send Invitation <SendHorizontal size={16}/></div> 
                    }
                    
                </Button>
            </div>
             </div>
    )
}

export default InviteForm
