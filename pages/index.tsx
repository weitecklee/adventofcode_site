import Link from 'next/link'

function HomePage() {
  return (<>
    <div>Welcome to Next.js! Typescript version</div>
    <Link href="/2019/01">Solution for day 2019/01</Link>
  </>)
}

export default HomePage