
interface SetActiveProps{
    activeTab: string;
    tab: string;
    setActiveTab: (tab: string) => void;
    title: string
}

const SetActive = ({activeTab, setActiveTab, tab, title}: SetActiveProps) => {
  return (
    <button type="button" onClick={() => setActiveTab(tab)} className={`cursor-pointer transition-all duration-100 ${tab === activeTab ? "text-blue-600 font-bold" : ""} `}>{title}</button>
  )
}

export default SetActive
