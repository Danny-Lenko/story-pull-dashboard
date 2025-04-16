import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebar } from "./appSidebar"
import { Outlet } from "react-router"
import { BigSidebar } from "./sidebard"

export default function SidebarLayout() {
  return (
    <>
    
    <SidebarProvider className="min-h-0" defaultOpen={false}>
      <AppSidebar />
    </SidebarProvider>
    <SidebarProvider defaultOpen>
      <BigSidebar />
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
    </>
  )
}
