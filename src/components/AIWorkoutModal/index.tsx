"use client"

import { useState } from "react"
import { X } from "lucide-react"
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
    onClose: () => void
    onGenerate: (formData: AIWorkoutFormData) => void
}

const totalSteps = 6

export function AIWorkoutModal({ isOpen, onClose, onGenerate }: AIWorkoutModalProps) {
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
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

    const handleNext = async () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        } else {
            setIsLoading(true)
            try {
                await onGenerate(formData)
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const updateFormData = <K extends keyof AIWorkoutFormData>(
        key: K,
        value: AIWorkoutFormData[K]
    ) => {
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
                            disabled={isLoading}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {currentStep === totalSteps ? (
                                isLoading ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Gerando...
                                    </span>
                                ) : (
                                    "Gerar Treino"
                                )
                            ) : (
                                "Próximo"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

