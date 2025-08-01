// Общее хранилище заявок (в реальном проекте - база данных)
export let leads: any[] = [];

// Функция для добавления новой заявки
export function addLead(newLead: any) {
  leads.unshift(newLead);
} 