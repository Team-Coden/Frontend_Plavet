"use client"

import * as React from "react"
import {
  FileSearchCorner,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  BookMarked,
  LayoutDashboard,
  Building2,
  UserSearch,
  ClipboardCheck,
  FileText
} from "lucide-react"

import { NavMain } from "../../dashboard/components/nav-main"
import { NavProjects } from "../../dashboard/components/nav-projects"
import { NavSecondary } from "../../dashboard/components/nav-secondary"
import { NavUser } from "../../dashboard/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../dashboard/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,

    },
    {
      title: "Gestion Academica",
      url: "#",
      icon: BookMarked,
      items: [
        {
          title: "Estudiantes",
          url: "#",
        },
        {
          title: "Talleres",
          url: "#",
        },
        {
          title: "Tutores",
          url: "#",
        },
      ],
    },
    {
      title: "Gestion Institucional",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "Centros de Trabajo",
          url: "#",
        },
        {
          title: "Plazas",
          url: "#",
        }
      ],
    },
    {
      title: "Roles y Personal",
      url: "#",
      icon: UserSearch,
      items: [
        {
          title: "Supervisores",
          url: "#",
        },
        {
          title: "Administradores",
          url: "#",
        }
      ],
    },
    {
      title: "Documentacion",
      url: "#",
      icon: FileSearchCorner,
      items: [
        {
          title: "Documentos",
          url: "#",
        },
        {
          title: "Subir Documentos",
          url: "#",
        }
      ],
    },
    {
      title: "Evaluaciones",
      url: "#",
      icon: ClipboardCheck,
      items: [
        {
          title: "Evaluaciones",
          url: "#",
        },
        {
          title: "Calificaciones",
          url: "#",
        }
      ],
    },
    {
      title: "Proceso de Pasantias",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Gestion de Pasantias",
          url: "#",
        },
        {
          title: "Cierre de Pasantias",
          url: "#",
        },
        {
          title: "Enviar Excusas",
          url: "#",
        }
      ],
    },
    {
      title: "Reportes",
      url: "#",
      icon: FileText,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">CheckInt-IN</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
