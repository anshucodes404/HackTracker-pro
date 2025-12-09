
import ProfileImageView from '../ProfileImageView'
import RoleTag from './RoleTag';
import { UserRoundX } from 'lucide-react';

interface MemberCardProps {
    src: string;
    name: string;
    role_user: "member" | "leader";
    size?: number
}

const MemberCard = ({ src, name, role_user, size }: MemberCardProps) => {
  return (
    <div className='border-gray-200 border rounded-lg bg-gray-200/70 mb-2.5'>
      <div className='flex justify-between items-center px-2 py-2'>
        <div className='flex items-center gap-3'>
            <ProfileImageView src={src} name={name} size={size} />
            <div>
                <h4 className='font-semibold'>{name}</h4>
                <RoleTag role={role_user} />
            </div>
        </div>
        <div className='pr-5' title='Kick Out'>
          <UserRoundX className='size-5 hover:text-red-600 text-gray-600'  />
        </div>
      </div>
        
    </div>
  )
}

export default MemberCard
