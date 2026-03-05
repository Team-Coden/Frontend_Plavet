import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import type { EvaluacionForm } from "../hooks/useEvaluacion";

interface EvaluacionTableProps {
  evaluationForm: EvaluacionForm;
  setEvaluationForm: React.Dispatch<React.SetStateAction<EvaluacionForm>>;
}

export function EvaluacionTable({ evaluationForm, setEvaluationForm }: EvaluacionTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg"> 3. Resultados de Aprendizaje</CardTitle>
        <CardDescription>RA 1: Actuar de forma responsable y respetuosa en el entorno de trabajo, siguiendo las políticas y normas de la empresa.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-gray-300 p-2 text-left">Indicadores valoración/semanas año escolar</th>
                  {Array.from({ length: 12 }, (_, i) => (
                    <th key={i} className="border border-gray-300 p-2 text-center min-w-[50px]">
                      {i + 1}ª
                    </th>
                  ))}
                  <th className="border border-gray-300 p-2 text-center min-w-[60px]">PROMEDIO</th>
                  <th className="border border-gray-300 p-2 text-center min-w-[60px]">FINAL</th>
                </tr>
              </thead>
              <tbody>
                {/* CAPACIDAD Section */}
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 p-2 font-medium" colSpan={15}>CAPACIDAD</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Conocimientos teóricos</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.conocimientosTeoricos[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.conocimientosTeoricos]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, conocimientosTeoricos: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Asimilación y seguimiento de instrucciones verbales</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.asimilacionInstruccionesVerbales[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.asimilacionInstruccionesVerbales]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, asimilacionInstruccionesVerbales: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Asimilación y seguimiento de instrucciones escritas</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.asimilacionInstruccionesEscritas[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.asimilacionInstruccionesEscritas]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, asimilacionInstruccionesEscritas: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Asimilación y seguimiento de instrucciones simbólicas</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.asimilacionInstruccionesSimbolicas[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.asimilacionInstruccionesSimbolicas]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, asimilacionInstruccionesSimbolicas: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-2 font-bold">SUBTOTAL CAPACIDAD</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1 bg-gray-50">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8 bg-gray-100"
                        value={evaluationForm.subtotalCapacidad[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.subtotalCapacidad]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, subtotalCapacidad: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                
                {/* HABILIDAD Section */}
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 p-2 font-medium" colSpan={15}>HABILIDAD</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Organización / Planificación del trabajo</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.organizacionPlanificacion[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.organizacionPlanificacion]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, organizacionPlanificacion: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Método</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.metodo[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.metodo]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, metodo: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Ritmo de trabajo</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.ritmoTrabajo[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.ritmoTrabajo]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, ritmoTrabajo: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Trabajo realizado</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.trabajoRealizado[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.trabajoRealizado]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, trabajoRealizado: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-2 font-bold">SUBTOTAL HABILIDAD</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1 bg-gray-50">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8 bg-gray-100"
                        value={evaluationForm.subtotalHabilidad[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.subtotalHabilidad]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, subtotalHabilidad: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                
                {/* ACTITUD Section */}
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 p-2 font-medium" colSpan={15}>ACTITUD</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Iniciativa</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.iniciativa[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.iniciativa]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, iniciativa: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Trabajo en equipo</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.trabajoEquipo[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.trabajoEquipo]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, trabajoEquipo: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Puntualidad y asistencia</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.puntualidadAsistencia[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.puntualidadAsistencia]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, puntualidadAsistencia: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Responsabilidad</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8"
                        value={evaluationForm.responsabilidad[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.responsabilidad]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, responsabilidad: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-2 font-bold">SUBTOTAL ACTITUD</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1 bg-gray-50">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8 bg-gray-100"
                        value={evaluationForm.subtotalActitud[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.subtotalActitud]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, subtotalActitud: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                  <td className="border border-gray-300 p-1 bg-gray-50"></td>
                </tr>
                
                {/* TOTAL Row */}
                <tr className="bg-blue-100 font-bold">
                  <td className="border border-gray-300 p-2 font-bold">TOTAL</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    <td key={i} className="border border-gray-300 p-1 bg-blue-50">
                      <Input
                        type="text"
                        placeholder="..."
                        className="w-full text-center text-xs h-8 bg-blue-100 font-semibold"
                        value={evaluationForm.total[i] || ""}
                        onChange={(e) => {
                          const newValues = [...evaluationForm.total]
                          newValues[i] = e.target.value
                          setEvaluationForm({ ...evaluationForm, total: newValues })
                        }}
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-1 bg-blue-50"></td>
                  <td className="border border-gray-300 p-1 bg-blue-50"></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Promedios */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="promedio-capacidades">Promedio Capacidades</Label>
              <Input
                id="promedio-capacidades"
                type="text"
                step="0.01"
                placeholder="..."
                value={evaluationForm.promedioCapacidades}
                onChange={(e) => setEvaluationForm({ ...evaluationForm, promedioCapacidades: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="promedio-habilidades">Promedio Habilidades</Label>
              <Input
                id="promedio-habilidades"
                type="text"
                step="0.01"
                placeholder="..."
                value={evaluationForm.promedioHabilidades}
                onChange={(e) => setEvaluationForm({ ...evaluationForm, promedioHabilidades: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="promedio-actitudes">Promedio Actitudes</Label>
              <Input
                id="promedio-actitudes"
                type="text"
                step="0.01"
                placeholder="..."
                value={evaluationForm.promedioActitudes}
                onChange={(e) => setEvaluationForm({ ...evaluationForm, promedioActitudes: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nota-final">Nota Final</Label>
              <Input
                id="nota-final"
                type="text"
                step="0.01"
                placeholder="..."
                value={evaluationForm.notaFinal}
                onChange={(e) => setEvaluationForm({ ...evaluationForm, notaFinal: e.target.value })}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
