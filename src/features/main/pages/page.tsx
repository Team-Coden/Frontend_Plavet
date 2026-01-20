import "../../../App.css"
import { AppSidebar } from "@/shared/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"
import { Separator } from "@/shared/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar"
import { ModeToggle } from "../components/mode-toggle"
import { useBreadcrumbs } from "../../../shared/hooks/useBreadcrumbs"   

export default function Main({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = useBreadcrumbs() 

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>

                {/* Inicio */}
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/" className="text-foreground hover:text-foreground">
                    Inicio
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                {/* Breadcrumb dinámico */}
                {breadcrumbs.map((bc, i) => (
                  <BreadcrumbItem key={i}>
                    {bc.isLast ? (
                      <BreadcrumbPage>{bc.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={bc.href} className="text-foreground hover:text-foreground">
                        {bc.label}
                      </BreadcrumbLink>
                    )}
                    {!bc.isLast && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                ))}

              </BreadcrumbList>
            </Breadcrumb>

            <div className="grow" />
          
           
          </div>
        </header>
        <div className="absolute top-4 right-4">
        <ModeToggle/>
        </div>

        <main className="p-6 md:p-10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
