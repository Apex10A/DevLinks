import Image from 'next/image'
import Login from './auth/login/Login'
import './index.css'
import Header from './layout/header/Header'
import Create from './auth/createAccount/Create'
import HomePage from './components/home/HomePage'
import AddedOneLink from './components/home/AddedOneLink'
import AddedLinks from './components/home/AddedLinks'
import ProfileDetails from './components/home/ProfileDetails'

export default function Home() {
  return (
    <div>
      <Header/>
        <ProfileDetails/>
    </div>
  )
}
