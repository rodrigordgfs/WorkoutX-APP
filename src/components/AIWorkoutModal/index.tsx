"use client"

import { useState } from "react"
import { LoaderIcon, X } from "lucide-react"
import { StepContent } from "../StepContent"

export interface AIWorkoutFormData {
    objective: string
    trainingTime: string
    experienceLevel: string
    frequency: string
    duration: string
    location: string
    equipment: string[]
    hasPhysicalLimitation: boolean
    limitationDescription: string
    preferredTrainingStyle: string
    nutrition: string
    sleepQuality: string
}



interface AIWorkoutModalProps {
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    onGenerate: (formData: AIWorkoutFormData) => void
}

const totalSteps = 6

export function AIWorkoutModal({ isOpen, isLoading, onClose, onGenerate }: AIWorkoutModalProps) {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<AIWorkoutFormData>({
        objective: "",
        trainingTime: "",
        experienceLevel: "",
        frequency: "",
        duration: "",
        location: "",
        equipment: [],
        hasPhysicalLimitation: false,
        limitationDescription: "",
        preferredTrainingStyle: "",
        nutrition: "",
        sleepQuality: "",
    })

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        } else {
            onGenerate(formData)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const updateFormData = <K extends keyof AIWorkoutFormData>(key: K, value: AIWorkoutFormData[K]) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
                <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Gerar Treino com IA</h2>
                    <button onClick={onClose} className="p-2 hover:bg-blue-700 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>

                    <StepContent step={currentStep} formData={formData} updateFormData={updateFormData} />

                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className={`px-4 py-2 rounded-md ${currentStep === 1
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                } transition-colors`}
                        >
                            Anterior
                        </button>
                        <button
                            onClick={handleNext}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${isLoading ? "cursor-not-allowed" : ""}`}
                            disabled={isLoading}
                        >
                            {currentStep === totalSteps ? isLoading ? <div className="flex items-center gap-2">
                                <LoaderIcon size={20} className="animate-spin mr-2" />
                                Gerando Treino
                            </div> : "Gerar Treino" : "Próximo"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

