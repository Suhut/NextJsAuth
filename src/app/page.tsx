import Link from "next/link"

export default function Home() {
  return (
    <>
    <h1>HOME PAGE</h1> 
    
    <div>
        <ul>
          <li>
            <Link rel="stylesheet" href={"/about"} >About</Link>
          </li>
        </ul>  
      </div>
    </>
  )
}