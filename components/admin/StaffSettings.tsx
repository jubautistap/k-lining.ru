import React from 'react';
import { Users, Edit, Plus, Trash2 } from 'lucide-react';
import { Employee } from './types';

interface StaffSettingsProps {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  selectedEmployee: string;
  setSelectedEmployee: (id: string) => void;
}

export default function StaffSettings({
  employees,
  setEmployees,
  selectedEmployee,
  setSelectedEmployee
}: StaffSettingsProps) {
  const addEmployee = () => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: 'Новый сотрудник',
      hourlyRate: 300,
      efficiency: 20,
      type: 'freelance'
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    ));
  };

  const deleteEmployee = (id: string) => {
    if (employees.length <= 1) return; // Prevent deleting last employee
    setEmployees(employees.filter(emp => emp.id !== id));
    if (selectedEmployee === id) {
      setSelectedEmployee(employees[0].id);
    }
  };

  const selectedEmployeeData = employees.find(e => e.id === selectedEmployee);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Персонал</h2>
        </div>
        <button
          onClick={addEmployee}
          className="flex items-center space-x-2 bg-primary-100 hover:bg-primary-200 text-primary-700 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить</span>
        </button>
      </div>

      {/* Employee Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Выберите сотрудника</label>
        <div className="grid gap-3">
          {employees.map(employee => (
            <div
              key={employee.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedEmployee === employee.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedEmployee(employee.id)}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{employee.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      employee.type === 'staff' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {employee.type === 'staff' ? 'Штатный' : 'Фрилансер'}
                    </span>
                    {employees.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEmployee(employee.id);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {employee.hourlyRate} ₽/час • {employee.efficiency} м²/час
                  {employee.maxHoursPerDay && (
                    <> • до {employee.maxHoursPerDay}ч/день</>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Edit Form */}
      {selectedEmployeeData && (
        <div className="border-t pt-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Редактировать: {selectedEmployeeData.name}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
              <input
                type="text"
                value={selectedEmployeeData.name}
                onChange={(e) => updateEmployee(selectedEmployee, { name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип</label>
              <select
                value={selectedEmployeeData.type}
                onChange={(e) => updateEmployee(selectedEmployee, { 
                  type: e.target.value as 'freelance' | 'staff'
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="freelance">Фрилансер</option>
                <option value="staff">Штатный</option>
              </select>
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ставка (₽/час)</label>
              <input
                type="number"
                value={selectedEmployeeData.hourlyRate}
                onChange={(e) => updateEmployee(selectedEmployee, { hourlyRate: Number(e.target.value) })}
                min="100"
                max="2000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Efficiency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Производительность (м²/час)</label>
              <input
                type="number"
                value={selectedEmployeeData.efficiency}
                onChange={(e) => updateEmployee(selectedEmployee, { efficiency: Number(e.target.value) })}
                min="5"
                max="50"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Staff-specific fields */}
            {selectedEmployeeData.type === 'staff' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Макс. часов в день</label>
                  <input
                    type="number"
                    value={selectedEmployeeData.maxHoursPerDay || 8}
                    onChange={(e) => updateEmployee(selectedEmployee, { maxHoursPerDay: Number(e.target.value) })}
                    min="4"
                    max="16"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сверхурочные (₽/час)</label>
                  <input
                    type="number"
                    value={selectedEmployeeData.overtimeRate || (selectedEmployeeData.hourlyRate * 1.5)}
                    onChange={(e) => updateEmployee(selectedEmployee, { overtimeRate: Number(e.target.value) })}
                    min="150"
                    max="3000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}