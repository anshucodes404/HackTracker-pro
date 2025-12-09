interface StatusTagProps {
    status: "accepted" | "rejected" | "pending"
}

function StatusStyle(status: string): string{
    switch(status){
        case "accepted":
            return "bg-green-100 text-green-600";
        case "rejected":
            return "bg-red-100 text-red-600";
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

const StatusTag = ({ status }: StatusTagProps) => {
  return (
    <div className={`px-2 py-0.5 rounded-full border text-xs text-center font-medium ${StatusStyle(status)}`}>
      {status}
    </div>
  )
}

export default StatusTag
