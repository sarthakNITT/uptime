"use client"
import axios from "axios"
import { useState } from "react"

export default function Home () {
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  async function handleClick() {
    const res = await axios.post("https://infinitely-full-glider.ngrok-free.app/createService", {
      phone: phone,
      email: email,
      url: url
    })
    console.log(res);
  }
  return (
    <div>
      <input placeholder="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input placeholder="url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
      <button onClick={handleClick}>Send req</button>
    </div>
  )
}