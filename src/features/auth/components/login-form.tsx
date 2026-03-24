import { cn } from "@/lib/utils"
import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent } from "../../../shared/components/ui/card"
import { Input } from "../../../shared/components/ui/input"
import { Label } from "../../../shared/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [cedula, setCedula] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mockup: Guardar usuario en localStorage
    const mockUser = {
      cedula,
      name: "Usuario Demo",
      role: "Estudiante",
    }
    localStorage.setItem('user', JSON.stringify(mockUser))
    sessionStorage.setItem('isLoggedIn', 'true')
    navigate("/dashboard")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  Bienvenido a CHECK<span className="text-primary">iNT</span>
                </h1>
                <p className="text-balance text-zinc-500 dark:text-zinc-400">
                  Sistema de Gestión de Pasantías
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cedula">Cédula</Label>
                <Input
                  id="cedula"
                  type="text"
                  placeholder="000-0000000-0"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              
            </div>
          </form>
          <div className="relative hidden bg-zinc-100 md:block dark:bg-zinc-800">
            <img
              src="/images/image.png"
              alt="CHECKiNT - Sistema de Gestión de Pasantías"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-transparent"></div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-zinc-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-zinc-900 dark:text-zinc-400 dark:hover:[&_a]:text-zinc-50">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{""}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
