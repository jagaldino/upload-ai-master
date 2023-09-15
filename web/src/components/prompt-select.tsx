import { api } from "@/lib/httpClient";
import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectProps {
  onPromptSelected(template: string): void
}

export function PromptSelect(props: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  useEffect(() => {
    api.get('/prompts').then(response => {
      setPrompts(response.data)
    })
  }, [])

  function handlePromptSelect(promptId: string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map(prompt => {
          return (
            <SelectItem value={prompt.id} key={prompt.id}>
              {prompt.title}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}