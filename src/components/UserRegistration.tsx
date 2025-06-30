import React from 'react'
import type { UserData } from '../types/user';

interface Props {
  onComplete: (data: UserData) => void;
}

const UserRegistration: React.FC<Props> = ({ onComplete }) => {
  return (
    <div>UserRegistration</div>
  )
}

export default UserRegistration