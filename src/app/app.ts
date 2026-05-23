import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Tarea {
  texto: string;
  completada: boolean;
  fechaHora: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  listaTareas = signal<Tarea[]>([
    { texto: 'Estudiar para los parciales', completada: false, fechaHora: '22/5/26 8:00 PM' },
    { texto: 'Estudiar para los finales', completada: true, fechaHora: '22/5/26 7:02 PM' },
    { texto: 'Asistir a clases de Programación V', completada: false, fechaHora: '22/5/26 7:02 PM' }
  ]);

  nuevaTareaTexto = '';

  totalTareas = computed(() => this.listaTareas().length);
  completadas = computed(() => this.listaTareas().filter(t => t.completada).length);
  pendientes = computed(() => this.listaTareas().filter(t => !t.completada).length);
  progreso = computed(() => {
    if (this.totalTareas() === 0) return 0;
    return Math.round((this.completadas() / this.totalTareas()) * 100);
  });

  agregarTarea() {
    if (!this.nuevaTareaTexto.trim()) return;

    const ahora = new Date();
    const fechaHoraFormateada = ahora.toLocaleString('es-AR', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const nueva: Tarea = {
      texto: this.nuevaTareaTexto,
      completada: false,
      fechaHora: fechaHoraFormateada
    };

    this.listaTareas.update(tareas => [nueva, ...tareas]);
    this.nuevaTareaTexto = '';
  }


  cambiarEstado(tareaSeleccionada: Tarea) {
    this.listaTareas.update(tareas => 
      tareas.map(t => t === tareaSeleccionada ? { ...t, completada: !t.completada } : t)
    );
  }

  
  eliminarTarea(tareaABorrar: Tarea) {
    this.listaTareas.update(tareas => 
      tareas.filter(t => t !== tareaABorrar)
    );
  }
}