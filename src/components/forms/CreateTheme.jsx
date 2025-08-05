"use client"

import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function ThemeFormWithImport({ defaultValues, onSubmit }) {
  const [jsonError, setJsonError] = useState(null)
  const [jsonSuccess, setJsonSuccess] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const { 
    control, 
    handleSubmit, 
    reset, 
    watch, 
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: defaultValues?.name || "My Theme",
      light: defaultValues?.light || {},
      dark: defaultValues?.dark || {},
      rawJson: ""
    }
  })

  const rawJson = watch("rawJson")

  // Handle JSON import
  useEffect(() => {
    if (!rawJson) {
      setJsonError(null)
      setJsonSuccess(false)
      return
    }

    try {
      const parsed = JSON.parse(rawJson)
      if (parsed.light && parsed.dark) {
        // Update form values
        Object.entries(parsed.light).forEach(([key, val]) => {
          setValue(`light.${key}`, val, { shouldValidate: true })
        })
        Object.entries(parsed.dark).forEach(([key, val]) => {
          setValue(`dark.${key}`, val, { shouldValidate: true })
        })
        if (parsed.name) {
          setValue("name", parsed.name)
        }
        setJsonError(null)
        setJsonSuccess(true)
      } else {
        setJsonError("JSON must contain both light and dark theme properties")
        setJsonSuccess(false)
      }
    } catch (err) {
      setJsonError("Invalid JSON format")
      setJsonSuccess(false)
    }
  }, [rawJson, setValue])

  const renderFields = (mode) => {
    const themeKeys = Object.keys(defaultValues?.[mode] || {})
    if (!themeKeys.length) return null

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themeKeys.map((key) => (
          <div key={`${mode}-${key}`} className="space-y-2">
            <Label className="capitalize">
              {key.replace(/-/g, " ")}
            </Label>
            <Controller
              name={`${mode}.${key}`}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder={`Enter ${key}`} />
              )}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-4">
        <Controller
          name="name"
          control={control}
          rules={{ required: "Theme name is required" }}
          render={({ field }) => (
            <div className="space-y-2">
              <Label>Theme Name</Label>
              <Input {...field} placeholder="Enter theme name" />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Import Theme JSON</Label>
            <div className="flex items-center space-x-2">
              <Switch 
                id="advanced-mode" 
                checked={showAdvanced}
                onCheckedChange={setShowAdvanced}
              />
              <Label htmlFor="advanced-mode">Advanced Mode</Label>
            </div>
          </div>

          <Controller
            name="rawJson"
            control={control}
            render={({ field }) => (
              <Textarea 
                {...field} 
                placeholder={`{\n  "name": "My Theme",\n  "light": {\n    "background": "#ffffff",\n    ...\n  },\n  "dark": {\n    "background": "#000000",\n    ...\n  }\n}`} 
                rows={8} 
                className="font-mono text-sm"
              />
            )}
          />

          {jsonError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{jsonError}</AlertDescription>
            </Alert>
          )}

          {jsonSuccess && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Theme imported successfully!</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {showAdvanced && (
        <>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Light Theme</h2>
            {renderFields("light")}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Dark Theme</h2>
            {renderFields("dark")}
          </div>
        </>
      )}

      <Button type="submit" className="w-full md:w-auto">
        Save Theme
      </Button>
    </form>
  )
}