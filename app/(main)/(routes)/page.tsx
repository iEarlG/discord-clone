import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="text-3xl text-cyan-700">
      <UserButton afterSignOutUrl="/"/>
    </div>
  );
}
