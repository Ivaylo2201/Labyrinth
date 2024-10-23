import { Mail, PhoneCall, UserRound } from 'lucide-react';
import { User } from '../../types/User';

type UserProfileProps = {
    user: User;
};

function UserProfile({ user }: UserProfileProps) {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 justify-center items-center'>
                <UserRound size={25} />
                <p>{user.username}</p>
            </div>
            <div className='flex gap-2 justify-center items-center'>
                <PhoneCall size={23} />
                <p>{user.phone_number}</p>
            </div>
        </div>
    );
}

export default UserProfile;
