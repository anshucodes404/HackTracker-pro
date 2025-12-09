
import RequestRejectedCard from './RequestRejectedCard'

const Requests = () => {
  return (
    <div className='max-w-xl mx-auto w-full max-h-[450px] overflow-y-scroll rounded-lg'>
      <RequestRejectedCard src="" name="John Doe" size={50} status="rejected" />
      <RequestRejectedCard src="" name="John Doe" size={50} status="accepted" />
      <RequestRejectedCard src="" name="John Doe" size={50} status="pending" />
      <RequestRejectedCard src="" name="John Doe" size={50} status="pending" />
    </div>
  )
}

export default Requests
