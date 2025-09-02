import React from 'react';
import { Calculator, Save, Download, RotateCcw } from 'lucide-react';
import { Preset } from './types';

interface CalculatorHeaderProps {
  presets: Preset[];
  newPresetName: string;
  setNewPresetName: (name: string) => void;
  showPresetModal: boolean;
  setShowPresetModal: (show: boolean) => void;
  onLoadPreset: (preset: Preset) => void;
  onSavePreset: () => void;
  onReset: () => void;
  onExport: () => void;
  onShowExport: () => void;
}

export default function CalculatorHeader({
  presets,
  newPresetName,
  setNewPresetName,
  showPresetModal,
  setShowPresetModal,
  onLoadPreset,
  onSavePreset,
  onReset,
  onExport,
  onShowExport
}: CalculatorHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Калькулятор администратора</h1>
          <p className="text-gray-600">Точный расчёт себестоимости и прибыли</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Presets Dropdown */}
        <div className="relative">
          <select 
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onChange={(e) => {
              const preset = presets.find(p => p.id === e.target.value);
              if (preset) onLoadPreset(preset);
            }}
            defaultValue=""
          >
            <option value="" disabled>Выберите пресет</option>
            {presets.map(preset => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        {/* Save Preset Button */}
        <button
          onClick={() => setShowPresetModal(true)}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Сохранить</span>
        </button>

        {/* Export Button */}
        <button
          onClick={onShowExport}
          className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Экспорт</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Сброс</span>
        </button>
      </div>

      {/* Save Preset Modal */}
      {showPresetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Сохранить пресет</h3>
            <input
              type="text"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              placeholder="Название пресета"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPresetModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={onSavePreset}
                disabled={!newPresetName.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}