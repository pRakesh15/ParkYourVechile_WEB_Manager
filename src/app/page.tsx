'use client'
import { IsLoggedIn } from "@/components/molicules/IsLoggedIn";
import { IsManager } from "@/components/molicules/IsManager";
import { ListGarages } from "@/components/molicules/ListGarages";

export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>
       {(companyId)=><ListGarages companyId={companyId}/>}
      </IsManager>
    </IsLoggedIn>
  );
}
